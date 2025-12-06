"use client";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Card,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
  TextField,
  CircularProgress,
  Alert,
  Chip,
} from "@mui/material";
import config from "../../../config";

const POSFetchUpdate = () => {
  const { store_id } = useParams(); // Get client_store_id from URL
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);

  // Form fields - will be pre-filled from client_pos table
  const [formData, setFormData] = useState({
    storeName: "",
    posSystem: "Shopify",
    accessToken: "",
    posUrl: "",
    limit: 5
  });

  // Store configuration data
  const [storeConfig, setStoreConfig] = useState(null);

  // API Response data
  const [apiResponse, setApiResponse] = useState(null);
  const [fieldMappingSuggestions, setFieldMappingSuggestions] = useState([]);
  const [allMasterAttributes, setAllMasterAttributes] = useState([]);

  // Load store configuration on component mount
  useEffect(() => {
    const loadStoreConfiguration = async () => {
      if (!store_id) {
        setError("Store ID not found in URL");
        setInitialLoading(false);
        return;
      }

      try {
        setInitialLoading(true);

        // Get store configuration from client_pos table
        const response = await fetch(`${config.API_BASE_URL}/client/pos/get-store-config/${store_id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });

        if (!response.ok) {
          throw new Error(`Failed to load store configuration: ${response.status}`);
        }

        const result = await response.json();

        if (result.success && result.data) {
          const config = result.data;
          setStoreConfig(config);

          // Pre-fill form with existing configuration
          setFormData({
            storeName: config.store_name || "",
            posSystem: config.pos_name || "Shopify",
            accessToken: config.pos_api_key || "",
            posUrl: config.pos_url || "",
            limit: 5
          });
        } else {
          throw new Error(result.message || "Store configuration not found");
        }

      } catch (err) {
        console.error("Failed to load store configuration:", err);
        setError(`Failed to load store configuration: ${err.message}`);
      } finally {
        setInitialLoading(false);
      }
    };

    loadStoreConfiguration();
  }, [store_id]);

  // Mapping state - single array with checkboxes
  const [mappingSelections, setMappingSelections] = useState([]);

  // Sync state
  const [syncLoading, setSyncLoading] = useState(false);
  const [syncSuccess, setSyncSuccess] = useState(null);
  const [syncError, setSyncError] = useState(null);

  // Utility function to categorize POS fields
  const categorizePosField = (posFieldName) => {
    const fieldLower = posFieldName.toLowerCase();

    if (fieldLower.includes('metafield')) {
      return 'metafields';
    }
    if (fieldLower.includes('variant') || fieldLower.includes('collection')) {
      return 'variants';
    }
    return 'products';
  };



  // Handle API call to preview endpoint
  const handleGetAccess = async () => {
    if (!formData.accessToken || !formData.posUrl) {
      setError("Please fill in POS URL and Access Token");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Check if any values have changed and update client_pos if needed
      if (storeConfig) {
        const hasChanges =
          formData.accessToken !== storeConfig.pos_api_key ||
          formData.posUrl !== storeConfig.pos_url ||
          formData.posSystem !== storeConfig.pos_name;

        if (hasChanges) {
          console.log("Changes detected, updating client_pos configuration...");

          const updateResponse = await fetch(`${config.API_BASE_URL}/client/pos/update-configuration`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              client_pos_id: storeConfig.client_pos_id,
              pos_system: formData.posSystem,
              pos_api_key: formData.accessToken,
              pos_url: formData.posUrl
            })
          });

          if (!updateResponse.ok) {
            throw new Error(`Failed to update configuration: ${updateResponse.status}`);
          }

          const updateResult = await updateResponse.json();
          if (!updateResult.success) {
            throw new Error(updateResult.message || "Failed to update configuration");
          }

          console.log("Configuration updated successfully");
        }
      }

      // Load existing field mappings using new edit endpoint
      console.log("Loading existing field mappings for edit mode, store:", store_id);

      const response = await fetch(`${config.API_BASE_URL}/client/pos/get-edit-mappings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          client_store_id: store_id
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to load field mappings: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Edit Mappings Response:", result);

      if (result.success) {
        const data = result.data;
        const existingMappings = data.field_mapping_suggestions || [];


        if (existingMappings.length > 0) {
          // Process the response using the same logic as configure
          processApiResponse(result);
          setSuccess(`Loaded ${existingMappings.length} existing field mappings for editing!`);
        } else {
          // No existing mappings found - show helpful message
          console.log("No existing field mappings found for this store");
          setError("No field mappings found. Please configure field mappings first using 'Configure POS'.");
          setApiResponse(null);
          setFieldMappingSuggestions([]);
          setAllMasterAttributes([]);
          return;
        }
      } else {
        throw new Error(result.message || "Failed to load field mappings");
      }

    } catch (err) {
      console.error("API Error:", err);
      setError(err.message || "Failed to fetch data from API");
    } finally {
      setLoading(false);
    }
  };

  // Process API response and set up mapping data
  const processApiResponse = (response) => {
    const data = response.data;

    // Extract field mapping suggestions from the response
    const suggestions = data?.field_mapping_suggestions || [];
    const masterAttributes = data?.all_master_attributes || [];
    setFieldMappingSuggestions(suggestions);
    setAllMasterAttributes(masterAttributes);

    // Initialize mapping selections with suggestions
    // Only pre-fill if confidence > 0.5 AND no constraint violations
    const usedAttributes = { products_metafields: new Set(), variants: new Set() };

    const initialSelections = suggestions.map((suggestion, index) => {
      let prefilledAttribute = '';
      let autoSelected = false;

      // Only prefill if suggestion exists and it won't violate constraints
      if (suggestion.our_attribute_name) {
        const currentCategory = suggestion.pos_field_category || categorizePosField(suggestion.pos_attribute_name);
        const constraintGroup = (currentCategory === 'variants') ? 'variants' : 'products_metafields';

        // Check if this attribute is already used in the same constraint group
        if (!usedAttributes[constraintGroup].has(suggestion.our_attribute_name)) {
          prefilledAttribute = suggestion.our_attribute_name;
          autoSelected = true;
          usedAttributes[constraintGroup].add(suggestion.our_attribute_name);
        }
      }

      return {
        id: index,
        pos_attribute_name: suggestion.pos_attribute_name,
        pos_attribute_sample_value: suggestion.pos_attribute_sample_value,
        our_attribute_name: prefilledAttribute,
        our_attribute_description: suggestion.our_attribute_description,
        our_attribute_data_type: suggestion.our_attribute_data_type,

        our_attribute_category: suggestion.our_attribute_category,
        pos_field_category: suggestion.pos_field_category || categorizePosField(suggestion.pos_attribute_name),
        selected: autoSelected,
        match_reason: suggestion.match_reason
      };
    });

    setMappingSelections(initialSelections);

    console.log("Processed field mapping suggestions:", suggestions);
    console.log("Initial selections:", initialSelections);
  };

  // Handle checkbox selection changes
  const handleSelectionChange = (id, checked) => {
    setMappingSelections(prev =>
      prev.map(item =>
        item.id === id ? { ...item, selected: checked } : item
      )
    );
  };

  // Handle dropdown attribute changes
  const handleAttributeChange = (id, newAttributeName) => {
    setMappingSelections(prev =>
      prev.map(item =>
        item.id === id ? { ...item, our_attribute_name: newAttributeName } : item
      )
    );
  };





  // Submit mapping to backend configure API
  const handleSubmitMapping = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Get selected mappings
      const selectedMappings = mappingSelections.filter(item => item.selected && item.our_attribute_name);

      if (selectedMappings.length === 0) {
        setError("Please select at least one field mapping");
        setLoading(false);
        return;
      }

      // Prepare mapping data for backend
      const mappingData = {
        client_id: "0486bc6d-6d15-4ea3-8504-adefe1512324",
        pos_system: formData.posSystem,
        access_token: formData.accessToken,
        store: formData.storeName,
        field_mappings: selectedMappings.map((item, index) => ({
          shopify_field: item.pos_attribute_name, // Keep full path as-is
          attribute_name: item.our_attribute_name,
          category: item.pos_field_category,
          mapping_order: index
        }))
      };

      console.log("Submitting mapping data:", mappingData);

      const response = await fetch(`${config.API_BASE_URL}/client/pos/configure`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(mappingData)
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Configure API Response:", result);

      if (result.success) {
        setSuccess(`Successfully configured ${mappingData.field_mappings.length} field mappings!`);
      } else {
        throw new Error(result.message || "Configuration failed");
      }

    } catch (err) {
      console.error("Configure API Error:", err);
      setError(err.message || "Failed to submit mapping configuration");
    } finally {
      setLoading(false);
    }
  };

  const handleSyncProducts = async () => {
    setSyncLoading(true);
    setSyncError(null);
    setSyncSuccess(null);

    try {
      const syncData = {
        client_id: "0486bc6d-6d15-4ea3-8504-adefe1512324",
        pos_system: formData.posSystem,
        access_token: formData.accessToken,
        store: formData.storeName,
        field_mappings: [] // Not needed for sync, mappings are read from database
      };

      console.log("Starting product sync...");

      const response = await fetch(`${config.API_BASE_URL}/client/pos/sync-products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(syncData)
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Sync API Response:", result);

      if (result.success) {
        setSyncSuccess(`Successfully synced ${result.synced_count}/${result.total_products} products!`);
      } else {
        throw new Error(result.message || "Product sync failed");
      }

    } catch (err) {
      console.error("Sync API Error:", err);
      setSyncError(err.message || "Failed to sync products");
    } finally {
      setSyncLoading(false);
    }
  };



  // Show loading spinner while loading initial configuration
  if (initialLoading) {
    return (
      <Card sx={{ boxShadow: "none", borderRadius: 2, mb: 3, p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <CircularProgress />
          <Typography sx={{ ml: 2 }}>Loading store configuration...</Typography>
        </Box>
      </Card>
    );
  }

  return (
    <Card sx={{ boxShadow: "none", borderRadius: 2, mb: 3, p: 2 }}>
      {/* Top Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
          mb: 3,
          flexWrap: "wrap"
        }}
      >
        {/* Left Column */}
        <Box sx={{ flex: "0 0 35%", minWidth: 300, display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            fullWidth
            label="Store Name"
            value={formData.storeName}
            disabled
            helperText="Store name from configuration"
          />

          <TextField
            fullWidth
            label="POS URL"
            value={formData.posUrl}
            onChange={(e) => setFormData(prev => ({ ...prev, posUrl: e.target.value }))}
            placeholder="your-store.myshopify.com"
            helperText="Store domain (without https://)"
          />

          <FormControl fullWidth>
            <InputLabel>POS System</InputLabel>
            <Select
              value={formData.posSystem}
              onChange={(e) => setFormData(prev => ({ ...prev, posSystem: e.target.value }))}
            >
              <MenuItem value="Shopify">Shopify</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              fullWidth
              label="Access Token"
              type="password"
              value={formData.accessToken}
              onChange={(e) => setFormData(prev => ({ ...prev, accessToken: e.target.value }))}
              placeholder="Enter Shopify access token"
            />
            <Button
              variant="contained"
              onClick={handleGetAccess}
              disabled={loading}
              sx={{ minWidth: 120 }}
            >
              {loading ? <CircularProgress size={20} /> : "Load Mappings"}
            </Button>
          </Box>


        </Box>

        {/* Right Column - Status */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 1,
            minWidth: 200,
            alignItems: { xs: "flex-start", md: "flex-end" }
          }}
        >
          {apiResponse && (
            <>
              <Typography variant="body2" color="text.secondary">
                Status: <Chip label="Connected" color="success" size="small" />
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Mapped Fields: {fieldMappingSuggestions.length || 0}
              </Typography>

              {/* Sync Button moved to top */}
              <Button
                variant="contained"
                color="success"
                onClick={handleSyncProducts}
                disabled={syncLoading || !apiResponse}
                sx={{ minWidth: 150, mt: 1 }}
              >
                {syncLoading ? <CircularProgress size={20} /> : "Sync Products"}
              </Button>
            </>
          )}
        </Box>
      </Box>

      {/* Status Messages */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      {/* Show mapping interface only after successful API call */}
      {apiResponse && (
        <>
          <Divider sx={{ mb: 2 }} />

          {/* Field Mapping Suggestions */}
          <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
            Field Mapping Suggestions
          </Typography>

          {/* Field Mapping Table */}
          {mappingSelections.length > 0 && (
            <Box sx={{ mt: 2 }}>
              {/* Group by category */}
              {['products', 'variants', 'metafields'].map(category => {
                const categoryItems = mappingSelections.filter(item => item.pos_field_category === category);
                if (categoryItems.length === 0) return null;

                return (
                  <Box key={category} sx={{ mb: 4 }}>
                    <Typography variant="h6" sx={{ mb: 2, textTransform: 'capitalize', color: 'primary.main' }}>
                      {category} ({categoryItems.length} fields)
                    </Typography>

                    <Box sx={{
                      display: 'grid',
                      gridTemplateColumns: '40px 2fr 2fr 1fr',
                      gap: 2,
                      alignItems: 'center',
                      mb: 1
                    }}>
                      {/* Headers */}
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Select</Typography>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>POS Field</Typography>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Liza Attribute Names</Typography>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Data Type</Typography>
                    </Box>

                    {categoryItems.map((item) => (
                      <Box key={item.id} sx={{
                        display: 'grid',
                        gridTemplateColumns: '40px 2fr 2fr 1fr',
                        gap: 2,
                        alignItems: 'center',
                        py: 1,
                        borderBottom: '1px solid',
                        borderColor: 'divider'
                      }}>
                        {/* Checkbox */}
                        <input
                          type="checkbox"
                          checked={item.selected}
                          onChange={(e) => handleSelectionChange(item.id, e.target.checked)}
                        />

                        {/* POS Field (read-only) */}
                        <TextField
                          value={item.pos_attribute_name}
                          size="small"
                          slotProps={{ input: { readOnly: true } }}
                          sx={{ '& .MuiInputBase-input': { fontSize: '0.875rem' } }}
                        />

                        {/* Liza Attribute Dropdown */}
                        <FormControl size="small" fullWidth>
                          <Select
                            value={item.our_attribute_name || ''}
                            onChange={(e) => handleAttributeChange(item.id, e.target.value)}
                            displayEmpty
                          >
                            <MenuItem value="">
                              <em>Select attribute</em>
                            </MenuItem>
                            {/* Show all master attributes, filtered by constraint availability */}
                            {allMasterAttributes
                              .map(attr => attr.attribute_name)
                              .sort()
                              .map(attrName => {
                                // Check if this attribute is already used in the same constraint group
                                const isAlreadyUsed = mappingSelections.some(selection => {
                                  if (selection.id === item.id) return false; // Skip current item
                                  if (selection.our_attribute_name !== attrName) return false; // Different attribute

                                  // Check constraint groups
                                  if (item.pos_field_category === 'variants' && selection.pos_field_category === 'variants') {
                                    return true; // Same attribute in variants category
                                  }
                                  if ((item.pos_field_category === 'products' || item.pos_field_category === 'metafields') &&
                                      (selection.pos_field_category === 'products' || selection.pos_field_category === 'metafields')) {
                                    return true; // Same attribute in products+metafields category
                                  }
                                  return false;
                                });

                                // Don't show already used attributes in dropdown
                                if (isAlreadyUsed) return null;

                                return (
                                  <MenuItem key={attrName} value={attrName}>
                                    {attrName}
                                  </MenuItem>
                                );
                              })
                              .filter(Boolean) // Remove null entries
                            }
                          </Select>
                        </FormControl>

                        {/* Data Type */}
                        <Typography variant="body2" color="text.secondary">
                          {item.our_attribute_data_type || 'N/A'}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                );
              })}
            </Box>
          )}

          {/* Sync Status Messages */}
          {syncError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {syncError}
            </Alert>
          )}
          {syncSuccess && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {syncSuccess}
            </Alert>
          )}

          {/* Footer */}
          <Box sx={{ display: "flex", gap: 2, justifyContent: "right", mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmitMapping}
              disabled={loading}
              sx={{ minWidth: 200 }}
            >
              {loading ? <CircularProgress size={20} /> : "Update Field Mapping"}
            </Button>
          </Box>
        </>
      )}
    </Card>
  );
};

export default POSFetchUpdate;
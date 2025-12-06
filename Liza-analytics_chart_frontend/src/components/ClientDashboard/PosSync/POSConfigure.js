"use client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  IconButton,

} from "@mui/material";
import config from "../../../config";

const POSConfigure = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Form fields
  const [formData, setFormData] = useState({
    selectedStoreId: "", // Store dropdown selection
    posSystem: "Shopify",
    accessToken: "",
    posUrl: "" // New field
    // No limit needed - batch job handles this automatically with batch_size=50
  });

  // Store list for dropdown
  const [stores, setStores] = useState([]);
  const [storesLoading, setStoresLoading] = useState(false);

  // POS systems list for dropdown
  const [posSystems, setPosSystems] = useState([]);
  const [posSystemsLoading, setPosSystemsLoading] = useState(false);

  // API Response data
  const [allMasterAttributes, setAllMasterAttributes] = useState([]);

  // Mapping state - single array with checkboxes
  const [mappingSelections, setMappingSelections] = useState([]);

  

  // Load stores and POS systems on component mount
  useEffect(() => {
    loadStores();
    loadPosSystems();
  }, []);

  const loadStores = async () => {
    setStoresLoading(true);
    try {
      const clientId = config.clientId ; 
      const response = await fetch(`${config.API_BASE_URL}/client/pos/available-stores?client_id=${clientId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to load stores: ${response.statusText}`);
      }

      const result = await response.json();
      if (result.success && result.data) {
        setStores(result.data);
      } else {
        throw new Error(result.message || "Failed to load stores");
      }
    } catch (err) {
      console.error("Error loading stores:", err);
      setError(`Failed to load stores: ${err.message}`);
    } finally {
      setStoresLoading(false);
    }
  };

  const loadPosSystems = async () => {
    setPosSystemsLoading(true);
    try {
      const response = await fetch(`${config.API_BASE_URL}/client/pos/systems`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to load POS systems: ${response.statusText}`);
      }

      const result = await response.json();
      if (result.success && result.data) {
        setPosSystems(result.data);
        // Set default POS system to Shopify if available
        const shopify = result.data.find(pos => pos.pos_name === "Shopify");
        if (shopify) {
          setFormData(prev => ({ ...prev, posSystem: shopify.pos_name }));
        }
      } else {
        throw new Error(result.message || "Failed to load POS systems");
      }
    } catch (err) {
      console.error("Error loading POS systems:", err);
      // Don't show error for POS systems, just use default
      setPosSystems([{ pos_id: "default", pos_name: "Shopify" }]);
    } finally {
      setPosSystemsLoading(false);
    }
  };



  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle attribute selection with constraint enforcement
  const handleAttributeChange = (mappingIndex, newAttributeName) => {
    setMappingSelections(prev => {
      const updated = [...prev];
      const currentMapping = updated[mappingIndex];
      

      // Find the master attribute details
      const masterAttr = allMasterAttributes.find(attr => attr.attribute_name === newAttributeName);

      // Check if this attribute is already used in the same constraint group
      const isAlreadyUsed = updated.some((mapping, idx) =>
        idx !== mappingIndex &&
        mapping.is_selected &&
        mapping.selected_attribute === newAttributeName 
      );

      if (isAlreadyUsed) {
        // Show error or warning - attribute already used in this group
        setError(`Attribute "${newAttributeName}" is already used in another group`);
        return prev; // Don't update
      }

      // Clear any previous error
      setError(null);

      // Update the mapping
      updated[mappingIndex] = {
        ...currentMapping,
        selected_attribute: newAttributeName,
        selected_attribute_id: masterAttr ? masterAttr.product_attribute_master_id : null,
        description: masterAttr ? masterAttr.attribute_description : "",
        data_type: masterAttr ? masterAttr.data_type : "",
        is_selected: newAttributeName !== "" ? true : currentMapping.is_selected
      };

      return updated;
    });
  };

  const handleGetAccess = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Validate required fields
      if (!formData.selectedStoreId) {
        throw new Error("Please select a store");
      }
      if (!formData.accessToken) {
        throw new Error("Please enter access token");
      }
      if (!formData.posUrl) {
        throw new Error("Please enter POS URL");
      }

      // Get selected store details
      const selectedStore = stores.find(store => store.client_store_id === formData.selectedStoreId);
      if (!selectedStore) {
        throw new Error("Selected store not found");
      }

      // Configure POS integration with field mapping
      const configureData = {
        client_id: config.clientId || "0486bc6d-6d15-4ea3-8504-adefe1512324",
        pos_system: formData.posSystem,
        access_token: formData.accessToken,
        store: selectedStore.store_name, // Use actual store name from database, not POS URL
        pos_url: formData.posUrl // Send POS URL separately for Shopify API calls
      };

      console.log("Starting POS configuration:", configureData);

      const configureResponse = await fetch(`${config.API_BASE_URL}/client/pos/configure-pos-new-simplified`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(configureData)
      });

      if (!configureResponse.ok) {
        throw new Error(`Failed to configure POS: ${configureResponse.status}`);
      }

      const configureResult = await configureResponse.json();
      console.log("POS configuration result:", configureResult);

      if (!configureResult.success) {
        throw new Error(configureResult.message || "Failed to configure POS");
      }

      // Extract data from response
      const products = configureResult.data.products || [];
      const variants = configureResult.data.variants || [];
      const metafields = configureResult.data.metafields || [];
      const masterAttributes = configureResult.data.master_attributes || [];

      console.log("Products:", products.length);
      console.log("Variants:", variants.length);
      console.log("Metafields:", metafields.length);
      console.log("Master Attributes:", masterAttributes.length);

      // Process the response data
      setAllMasterAttributes(masterAttributes);

      // Combine all field suggestions into a single array with categories
      const allFieldSuggestions = [
        ...products.map(item => ({ ...item, category: 'product' })),
        ...variants.map(item => ({ ...item, category: 'variant' })),
        ...metafields.map(item => ({ ...item, category: 'metafield' }))
      ];

      // Convert to the format expected by the UI with constraint handling
      const usedAttributes = new Set();

      const mappingSelections = allFieldSuggestions.map(item => {
        let finalSelected = item.is_checked || false;
        let finalSelectedAttribute = item.suggested_attribute_name || "";
        let finalSelectedAttributeId = item.product_attribute_master_id;

        // Apply constraint logic - if attribute already used in same group, unselect
        if (finalSelected && finalSelectedAttribute && usedAttributes.has(finalSelectedAttribute)) {
          finalSelected = false;
          finalSelectedAttribute = "";
          finalSelectedAttributeId = null;
        } else if (finalSelected && finalSelectedAttribute) {
          usedAttributes.add(finalSelectedAttribute);
        }

        return {
          pos_field_path: item.pos_field,
          suggested_attribute: item.suggested_attribute_name || "",
          suggested_attribute_id: item.product_attribute_master_id,
          confidence_score: item.is_checked ? 1.0 : 0.5,
          data_sample: item.pos_sample_value || "",
          selected_attribute: finalSelectedAttribute,
          selected_attribute_id: finalSelectedAttributeId,
          is_selected: finalSelected,
          is_existing_mapping: false,
          category: item.category,
          description: item.attribute_description || "",
          data_type: item.data_type || "",
          occurrence_count: 1
        };
      });

      setMappingSelections(mappingSelections);

      const totalFields = allFieldSuggestions.length;
      const checkedFields = allFieldSuggestions.filter(item => item.is_checked).length;
      setSuccess(`Discovered ${totalFields} fields (${checkedFields} auto-selected)`);

      console.log("POS configuration completed successfully");

    } catch (err) {
      console.error("API Error:", err);
      setError(err.message || "Failed to fetch data from API");
    } finally {
      setLoading(false);
    }
  };



  const handleMappingChange = (index, field, value) => {
    setMappingSelections(prev =>
      prev.map((item, i) => {
        if (i === index) {
          const updatedItem = { ...item, [field]: value };

          // If checkbox is unchecked, clear the mapping
          if (field === "is_selected" && !value) {
            updatedItem.selected_attribute = "";
            updatedItem.description = "";
            updatedItem.data_type = "";
          }

          // If attribute selection changed, update description and data_type
          if (field === "selected_attribute") {
            const matchingAttribute = allMasterAttributes.find(attr =>
              attr.attribute_name === value
            );
            updatedItem.description = matchingAttribute?.description || "";
            updatedItem.data_type = matchingAttribute?.datatype || "";
          }

          return updatedItem;
        }
        return item;
      })
    );
  };



  const handleSaveMapping = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Get selected store details
      const selectedStore = stores.find(store => store.client_store_id === formData.selectedStoreId);
      if (!selectedStore) {
        throw new Error("Selected store not found");
      }

      // Filter only selected mappings and prepare for API
      const selectedMappings = mappingSelections
        .filter(mapping => mapping.is_selected && mapping.selected_attribute && mapping.selected_attribute !== "")
        .map((mapping, index) => ({
          shopify_field: mapping.pos_field_path,
          attribute_name: mapping.selected_attribute,
          category: mapping.category,
          mapping_order: index
        }));

      if (selectedMappings.length === 0) {
        throw new Error("Please select at least one field mapping");
      }

      const saveData = {
        client_id: config.clientId || "0486bc6d-6d15-4ea3-8504-adefe1512324",
        client_store_id: formData.selectedStoreId,
        pos_system: formData.posSystem,
        access_token: formData.accessToken,
        store: selectedStore.store_name,
        pos_url: formData.posUrl,
        field_mappings: selectedMappings
      };

      console.log("💾 Saving field mappings:", saveData);

      const response = await fetch(`${config.API_BASE_URL}/client/pos/configure`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(saveData)
      });

      if (!response.ok) {
        throw new Error(`Failed to save mappings: ${response.status}`);
      }

      const result = await response.json();
      console.log("Save mappings result:", result);

      if (!result.success) {
        throw new Error(result.message || "Failed to save field mappings");
      }

      setSuccess(`Successfully saved ${selectedMappings.length} field mappings!`);

      // Redirect to list page after successful submit
      setTimeout(() => {
        navigate("/pos-sync");
      }, 2000); // Wait 2 seconds to show success message

    } catch (err) {
      console.error("Save Mapping Error:", err);
      setError(err.message || "Failed to save field mappings");
    } finally {
      setLoading(false);
    }
  };



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
        {/* Store Selection Dropdown */}
        <Box sx={{ flex: 1, minWidth: "200px" }}>
          <FormControl fullWidth>
            <InputLabel>Store Name</InputLabel>
            <Select
              value={formData.selectedStoreId}
              onChange={(e) => handleInputChange("selectedStoreId", e.target.value)}
              label="Store Name"
              disabled={storesLoading}
            >
              {storesLoading ? (
                <MenuItem disabled>
                  <CircularProgress size={20} sx={{ mr: 1 }} />
                  Loading stores...
                </MenuItem>
              ) : (
                stores.map((store) => (
                  <MenuItem key={store.client_store_id} value={store.client_store_id}>
                    {store.store_name}
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>
        </Box>

        {/* POS System */}
        <Box sx={{ flex: 1, minWidth: "200px" }}>
          <FormControl fullWidth>
            <InputLabel>POS System</InputLabel>
            <Select
              value={formData.posSystem}
              onChange={(e) => handleInputChange("posSystem", e.target.value)}
              label="POS System"
              disabled={posSystemsLoading}
            >
              {posSystemsLoading ? (
                <MenuItem disabled>
                  <CircularProgress size={20} sx={{ mr: 1 }} />
                  Loading POS systems...
                </MenuItem>
              ) : (
                posSystems.map((pos) => (
                  <MenuItem key={pos.pos_id} value={pos.pos_name}>
                    {pos.pos_name}
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Second Row */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
          mb: 1,
          flexWrap: "wrap"
        }}
      >
        {/* POS URL */}
        <Box sx={{ flex: 1, minWidth: "200px" }}>
          <TextField
            fullWidth
            label="POS URL"
            value={formData.posUrl}
            onChange={(e) => handleInputChange("posUrl", e.target.value)}
            placeholder="your-store.myshopify.com"
            helperText="Enter your Shopify store domain (e.g., your-store.myshopify.com)"
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'background.paper',
                '&.Mui-focused': {
                  backgroundColor: 'background.paper',
                },
                '&:hover': {
                  backgroundColor: 'background.paper',
                }
              }
            }}
          />
        </Box>

        {/* Access Token */}
        <Box sx={{ flex: 1, minWidth: "200px" }}>
          <TextField
            fullWidth
            label="Access Token"
            value={formData.accessToken}
            onChange={(e) => handleInputChange("accessToken", e.target.value)}
            placeholder="shpat_..."
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'background.paper',
                '&.Mui-focused': {
                  backgroundColor: 'background.paper',
                },
                '&:hover': {
                  backgroundColor: 'background.paper',
                }
              }
            }}
            slotProps={{
              input: {
                endAdornment: (
                  <IconButton
                    size="small"
                    color="primary"
                    title="How to get Shopify Access Token"
                    sx={{ mr: 0.5 }}
                  >
                    <i className="material-symbols-outlined" style={{ fontSize: 16 }}>info</i>
                  </IconButton>
                )
              }
            }}
          />
        </Box>

        {/* Proceed Button */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
          <Button
            variant="contained"
            onClick={handleGetAccess}
            disabled={loading || !formData.selectedStoreId || !formData.accessToken || !formData.posUrl}
            sx={{ height: "56px", minWidth: "120px" }}
          >
            {loading ? <CircularProgress size={24} /> : "Proceed"}
          </Button>
        </Box>
      </Box>

      {/* Product Limit removed - batch job handles this automatically with batch_size=50 */}

      {/* Error/Success Messages */}
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

      {/* Field Mapping Section */}
      {mappingSelections.length > 0 && (
        <>
          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
            Field Mapping Configuration
          </Typography>

          <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
            Configure how POS fields map to our system attributes. 
          </Typography>

          {/* Column Headers */}
          <Box sx={{
            display: { xs: 'none', md: 'grid' }, // Hide on mobile, show on desktop
            gridTemplateColumns: '50px 2fr 1fr 1fr 100px 1fr',
            gap: 1,
            p: 2,
            backgroundColor: 'grey.100',
            borderRadius: 1,
            mb: 2,
            fontWeight: 'bold'
          }}>
            <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'text.primary' }}>Select</Typography>
            <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'text.primary' }}>POS Field</Typography>
            <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'text.primary' }}>Sample POS Value</Typography>
            <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'text.primary' }}>Master attribute</Typography>
            <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'text.primary' }}>Master Data Type</Typography>
            <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'text.primary' }}>Master Description</Typography>
          </Box>

          {/* Field Mapping Rows - Grouped by Category */}
          {['product', 'variant', 'metafield'].map(category => {
            const categoryMappings = mappingSelections.filter(mapping => mapping.category === category);
            if (categoryMappings.length === 0) return null;

            return (
              <Box key={category} sx={{ mb: 3 }}>
                {/* Category Header */}
                <Typography variant="h6" sx={{
                  mb: 2,
                  color: 'primary.main',
                  textTransform: 'capitalize',
                  fontSize: '1.1rem'
                }}>
                  {category === 'product' ? 'Products' : category === 'variant' ? 'Variants' : 'Metafields'} ({categoryMappings.length} fields)
                </Typography>

                {/* Category Fields */}
                {categoryMappings.map((mapping) => {
                  // Find the global index in mappingSelections array
                  const globalIndex = mappingSelections.findIndex(m => m === mapping);
                  return (
            <Box key={globalIndex} sx={{
              // Desktop grid layout
              display: { xs: 'block', md: 'grid' },
              gridTemplateColumns: { md: '50px 2fr 1fr 1fr 100px 1fr' },
              gap: 1,
              p: 2,
              mb: 1,
              border: 1,
              borderRadius: 1,
              borderColor: 'grey.300',
              backgroundColor: 'background.paper',
              alignItems: 'center'
            }}>
              {/* Checkbox */}
              <Box sx={{
                display: 'flex',
                justifyContent: { xs: 'flex-start', md: 'center' },
                alignItems: 'center',
                mb: { xs: 2, md: 0 }
              }}>
                <input
                  type="checkbox"
                  checked={mapping.is_selected}
                  onChange={(e) => handleMappingChange(globalIndex, "is_selected", e.target.checked)}
                  style={{ transform: 'scale(1.1)' }}
                />
                <Typography variant="body2" sx={{ display: { xs: 'inline', md: 'none' }, fontWeight: 'bold', ml: 1 }}>
                  Select Field
                </Typography>
              </Box>

              {/* POS Field */}
              <Box sx={{ mb: { xs: 2, md: 0 } }}>
                <Typography variant="body2" sx={{ display: { xs: 'block', md: 'none' }, fontWeight: 'bold', mb: 1, color: 'primary.main' }}>
                  POS Field:
                </Typography>
                <TextField
                  value={mapping.pos_field_path}
                  size="small"
                  variant="outlined"
                  fullWidth
                  slotProps={{ input: { readOnly: true } }}
                  sx={{
                    '& .MuiInputBase-input': {
                      fontFamily: 'monospace',
                      fontSize: '0.85rem',
                      backgroundColor: 'grey.50'
                    }
                  }}
                />
              </Box>

              {/* Sample Value */}
              <Box sx={{ mb: { xs: 2, md: 0 } }}>
                <Typography variant="body2" sx={{ display: { xs: 'block', md: 'none' }, fontWeight: 'bold', mb: 1, color: 'primary.main' }}>
                  Sample Value:
                </Typography>
                <TextField
                  value={Array.isArray(mapping.data_sample) ? JSON.stringify(mapping.data_sample) : (mapping.data_sample || "N/A")}
                  size="small"
                  variant="outlined"
                  fullWidth
                  slotProps={{ input: { readOnly: true } }}
                  sx={{
                    '& .MuiInputBase-input': {
                      fontSize: '0.85rem',
                      backgroundColor: 'grey.50'
                    }
                  }}
                />
              </Box>

              {/* Liza Attribute Dropdown */}
              <Box sx={{ mb: { xs: 2, md: 0 } }}>
                <Typography variant="body2" sx={{ display: { xs: 'block', md: 'none' }, fontWeight: 'bold', mb: 1, color: 'primary.main' }}>
                  Liza Attribute:
                </Typography>
                <FormControl fullWidth size="small">
                  <Select
                    value={mapping.selected_attribute || ""}
                    onChange={(e) => handleAttributeChange(globalIndex, e.target.value)}
                    disabled={!mapping.is_selected}
                    displayEmpty
                    sx={{ backgroundColor: mapping.is_selected ? 'white' : 'grey.100' }}
                  >
                    <MenuItem value=""><em>Select Attribute</em></MenuItem>
                    {allMasterAttributes
                      .filter(attr => {
                       
                        const isUsed = mappingSelections.some((m, idx) =>
                          idx !== globalIndex &&
                          m.is_selected &&
                          m.selected_attribute === attr.attribute_name
                        );
                        return !isUsed || mapping.selected_attribute === attr.attribute_name;
                      })
                      .sort((a, b) => a.attribute_display_text.localeCompare(b.attribute_display_text))
                      .map((attr) => (
                      <MenuItem key={attr.attribute_name} value={attr.attribute_name}>
                        {attr.attribute_display_text}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              {/* Data Type */}
              <Box sx={{ mb: { xs: 2, md: 0 } }}>
                <Typography variant="body2" sx={{ display: { xs: 'block', md: 'none' }, fontWeight: 'bold', mb: 1, color: 'primary.main' }}>
                  Data Type:
                </Typography>
                <TextField
                  value={mapping.data_type || ""}
                  size="small"
                  variant="outlined"
                  fullWidth
                  slotProps={{ input: { readOnly: true } }}
                  sx={{
                    '& .MuiInputBase-input': {
                      fontSize: '0.85rem',
                      backgroundColor: 'grey.50',
                      textAlign: { xs: 'left', md: 'center' }
                    }
                  }}
                />
              </Box>

              {/* Description */}
              <Box sx={{ mb: { xs: 0, md: 0 } }}>
                <Typography variant="body2" sx={{ display: { xs: 'block', md: 'none' }, fontWeight: 'bold', mb: 1, color: 'primary.main' }}>
                  Description:
                </Typography>
                <TextField
                  value={mapping.description || ""}
                  size="small"
                  variant="outlined"
                  fullWidth
                  slotProps={{ input: { readOnly: true } }}
                  sx={{
                    '& .MuiInputBase-input': {
                      fontSize: '0.85rem',
                      backgroundColor: 'grey.50'
                    }
                  }}
                />
              </Box>
                  </Box>
                  );
                })}
              </Box>
            );
          })}

          {/* Submit Mapping Button */}
          <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveMapping}
              disabled={loading || mappingSelections.filter(m => m.is_selected).length === 0}
              sx={{ minWidth: "200px" }}
            >
              {loading ? <CircularProgress size={24} /> : "Submit"}
            </Button>
          </Box>
        </>
      )}


    </Card>
  );
};

export default POSConfigure;

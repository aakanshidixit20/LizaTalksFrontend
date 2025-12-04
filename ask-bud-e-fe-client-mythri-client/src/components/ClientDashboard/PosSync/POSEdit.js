import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Typography,
  Alert,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Divider,
  IconButton,
  Switch,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import config from "../../../config";

const POSEdit = () => {
  const { store_id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);

  // Form data for POS configuration
  const [formData, setFormData] = useState({
    storeName: "",
    posSystem: "Shopify",
    accessToken: "",
    posUrl: "",
    status: "active", // Default to active
  });

  // Confirmation modal state
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [pendingStatusChange, setPendingStatusChange] = useState(null);

  // Store configuration data
  const [storeConfig, setStoreConfig] = useState(null);

  // Mapping data
  const [mappingSelections, setMappingSelections] = useState([]);
  const [allMasterAttributes, setAllMasterAttributes] = useState([]);

  // Handle status change with immediate API call
  const handleStatusChange = (event) => {
    const newStatus = event.target.checked ? 'active' : 'inactive';

    if (newStatus === 'inactive') {
      // Show confirmation modal for inactive
      setPendingStatusChange(newStatus);
      setConfirmModalOpen(true);
    } else {
      // Direct change to active with immediate API call
      updatePosStatus(newStatus);
    }
  };

  // Update POS status via dedicated API
  const updatePosStatus = async (newStatus) => {
    setLoading(true);
    setError(null);

    try {
      console.log(`🔧 Updating POS status to: ${newStatus}`);

      const response = await fetch(`${config.API_BASE_URL}/client/pos/update-pos-status`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          client_store_id: store_id,
          status: newStatus
        })
      });

      const result = await response.json();

      if (result.success) {
        console.log(`✅ POS status updated successfully to: ${newStatus}`);

        // Update local state
        setFormData(prev => ({ ...prev, status: newStatus }));

        // Refresh data after status change
        await refreshDataAfterStatusChange();

        setSuccess(`POS status updated to ${newStatus === 'active' ? 'Active' : 'Inactive'}`);
      } else {
        console.error("❌ Failed to update POS status:", result.message);
        setError(result.message || "Failed to update POS status");
      }
    } catch (error) {
      console.error("❌ Error updating POS status:", error);
      setError("Failed to update POS status. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Refresh configuration and mappings after status change
  const refreshDataAfterStatusChange = async () => {
    try {
      console.log("🔄 Refreshing data after status change...");

      // Refresh store configuration
       const configResponse = await fetch(`${config.API_BASE_URL}/client/pos/get-store-config/${store_id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        })
      const configResult = await configResponse.json();

      if (configResult.success && configResult.data) {
        const config = configResult.data;
        setStoreConfig(config);

        // Update form data with refreshed config
        setFormData(prev => ({
          ...prev,
          storeName: config.store_name || "",
          posSystem: config.pos_name || "Shopify",
          accessToken: config.pos_api_key || "",
          posUrl: config.pos_url || "",
          status: config.status || "active",
        }));
      }

      // Refresh mappings with suggestions
      const mappingsResponse = await fetch(`${config.API_BASE_URL}/client/pos/get-edit-mappings-with-suggestions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            client_store_id: store_id
          })
        });
      const mappingsResult = await mappingsResponse.json();

      if (mappingsResult.success && mappingsResult.data) {
        const { existing_mappings, new_suggestions, master_attributes } = mappingsResult.data;

        // Combine existing mappings and new suggestions
        const combinedMappings = [
          ...existing_mappings.product,
          ...existing_mappings.variant,
          ...existing_mappings.metafield,
          ...new_suggestions.product,
          ...new_suggestions.variant,
          ...new_suggestions.metafield
        ];

        setMappingSelections(combinedMappings);
        setAllMasterAttributes(master_attributes);

        console.log("✅ Data refreshed successfully after status change");
      }
    } catch (error) {
      console.error("❌ Error refreshing data:", error);
    }
  };

  // Handle confirmation modal actions
  const handleConfirmStatusChange = async () => {
    if (pendingStatusChange) {
      // Make API call for inactive status
      await updatePosStatus(pendingStatusChange);
    }
    setConfirmModalOpen(false);
    setPendingStatusChange(null);
  };

  const handleCancelStatusChange = () => {
    setConfirmModalOpen(false);
    setPendingStatusChange(null);
  };

  // Load store configuration and existing mappings on component mount
  useEffect(() => {
    const loadStoreData = async () => {
      if (!store_id) {
        setError("Store ID is required");
        setInitialLoading(false);
        return;
      }

      try {
        setInitialLoading(true);

        // Get store configuration from client_pos table
        const configResponse = await fetch(`${config.API_BASE_URL}/client/pos/get-store-config/${store_id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });

        if (configResponse.ok) {
          const configResult = await configResponse.json();
          console.log("Store Config Response:", configResult);

          if (configResult.success && configResult.data) {
            const config = configResult.data;
            setStoreConfig(config);

            // Pre-fill form with existing configuration
            setFormData({
              storeName: config.store_name || "",
              posSystem: config.pos_name || "Shopify",
              accessToken: config.pos_api_key || "",
              posUrl: config.pos_url || "",
              status: config.status || "active",
            });
          }
        }

        // Load existing field mappings with new suggestions using combined endpoint
        console.log("Loading existing field mappings with suggestions for edit mode, store:", store_id);

        const mappingsResponse = await fetch(`${config.API_BASE_URL}/client/pos/get-edit-mappings-with-suggestions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            client_store_id: store_id
          })
        });

        if (!mappingsResponse.ok) {
          throw new Error(`Failed to load field mappings: ${mappingsResponse.status} ${mappingsResponse.statusText}`);
        }

        const mappingsResult = await mappingsResponse.json();
        console.log("Edit Mappings Response:", mappingsResult);

        if (mappingsResult.success) {
          const data = mappingsResult.data;
          const existingMappings = data.field_mapping_suggestions || [];
          const masterAttributes = data.all_master_attributes || [];

          if (existingMappings.length > 0) {
            setMappingSelections(existingMappings);
            setAllMasterAttributes(masterAttributes);

            // Count existing vs new suggestions
            const existingCount = existingMappings.filter(m => m.is_selected === true).length;
            const newCount = existingMappings.filter(m => m.is_selected === false).length;

            setSuccess(`Loaded ${existingCount} existing mappings and ${newCount} new suggestions for editing!`);
          } else {
            setError("No field mappings found. Please configure field mappings first using 'Configure POS'.");
            return;
          }
        } else {
          throw new Error(mappingsResult.message || "Failed to load field mappings");
        }

      } catch (err) {
        console.error("Load Error:", err);
        setError(err.message || "Failed to load store data");
      } finally {
        setInitialLoading(false);
      }
    };

    loadStoreData();
  }, [store_id]);

  // Handle mapping changes (checkbox and dropdown)
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

  // Handle attribute selection with constraint enforcement
  const handleAttributeChange = (mappingIndex, newAttributeName) => {
    setMappingSelections(prev => {
      const updated = [...prev];
      const currentMapping = updated[mappingIndex];
      const constraintGroup = (currentMapping.category === 'variant') ? 'variants' : 'products_metafields';

      // Check if this attribute is already used in the same constraint group
      const isAlreadyUsed = updated.some((mapping, idx) => {
        if (idx === mappingIndex) return false; // Skip current mapping
        if (mapping.selected_attribute !== newAttributeName) return false; // Different attribute
        
        const mappingConstraintGroup = (mapping.category === 'variant') ? 'variants' : 'products_metafields';
        return mappingConstraintGroup === constraintGroup;
      });

      if (isAlreadyUsed) {
        // Show error or handle constraint violation
        console.warn(`Attribute "${newAttributeName}" is already used in ${constraintGroup} group`);
        return prev; // Don't update if constraint violated
      }

      // Update the mapping
      updated[mappingIndex] = {
        ...currentMapping,
        selected_attribute: newAttributeName
      };

      // Update description and data_type based on selected attribute
      const matchingAttribute = allMasterAttributes.find(attr => attr.attribute_name === newAttributeName);
      if (matchingAttribute) {
        updated[mappingIndex].description = matchingAttribute.description || "";
        updated[mappingIndex].data_type = matchingAttribute.datatype || "";
      }

      return updated;
    });
  };

  // Update POS configuration
  const handleUpdateConfiguration = async () => {
    if (!storeConfig) return;

    const hasChanges =
      formData.accessToken !== storeConfig.pos_api_key ||
      formData.posUrl !== storeConfig.pos_url ||
      formData.posSystem !== storeConfig.pos_name;

    if (!hasChanges) {
      console.log("No configuration changes detected");
      return;
    }

    try {
      setLoading(true);
      console.log("Updating POS configuration...");

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
      if (updateResult.success) {
        console.log("Configuration updated successfully");
        setSuccess("POS configuration updated successfully!");
      } else {
        throw new Error(updateResult.message || "Configuration update failed");
      }
    } catch (err) {
      console.error("Configuration update error:", err);
      setError(err.message || "Failed to update configuration");
    } finally {
      setLoading(false);
    }
  };

  // Submit mapping updates
  const handleSaveMapping = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Update configuration if needed
      await handleUpdateConfiguration();

      // Prepare mapping data for update (only selected mappings)
      const mappingData = {
        client_store_id: store_id,
        field_mappings: mappingSelections.map(item => ({
          pos_field_path: item.pos_field_path,
          selected_attribute: item.selected_attribute,
          is_selected: item.is_selected
        })),
        // Include POS configuration updates
        pos_api_key: formData.accessToken,
        status: formData.status
      };

      console.log("Submitting mapping updates:", mappingData);

      const response = await fetch(`${config.API_BASE_URL}/client/pos/update-field-mappings`, {
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
      console.log("Update API Response:", result);

      if (result.success) {
        const { updated_count, inserted_count, deactivated_count } = result.data;
        const actions = [];
        if (updated_count > 0) actions.push(`${updated_count} updated`);
        if (inserted_count > 0) actions.push(`${inserted_count} added`);
        if (deactivated_count > 0) actions.push(`${deactivated_count} removed`);

        setSuccess(`Successfully processed field mappings: ${actions.join(', ')}!`);
      } else {
        throw new Error(result.message || "Update failed");
      }

    } catch (err) {
      console.error("Update API Error:", err);
      setError(err.message || "Failed to update field mappings");
    } finally {
      setLoading(false);
    }
  };



  if (initialLoading) {
    return (
      <Card sx={{ boxShadow: "none", borderRadius: 2, mb: 3, p: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 200 }}>
          <CircularProgress />
          <Typography sx={{ ml: 2 }}>Loading store configuration...</Typography>
        </Box>
      </Card>
    );
  }

  return (
    <Card sx={{ boxShadow: "none", borderRadius: 2, mb: 3, p: 2 }}>
      {/* Top Section */}
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 3, mb: 3 }}>
        {/* Left Column - Form Fields */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant="h6" sx={{ mb: 1, color: 'primary.main' }}>
            Edit POS Configuration
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Update your POS settings and field mappings
          </Typography>

          {/* Store Name and POS System - Side by Side Layout */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: 2,
              flexWrap: "wrap"
            }}
          >
            {/* Store Name */}
            <Box sx={{ flex: 1, minWidth: "200px" }}>
              <TextField
                fullWidth
                label="Store Name"
                value={formData.storeName}
                onChange={(e) => setFormData(prev => ({ ...prev, storeName: e.target.value }))}
                size="small"
                variant="outlined"
                slotProps={{ input: { readOnly: true } }}
                sx={{ '& .MuiInputBase-input': { backgroundColor: 'grey.50' } }}
              />
            </Box>

            {/* POS System */}
            <Box sx={{ flex: 1, minWidth: "200px" }}>
              <TextField
                fullWidth
                label="POS System"
                value={formData.posSystem}
                size="small"
                variant="outlined"
                slotProps={{ input: { readOnly: true } }}
                sx={{ '& .MuiInputBase-input': { backgroundColor: 'grey.50' } }}
              />
            </Box>
          </Box>

          {/* POS URL and Access Token - Side by Side Layout */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: 2,
              flexWrap: "wrap"
            }}
          >
            {/* POS URL */}
            <Box sx={{ flex: 1, minWidth: "200px" }}>
              <TextField
                fullWidth
                label="POS URL"
                value={formData.posUrl}
                placeholder="your-store.myshopify.com"
                helperText="POS URL (read-only)"
                size="small"
                variant="outlined"
                slotProps={{ input: { readOnly: true } }}
                sx={{ '& .MuiInputBase-input': { backgroundColor: 'grey.50' } }}
              />
            </Box>

            {/* Access Token */}
            <Box sx={{ flex: 1, minWidth: "200px" }}>
              <TextField
                fullWidth
                label="Access Token"
                value={formData.accessToken}
                onChange={(e) => setFormData(prev => ({ ...prev, accessToken: e.target.value }))}
                placeholder="shpat_..."
                type="password"
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
          </Box>

          {/* Status Toggle */}
          <Box sx={{ mt: 2 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.status === 'active'}
                  onChange={handleStatusChange}
                  color="success"
                />
              }
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    POS Status:
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: formData.status === 'active' ? 'success.main' : 'error.main',
                      fontWeight: 'bold'
                    }}
                  >
                    {formData.status === 'active' ? 'Active' : 'Inactive'}
                  </Typography>
                </Box>
              }
            />
          </Box>
        </Box>
      </Box>

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
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Update how POS fields map to your system attributes
          </Typography>

          {/* Column Headers */}
          <Box sx={{
            display: { xs: 'none', md: 'grid' },
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
            <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'text.primary' }}>Sample Value</Typography>
            <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'text.primary' }}>Liza Attribute</Typography>
            <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'text.primary' }}>Data Type</Typography>
            <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'text.primary' }}>Description</Typography>
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
                  value={mapping.sample_value || "N/A"}
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
                        const constraintGroup = (mapping.category === 'variant') ? 'variants' : 'products_metafields';
                        const isUsed = mappingSelections.some((m, idx) =>
                          idx !== globalIndex &&
                          m.selected_attribute === attr.attribute_name &&
                          ((m.category === 'variant') ? 'variants' : 'products_metafields') === constraintGroup
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
                      backgroundColor: 'grey.50'
                    }
                  }}
                />
              </Box>

              {/* Description */}
              <Box sx={{ mb: { xs: 2, md: 0 } }}>
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
              {loading ? <CircularProgress size={24} /> : "Update Field Mappings"}
            </Button>
          </Box>
        </>
      )}

      {/* Confirmation Modal for Status Change */}
      <Dialog open={confirmModalOpen} onClose={handleCancelStatusChange} maxWidth="xs" fullWidth>
        <DialogTitle>Confirm POS Status Change</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to disable POS integration for{" "}
            <strong>{formData.storeName}</strong>?
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            This will deactivate all POS functionality for this store.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelStatusChange} variant="outlined" color="secondary">
            Cancel
          </Button>
          <Button onClick={handleConfirmStatusChange} variant="contained" color="error">
            Yes, Disable
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default POSEdit;

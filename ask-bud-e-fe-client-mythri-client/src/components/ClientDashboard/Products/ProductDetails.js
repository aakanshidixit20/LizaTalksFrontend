import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  Chip,
  CircularProgress,
  Alert,
  Grid
} from "@mui/material";
import config from "../../../config";

// Field grouping configuration
const FIELD_GROUPS = {
  basic: {
    title: "Basic Information",
    color: "#605DFF",
    fields: [
      "product_name", "product_description", "product_code", "product_sku",
      "brand_name", "product_type", "product_subtype", "collection_name",
      "vendor_id", "producer_name", "regulatory_category"
    ]
  },
  pricing: {
    title: "Pricing & Inventory",
    color: "#25B003",
    fields: [
      "product_price", "currency", "price_per_mg_thc", "inventory_quantity",
      "product_availability", "is_active", "is_boost"
    ]
  },
  packaging: {
    title: "Packaging & Storage",
    color: "#3584FC",
    fields: [
      "net_weight", "gross_weight", "weight_unit", "package_dimensions",
      "package_material", "packaging_type", "packaging_unit",
      "storage_instructions", "storage_temperature", "shipping_restrictions"
    ]
  },
  cannabinoids: {
    title: "Cannabinoid Profile",
    color: "#9333EA",
    fields: [
      "total_active_cannabinoids", "cannabinoid_profile", "thc_content_pct",
      "thc_content_mg", "calculated_thc_mg", "thc_d9_pct", "thca_pct",
      "cbd_content_pct", "cbd_content_mg", "cbda_pct", "cbn_pct", "cbg_pct",
      "minor_cannabinoids", "cannabinoid_ratio", "cannabinoid_certification"
    ]
  },
  terpenes: {
    title: "Terpene & Flavor Profile",
    color: "#F59E0B",
    fields: [
      "terpene_profile", "terpene_percent", "flavor_profile", "aroma_notes", "flavor"
    ]
  },
  strain: {
    title: "Strain Information",
    color: "#10B981",
    fields: [
      "strain_name", "strain_type", "strain_family", "strain_origin",
      "strain_lineage", "phenotype", "seed_type"
    ]
  },
  effects: {
    title: "Effects & Usage",
    color: "#EC4899",
    fields: [
      "effects_profile", "mood", "physical_effects", "effect_intensity",
      "onset_time", "effect_duration", "time_to_effect", "onset_by_form",
      "recommended_use", "pairing_recommendation", "medicinal_purpose",
      "recreational_use_level", "intended_body_area"
    ]
  },
  compliance: {
    title: "Testing & Compliance",
    color: "#EF4444",
    fields: [
      "test_lab_name", "test_batch_number", "lab_results_url", "potency_level",
      "cannabinoid_certification_status", "organic_certification_status",
      "lot_tracking_number", "warning_labels", "state_compliance_status",
      "state_restrictions", "batch_number", "harvest_date", "expiry_date"
    ]
  },
  metadata: {
    title: "System Information",
    color: "#64748B",
    fields: [
      "store_pos_product_id", "master_pos_product_id", "pos_product_id",
      "client_store_id", "store_name", "created_date", "modified_date",
      "modified_by", "is_cannabis_specific", "attribute_sort_order"
    ]
  }
};

// Field display name mapping
const FIELD_LABELS = {
  product_name: "Product Name",
  product_description: "Description",
  product_code: "Product Code",
  product_sku: "SKU",
  brand_name: "Brand",
  product_type: "Product Type",
  product_subtype: "Product Subtype",
  collection_name: "Collection",
  vendor_id: "Vendor ID",
  producer_name: "Producer",
  regulatory_category: "Regulatory Category",
  product_price: "Price",
  currency: "Currency",
  price_per_mg_thc: "Price per mg THC",
  inventory_quantity: "Inventory",
  product_availability: "Availability",
  is_active: "Active Status",
  is_boost: "Boosted",
  net_weight: "Net Weight",
  gross_weight: "Gross Weight",
  weight_unit: "Weight Unit",
  package_dimensions: "Package Dimensions",
  package_material: "Package Material",
  packaging_type: "Packaging Type",
  packaging_unit: "Packaging Unit",
  storage_instructions: "Storage Instructions",
  storage_temperature: "Storage Temperature",
  shipping_restrictions: "Shipping Restrictions",
  total_active_cannabinoids: "Total Active Cannabinoids",
  cannabinoid_profile: "Cannabinoid Profile",
  thc_content_pct: "THC Content (%)",
  thc_content_mg: "THC Content (mg)",
  calculated_thc_mg: "Calculated THC (mg)",
  thc_d9_pct: "Delta-9 THC (%)",
  thca_pct: "THCA (%)",
  cbd_content_pct: "CBD Content (%)",
  cbd_content_mg: "CBD Content (mg)",
  cbda_pct: "CBDA (%)",
  cbn_pct: "CBN (%)",
  cbg_pct: "CBG (%)",
  minor_cannabinoids: "Minor Cannabinoids",
  cannabinoid_ratio: "Cannabinoid Ratio",
  cannabinoid_certification: "Cannabinoid Certification",
  terpene_profile: "Terpene Profile",
  terpene_percent: "Terpene Percentage",
  flavor_profile: "Flavor Profile",
  aroma_notes: "Aroma Notes",
  flavor: "Flavor",
  strain_name: "Strain Name",
  strain_type: "Strain Type",
  strain_family: "Strain Family",
  strain_origin: "Strain Origin",
  strain_lineage: "Strain Lineage",
  phenotype: "Phenotype",
  seed_type: "Seed Type",
  effects_profile: "Effects Profile",
  mood: "Mood",
  physical_effects: "Physical Effects",
  effect_intensity: "Effect Intensity",
  onset_time: "Onset Time",
  effect_duration: "Effect Duration",
  time_to_effect: "Time to Effect",
  onset_by_form: "Onset by Form",
  recommended_use: "Recommended Use",
  pairing_recommendation: "Pairing Recommendation",
  medicinal_purpose: "Medicinal Purpose",
  recreational_use_level: "Recreational Use Level",
  intended_body_area: "Intended Body Area",
  test_lab_name: "Test Lab",
  test_batch_number: "Test Batch Number",
  lab_results_url: "Lab Results URL",
  potency_level: "Potency Level",
  cannabinoid_certification_status: "Cannabinoid Certification Status",
  organic_certification_status: "Organic Certification Status",
  lot_tracking_number: "Lot Tracking Number",
  warning_labels: "Warning Labels",
  state_compliance_status: "State Compliance Status",
  state_restrictions: "State Restrictions",
  batch_number: "Batch Number",
  harvest_date: "Harvest Date",
  expiry_date: "Expiry Date",
  store_pos_product_id: "Product ID",
  master_pos_product_id: "Master Product ID",
  pos_product_id: "POS Product ID",
  client_store_id: "Store ID",
  store_name: "Store Name",
  created_date: "Created Date",
  modified_date: "Last Modified",
  modified_by: "Modified By",
  is_cannabis_specific: "Cannabis Specific",
  attribute_sort_order: "Sort Order",
  tags: "Tags",
  promo_tags: "Promo Tags"
};

function ProductDetails() {
  const { product_code } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProductDetails();
  }, [product_code]);

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      const clientId = config.clientId;
      if (!clientId) {
        setError("Client ID not found. Please log in again.");
        setLoading(false);
        return;
      }

      const res = await fetch(
        `${config.API_BASE_URL}/client/product/products/${product_code}?client_id=${clientId}`
      );
      const json = await res.json();

      if (!res.ok || json?.success === false) {
        setError(json?.message || "Failed to fetch product details");
        setProduct(null);
        setLoading(false);
        return;
      }

      setProduct(json.data);
    } catch (err) {
      console.error("Error fetching product details:", err);
      setError(err.message || "An error occurred while fetching product details");
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to check if a value is populated
  const hasValue = (value) => {
    if (value === null || value === undefined || value === "") return false;
    if (Array.isArray(value) && value.length === 0) return false;
    if (typeof value === "object" && Object.keys(value).length === 0) return false;
    return true;
  };

  // Helper function to format field values
  const formatValue = (key, value) => {
    // Handle boolean values
    if (typeof value === "boolean") {
      return value ? "Yes" : "No";
    }

    // Handle dates
    if (key.includes("date") && value) {
      try {
        return new Date(value).toLocaleString();
      } catch {
        return value;
      }
    }

    // Handle arrays (tags, mood, etc.)
    if (Array.isArray(value)) {
      return value;
    }

    // Handle JSON strings (parse if possible)
    if (typeof value === "string" && (value.startsWith("[") || value.startsWith("{"))) {
      try {
        const parsed = JSON.parse(value);
        if (Array.isArray(parsed)) {
          return parsed;
        }
        return JSON.stringify(parsed, null, 2);
      } catch {
        return value;
      }
    }

    // Handle price fields
    if (key.includes("price") && !isNaN(value)) {
      return `$${Number(value).toFixed(2)}`;
    }

    // Handle percentage fields
    if (key.includes("pct") && !isNaN(value)) {
      return `${Number(value).toFixed(2)}%`;
    }

    return value;
  };

  // Helper function to get field label
  const getFieldLabel = (key) => {
    return FIELD_LABELS[key] || key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  // Group fields by category
  const groupFields = () => {
    if (!product) return {};

    const grouped = {};

    Object.entries(FIELD_GROUPS).forEach(([groupKey, groupConfig]) => {
      const groupFields = {};

      groupConfig.fields.forEach((fieldKey) => {
        if (product.hasOwnProperty(fieldKey) && hasValue(product[fieldKey])) {
          groupFields[fieldKey] = product[fieldKey];
        }
      });

      // Only add group if it has fields
      if (Object.keys(groupFields).length > 0) {
        grouped[groupKey] = {
          ...groupConfig,
          fields: groupFields
        };
      }
    });

    // Add any remaining fields that don't fit into predefined groups
    const allGroupedFields = new Set();
    Object.values(FIELD_GROUPS).forEach((group) => {
      group.fields.forEach((field) => allGroupedFields.add(field));
    });

    const otherFields = {};
    Object.keys(product).forEach((key) => {
      if (!allGroupedFields.has(key) && hasValue(product[key]) && key !== "client_id") {
        otherFields[key] = product[key];
      }
    });

    if (Object.keys(otherFields).length > 0) {
      grouped.other = {
        title: "Other Information",
        color: "#94A3B8",
        fields: otherFields
      };
    }

    return grouped;
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={6}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box mt={6} mx={2}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  const groupedFields = groupFields();

  return (
    <Box sx={{ p: 4, backgroundColor: "#F6F7F9", minHeight: "100vh" }}>
      {/* Breadcrumb Navigation */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="body2" sx={{ color: "#64748B" }}>
          <span onClick={() => navigate("/")} style={{ cursor: "pointer", color: "#605DFF" }}>
            Home
          </span>
          {" > "}
          <span onClick={() => navigate("/products")} style={{ cursor: "pointer", color: "#605DFF" }}>
            Products
          </span>
          {" > "}
          <span style={{ color: "#64748B" }}>{product?.product_name || "Product Details"}</span>
        </Typography>
      </Box>

      {/* Product Title */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight="700" sx={{ color: "#1E293B", mb: 1 }}>
          {product?.product_name || "Product Details"}
        </Typography>
        {product?.brand_name && (
          <Typography variant="body1" sx={{ color: "#64748B" }}>
            by {product.brand_name}
          </Typography>
        )}
      </Box>

      {/* Dynamic Field Groups */}
      <Grid container spacing={3}>
        {Object.entries(groupedFields).map(([groupKey, groupData]) => (
          <Grid item xs={12} key={groupKey}>
            <Card
              sx={{
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                borderRadius: 2,
                border: "1px solid #e0e0e0",
                p: 3
              }}
            >
              {/* Group Header */}
              <Box sx={{ mb: 2, pb: 2, borderBottom: `2px solid ${groupData.color}` }}>
                <Typography
                  variant="h6"
                  fontWeight="600"
                  sx={{ color: groupData.color }}
                >
                  {groupData.title}
                </Typography>
              </Box>

              {/* Group Fields */}
              <Grid container spacing={2}>
                {Object.entries(groupData.fields).map(([fieldKey, fieldValue]) => {
                  const formattedValue = formatValue(fieldKey, fieldValue);
                  const isArray = Array.isArray(formattedValue);

                  return (
                    <Grid item xs={12} sm={6} md={4} key={fieldKey}>
                      <Box>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#64748B",
                            fontWeight: 600,
                            textTransform: "uppercase",
                            fontSize: "0.7rem",
                            letterSpacing: "0.5px"
                          }}
                        >
                          {getFieldLabel(fieldKey)}
                        </Typography>

                        {isArray ? (
                          <Box sx={{ mt: 0.5, display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                            {formattedValue.map((item, idx) => (
                              <Chip
                                key={idx}
                                label={item}
                                size="small"
                                sx={{
                                  backgroundColor: "#EFF6FF",
                                  color: "#3B82F6",
                                  fontSize: "0.75rem",
                                  height: "24px"
                                }}
                              />
                            ))}
                          </Box>
                        ) : (
                          <Typography
                            variant="body2"
                            sx={{
                              color: "#1E293B",
                              fontWeight: 500,
                              mt: 0.5,
                              wordBreak: "break-word"
                            }}
                          >
                            {formattedValue}
                          </Typography>
                        )}
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* No Data Message */}
      {Object.keys(groupedFields).length === 0 && (
        <Card
          sx={{
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            borderRadius: 2,
            border: "1px solid #e0e0e0",
            p: 4,
            textAlign: "center"
          }}
        >
          <Typography variant="body1" sx={{ color: "#64748B" }}>
            No product details available.
          </Typography>
        </Card>
      )}
    </Box>
  );
}

export default ProductDetails;

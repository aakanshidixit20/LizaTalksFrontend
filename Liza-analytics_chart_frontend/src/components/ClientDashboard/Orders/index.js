import React, { useEffect, useState } from "react";
import GenericTable from "../GenericTable/GenericTable";
import { CircularProgress, Alert } from "@mui/material";
import config from "../../../config";
const ordersColumns = [
  { id: "order_id", label: "Order ID" },
  { id: "customer_name", label: "Customer Name" },
  {
    id: "product_names",
    label: "Product Name(s)",
    render: (row) => Array.isArray(row.product_names) ? row.product_names.join(", ") : row.product_names || ""
  },
  {
  id: "order_amount",
  label: "Order Amount",
  render: (row) => `$ ${Number(row.order_amount).toLocaleString()}`
},
{
  id: "bude_order_amount",
  label: "Bud-i Amount",
  render: (row) => `$ ${Number(row.bude_order_amount).toLocaleString()}`
},
  { id: "store_name", label: "Store Name" },
  { id: "order_date", label: "Order Date" },
  { id: "product_category", label: "Product Category" },
  { id: "brand", label: "Brand" }
];


function OrdersList() {
  const [loading, setLoading] = useState(true);
  const [ordersData, setOrdersData] = useState([]);
  const [error, setError] = useState(null);

  // Get client_id from localStorage (adjust based on your auth implementation)

  const clientId = config.clientId || "0486bc6d-6d15-4ea3-8504-adefe1512324";

  useEffect(() => {
    fetchOrdersData();
  }, []);

  const fetchOrdersData = async () => {
    setLoading(true);
    setError(null);

    try {
      console.log("🔍 Fetching orders data for client:", clientId);

      const response = await fetch(
        `${config.API_BASE_URL}/client/revenue/list?client_id=${clientId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      const result = await response.json();
      console.log("📊 Orders API response:", result);

      if (result.success && result.data) {
        setOrdersData(result.data);
        console.log(`✅ Loaded ${result.data.length} orders records`);
      } else {
        setError(result.message || "Failed to fetch orders data");
        console.error("❌ Orders fetch failed:", result.message);
      }
    } catch (err) {
      console.error("❌ Error fetching orders data:", err);
      setError("Failed to fetch orders data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <GenericTable
      title="Orders List"
      columns={ordersColumns}
      rows={ordersData}
      showView={false}
      showEdit={false}
      showDelete={false}
      dropdownFilters={["store_name","product_category","brand"]}
      dateFilters={["order_date"]}
      rangeFilters={["order_amount"]}
      onView={(row) => alert(`View user: ${row.username}`)}
      onEdit={(row) => alert(`Edit user: ${row.username}`)}
    />
  );
}

export default OrdersList;

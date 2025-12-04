import React, { useEffect, useState } from "react";
import GenericTable from "../GenericTable/GenericTable";
import productsList from "../../../data/products_list_success.json";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import config from "../../../config";

const ProductsColumns = [
  { id: "store_name", label: "Store Name" },
  { id: "product_code", label: "Product Code" },
  { id: "product_name", label: "Product Name" },
  {
    id: "product_price",
    label: "Product Price",
    render: (row) => `$ ${Number(row.product_price).toLocaleString()}`
  },
  { id: "category", label: "Category" },
  { id: "in_stock", label: "In Stock" },
  { id: "boost_sales", label: "Boost Sales" },
  { id: "last_sync_date", label: "Last Sync Date" }
];



function ProductsList() {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [boostingProductId, setBoostingProductId] = useState(null);
  const navigate = useNavigate();

  // Fetch products on component mount
  useEffect(() => {
    let abort = false;

    (async () => {
      try {
        setLoading(true);
        const clientId = config.clientId;

        if (!clientId) {
          console.error("Client ID not found");
          if (!abort) setRows([]);
          return;
        }

        // Fetch products for client
        const url = `${config.API_BASE_URL}/client/product/products?client_id=${clientId}&limit=500&offset=0`;

        const res = await fetch(url);
        const json = await res.json();

        if (!res.ok || json?.success === false) {
          if (!abort) setRows([]);
          return;
        }

        // Map backend response to frontend format
        const data = Array.isArray(json.data?.products) ? json.data.products : [];
        const storesMap = {};
        if (json.data?.stores_info) {
          json.data.stores_info.forEach(store => {
            storesMap[store.client_store_id] = store.store_name;
          });
        }

        const normalized = data.map((p) => ({
          product_id: p.product_id,
          store_name: storesMap[p.client_store_id] || "Unknown Store",
          product_code: p.product_sku || p.product_id,
          product_name: p.product_name || "",
          product_price: p.product_price || 0,
          category: p.product_type || "",
          in_stock: p.inventory_quantity > 0,
          boost_sales: p.is_boost ? "Yes" : "No",
          is_boost: p.is_boost,
          last_sync_date: p.modified_date ? new Date(p.modified_date).toISOString().split('T')[0] : "-"
        }));

        if (!abort) setRows(normalized);
      } catch (_e) {
        console.error("Error fetching products:", _e);
        if (!abort) setRows([]);
      } finally {
        if (!abort) setLoading(false);
      }
    })();

    return () => {
      abort = true;
    };
  }, []);

  // Handle boost/deboost action
  const handleBoostAction = async (row, newBoostStatus) => {
    try {
      setBoostingProductId(row.product_id);
      const clientId = config.clientId;

      const response = await fetch(`${config.API_BASE_URL}/client/product/products/boost`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          product_id: row.product_id,
          client_id: clientId,
          is_boost: newBoostStatus
        })
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        console.error("Failed to update boost status:", result);
        return;
      }

      console.log(`✅ Product boost status updated: ${row.product_name} - is_boost: ${newBoostStatus}`);

      // Refresh the page to fetch updated data from backend
      window.location.reload();
    } catch (error) {
      console.error("Error updating boost status:", error);
    } finally {
      setBoostingProductId(null);
    }
  };

  // 🔥 Custom Action: Boost Sales
  const customActions = [
    {
      label: "Boost Sales",
      icon: "rocket",
      color: "success",
      onClick: (row) => handleBoostAction(row, true),
      disabled: (row) => row.is_boost === true || boostingProductId === row.product_id
    },
    {
      label: "De-Boost Sales",
      icon: "arrow_cool_down",
      color: "error",
      onClick: (row) => handleBoostAction(row, false),
      disabled: (row) => row.is_boost === false || boostingProductId === row.product_id
    }
  ];

  // 🔥 Custom Header Button: Sync POS
  const customHeaderButtons = [
    {
      label: "Sync POS",
      icon: "sync",
      onClick: () => {
        navigate(`/products/sync-pos`);
      }
    }
  ];

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <GenericTable
      title="Products List"
      columns={ProductsColumns}
      rows={rows}
      showView={true}
      showEdit={false}
      showDelete={false}
      dropdownFilters={["store_name"]}
      rangeFilters={["product_price"]}
      customActions={customActions}
      customActionsHeader="Sales"
      customHeaderButtons={customHeaderButtons}
      onView={(row) => navigate(`/products/product-details/${row.product_code}`)}
    />
  );
}

export default ProductsList;

import React, { useEffect, useState } from "react";
import GenericTable from "../GenericTable/GenericTable";
import productsList from "../../../data/products_list_success.json"; // Assuming you have a JSON file with user data
import { CircularProgress } from "@mui/material";   

const ProductsColumns = [
  { id: "product_code", label: "Product Code" },
  { id: "product_name", label: "Product Name" },
  {
  id: "product_price",
  label: "Product Price",
  render: (row) => `$ ${Number(row.product_price).toLocaleString()}`
},
  { id: "category", label: "Category" },
  { id: "in_stock", label: "In Stock" },
  { id: "last_sync_date", label: "Last Sync Date" }
];

function ProductsList() {
  const [loading, setLoading] = useState(true);   
  
    useEffect(() => {
      // simulate loading delay (like API call)
      const timer = setTimeout(() => {
        setLoading(false);
      }, 150); // 0.5 sec spinner
  
      return () => clearTimeout(timer);
    }, []);
  

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
      rows={productsList.data}
      showView={false}
      showEdit={false}
      showDelete={false}
      dropdownFilters={["product_name"]}
      rangeFilters={["product_price"]}
    />
  );
}

export default ProductsList;

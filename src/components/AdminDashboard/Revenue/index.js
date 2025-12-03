// import React from "react";
// import GenericTable from "../GenericTable/GenericTable";
// import revenueList from "../../../data/revenue_overview_success.json"; // Assuming you have a JSON file with user data
// const revenueColumns = [
//   { id: "order_id", label: "Order ID" },
//   { id: "client_name", label: "Client Name"},
//   { id: "customer_name", label: "Customer Name" },
//   {
//     id: "product_names",
//     label: "Product Name(s)",
//     render: (row) => {
//       if (Array.isArray(row.product_names)) {
//         return row.product_names.join(", ");
//       }
//       return row.product_names || "";
//     }
//   },
//   {
//   id: "order_amount",
//   label: "Order Amount",
//   render: (row) => `$ ${Number(row.order_amount).toLocaleString()}`
// },
//  {
//   id: "bude_order_amount",
//   label: "Liza Amount($)",
//   render: (row) => `$ ${Number(row.bude_order_amount).toLocaleString()}`
// } ,
//   { id: "store_name", label: "Store Name" },
//   { id: "order_date", label: "Order Date" }
// ];

// function RevenueList() {
//   return (
//  <GenericTable
//       title="Client's Order"
//       columns={revenueColumns}
//       rows={revenueList.data}
//       showView={false}
//       showEdit={false}
//       showDelete={false}
//       dropdownFilters={["client_name","store_name"]}
//       rangeFilters={["order_amount"]}
//       // dateFilters={["order_date"]}
//       onView={(row) => alert(`View user: ${row.username}`)}
//       onEdit={(row) => alert(`Edit user: ${row.username}`)}
//       onDelete={(row) => {
//         if (window.confirm(`Delete user: ${row.username}?`)) {
//           console.log("Deleted", row);
//         }
//       }}
//     />
//   );
// }

// export default RevenueList;



import React from "react";
import GenericTable from "../GenericTable/GenericTable";
import orderData from "../../../data/revenue_overview_success.json";
 
// ========= COLUMN MAPPING =========
const orderColumns = [
  { id: "order_id", label: "Order ID" },
  { id: "order_date", label: "Order Date" },
  { id: "client_name", label: "Client Name" },
  { id: "store_name", label: "Store Name" },
  { id: "customer_name", label: "Customer Name" },
  {
    id: "product_names",
    label: "Product Name(s)",
    render: (row) =>
      Array.isArray(row.product_names)
        ? row.product_names.join(", ")
        : row.product_names || "",
  },
  {
    id: "order_amount",
    label: "Order Amount",
    render: (row) => `$ ${Number(row.order_amount).toLocaleString()}`,
  },
  {
    id: "bude_order_amount",
    label: "Bud-i Amount($)",
    render: (row) => `$ ${Number(row.bude_order_amount).toLocaleString()}`,
  },
];
 
function ClientOrderList() {
  return (
    <GenericTable
      title="Client Order"
      columns={orderColumns}
      rows={orderData.data}
 
      /* disable all default actions */
      showView={false}
      showEdit={false}
      showDelete={false}
 
      /* Filters required */
      dateFilters={["order_date"]}              // Date range filter
      rangeFilters={["bude_order_amount"]}      // Bud-i Amount filter
 
      /* removed client + store dropdown filters */
      dropdownFilters={[]}                      // 👈 Removed here
    />
  );
}
 
export default ClientOrderList;
 
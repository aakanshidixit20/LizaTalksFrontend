// import React from "react";
// import GenericTable from "../GenericTable/GenericTable";
// import billingInfo from "../../../data/billing_history_success.json"; // Assuming you have a JSON file with user data
// const billingColumns = [
//     { id: "client_name", label: "Client Name"},
//     { id: "store_name", label: "Store Name" },
//     { id: "invoice_number", label: "Invoice Number" },
//     { id: "billing_date", label: "Billing Date" },
//     { id: "payment_status", label: "Payment Status" },
//     { id: "subscription", label: "Subscription" },
//     { id: "brand", label: "Brand" },
//     {
//   id: "total_amount",
//   label: "Total Amount",
//   render: (row) => `$ ${Number(row.total_amount).toLocaleString()}`
// },
//     { id: "due_date", label: "Due Date" },
// ];
// const downloadInvoice = (row) => {
//   // For now, create a placeholder PDF Blob
//   const pdfContent = `
//     Invoice
//     ---------------------
//     Store: ${row.store_name}
//     Invoice #: ${row.invoice_number}
//     Billing Date: ${row.billing_date}
//     Subscription: ${row.subscription}
//     Total Amount: ${row.total_amount}
//     Payment Status: ${row.payment_status}
//     Due Date: ${row.due_date}
//   `;

//   const blob = new Blob([pdfContent], { type: "application/pdf" });
//   const url = URL.createObjectURL(blob);

//   const link = document.createElement("a");
//   link.href = url;
//   link.download = `Invoice_${row.invoice_number}.pdf`;
//   link.click();

//   URL.revokeObjectURL(url);
// };


// function BillingHistoryList() {
//   const customActions = [
//     {
//       label: "Download Invoice",
//       icon: "download",   // material-symbols-outlined
//       color: "primary",
//       onClick: downloadInvoice,
//     },
//   ];

//   return (
//     <GenericTable
//       title="Revenue Details"
//       subtitle=""
//       columns={billingColumns}
//       rows={billingInfo.data.billing_history}
//       showView={false}
//       showEdit={false}
//       showDelete={false}
//       dropdownFilters={["client_name","store_name","brand"]}
//       // dateFilters={["due_date"]}
//       customActions={customActions}   // ✅ added
//       customActionsHeader="Download Invoice" // ✅ added
//     />
//   );
// }


// export default BillingHistoryList;



import React from "react";
import GenericTable from "../GenericTable/GenericTable";
import billingInfo from "../../../data/billing_history_success.json";
 
// Columns in required order
const billingColumns = [
  { id: "invoice_number", label: "Invoice Number" },
  { id: "client_name", label: "Client Name" },
  { id: "store_name", label: "Store Name" },
  { id: "selected_plan", label: "Selected Plan" },
  {
    id: "total_amount",
    label: "Total Amount ($)",
    render: (row) => `$ ${Number(row.total_amount).toLocaleString()}`
  },
  { id: "due_date", label: "Due Date" },
  { id: "payment_status", label: "Payment Status" }
];
 
// Download function (unchanged)
const downloadInvoice = (row) => {
  const pdfContent = `
    Invoice
    ---------------------
    Client: ${row.client_name}
    Store: ${row.store_name}
    Invoice #: ${row.invoice_number}
    Plan: ${row.selected_plan}
    Billing Date: ${row.billing_date}
    Total Amount: ${row.total_amount}
    Payment Status: ${row.payment_status}
    Due Date: ${row.due_date}
  `;
 
  const blob = new Blob([pdfContent], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
 
  const link = document.createElement("a");
  link.href = url;
  link.download = `Invoice_${row.invoice_number}.pdf`;
  link.click();
 
  URL.revokeObjectURL(url);
};
 
// FORMAT DATA into required structure
function BillingHistoryList() {
  const formattedRows = billingInfo.data.billing_history.map((row) => ({
    ...row,
    selected_plan: row.subscription // plan + subscription will be added here later
  }));
 
  // custom action ONLY icon (same UI as before)
  const customActions = [
    {
      label: "",
      icon: "download",      // shows the small blue icon
      color: "primary",
      onClick: downloadInvoice
    }
  ];
 
  return (
    <GenericTable
      title="Revenue"
      columns={billingColumns}
      rows={formattedRows}
 
      showView={false}
      showEdit={false}
      showDelete={false}
 
      searchEnabled={true}
 
      dropdownFilters={["client_name", "payment_status"]}
      dateFilters={["due_date"]}
 
      customActions={customActions}
      customActionsHeader="Download Invoice"
    />
  );
}
 
export default BillingHistoryList;
 
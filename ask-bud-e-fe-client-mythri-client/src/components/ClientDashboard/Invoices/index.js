import React, { useEffect, useState } from "react";
import GenericTable from "../GenericTable/GenericTable";
import { CircularProgress } from "@mui/material";   
import config from "../../../config";

const invoiceColumns = [
  { id: "store_name", label: "Store Name" },
  { id: "invoice_number", label: "Invoice Number" },
  { id: "billing_date", label: "Billing Date" },
  { id: "payment_status", label: "Payment Status" },
  { id: "subscription", label: "Subscription" },
  {
    id: "total_amount",
    label: "Total Amount",
    render: (row) => `₹ ${Number(row.total_amount).toLocaleString()}`
  },
  { id: "due_date", label: "Due Date" },
];

const downloadInvoice = (row) => {
  // If invoice PDF URL exists, open it directly
  if (row.invoice_pdf_name) {
    // Open invoice PDF in new tab
    window.open(row.invoice_pdf_name, '_blank');
    return;
  }

  // Fallback: generate basic text invoice
  const pdfContent = `
    Invoice
    ---------------------
    Store: ${row.store_name}
    Invoice #: ${row.invoice_number}
    Billing Date: ${row.billing_date}
    Subscription: ${row.subscription}
    Total Amount: ₹${row.total_amount}
    Payment Status: ${row.payment_status}
    Due Date: ${row.due_date}
  `;

  const blob = new Blob([pdfContent], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `Invoice_${row.invoice_number}.pdf`;
  link.click();

  URL.revokeObjectURL(url);
};

function InvoicesList() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API constants
  const CLIENT_ID = config.clientId;

  useEffect(() => {
    const controller = new AbortController();

    const fetchInvoices = async () => {
      try {
        setLoading(true);
        setError(null);

        const url = `${config.API_BASE_URL}/client/billing/history?client_id=${CLIENT_ID}&page=1&limit=100`;
        
        const res = await fetch(url, { signal: controller.signal });
        
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: Failed to fetch invoices`);
        }

        const json = await res.json();
        
        if (!json.success) {
          throw new Error(json.message || "Failed to fetch invoices");
        }

        // Set the invoices data
        setRows(Array.isArray(json.data) ? json.data : []);
        
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error("[InvoicesList] Fetch error:", error);
          setError(error.message);
          setRows([]); // Fallback to empty array
        }
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();

    return () => controller.abort();
  }, [CLIENT_ID]);

  const customActions = [
    {
      label: "Download Invoice",
      icon: "download",
      color: "primary",
      onClick: downloadInvoice,
    },
  ];

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        marginTop: "2rem",
        padding: "2rem",
        textAlign: "center"
      }}>
        <p style={{ color: "red", marginBottom: "1rem" }}>
          Failed to load invoices: {error}
        </p>
        <button 
          onClick={() => window.location.reload()} 
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#1976d2",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <GenericTable
      title="Invoice Details"
      subtitle=""
      columns={invoiceColumns}
      rows={rows}
      showView={false}
      showEdit={false}
      showDelete={false}
      dropdownFilters={["store_name", "payment_status", "subscription"]}
      dateFilters={["billing_date", "due_date"]}
      customActions={customActions}
      customActionsHeader="Download Invoice"
    />
  );
}

export default InvoicesList;


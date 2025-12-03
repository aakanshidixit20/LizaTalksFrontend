// import React from "react";
// import GenericTable from "../GenericTable/GenericTable";
// import clientStores from "../../../data/client_stores_success.json";
// import { useNavigate } from "react-router-dom";

// const storeColumns = [
//   { id: "client_name", label: "Client Name" },
//   { id: "store_name", label: "Store Name" },
//   { id: "store_type", label: "Store Type" },
//   { id: "chatbot_name", label: "Chatbot Name" },
//   { id: "subscription", label: "Subscription" },
//   {
//   id: "revenue_usd",
//   label: "Revenue",
//   render: (row) => `$ ${Number(row.revenue_usd).toLocaleString()}`
// }

// ];

// function ClientStoresList() {
//   const navigate = useNavigate();

//   const customActions = [
//     {
//       label: "View Details",
//       icon: "visibility",
//       color: "secondary",
//     },
//   ];

//   return (
//     <GenericTable
//       title="Client Stores"
//       columns={storeColumns}
//       rows={clientStores.data}
//       /* no default actions */
//       showView={false}
//       showEdit={false}
//       showDelete={false}
//        dropdownFilters={["client_name","store_name"]}
//       /* header buttons: Apply + Export */
      
//       customActions={customActions}
//       customActionsHeader="View Details"
//     />
//   );
// }

// export default ClientStoresList;



// import React from "react";
// import GenericTable from "../GenericTable/GenericTable";
// import clientStores from "../../../data/client_stores_success.json";

// const storeColumns = [
//   { id: "client_name", label: "Client Name" },
//   { id: "store_name", label: "Store Name" },
//   { id: "store_type", label: "Store Type" },
//   {
//     id: "selected_plan",
//     label: "Selected Plan",
//     render: (row) =>
//       row.plan_name && row.subscription_type
//         ? `${row.plan_name} - ${row.subscription_type}`
//         : "-"
//   },
//   {
//     id: "location_count",
//     label: "Number Of Locations",
//     render: (row) => row.location_count ?? "-"
//   },
//   {
//     id: "latest_invoice_amount",
//     label: "Total Amount",
//     render: (row) =>
//       row.latest_invoice_amount
//         ? `$${Number(row.latest_invoice_amount).toLocaleString()}`
//         : "$0"
//   }
// ];

// function ClientStoresList() {
//   const sanitizedRows = clientStores.data.map(row => ({
//     ...row,
//     latest_invoice_amount: Number(row.latest_invoice_amount) || 0
//   }));

//   const customActions = [
//     {
//       label: "View Details",
//       icon: "visibility",
//       color: "secondary",
//     },
//   ];

//   return (
//     <GenericTable
//       title="Client Stores"
//       columns={storeColumns}
//       rows={sanitizedRows}
//       showView={false}
//       showEdit={false}
//       showDelete={false}
//       dropdownFilters={["plan_name"]}
//       rangeFilters={["latest_invoice_amount"]}
//       customActions={customActions}
//       customActionsHeader="View Details"
//     />
//   );
// }

// export default ClientStoresList;

// ---------------------------------------------------------------------------------------

// import React, { useEffect, useState } from "react";
// import GenericTable from "../GenericTable/GenericTable";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const API_URL = "http://127.0.0.1:8000/api/client-stores/get_client_admin";

// const storeColumns = [
//   { id: "client_name", label: "Client Name" },
//   { id: "store_name", label: "Store Name" },
//   { id: "store_type", label: "Store Type", render: row => row.store_types?.join(", ") || "-"  },
//    {
//     id: "subscription_status",
//     label: "Subscription Plan",
//     render: (row) => row.subscription_status || "-"
//   },
  
//   {
//     id: "selected_plan",
//     label: "Selected Plan",
//     render: (row) =>
//       row.plan_name && row.subscription_type
//         ? `${row.plan_name} - ${row.subscription_type}`
//         : "-"
//   },
//   {
//     id: "number_of_locations",
//     label: "Number Of Locations",
//     render: (row) => row.location_count ?? "-"
//   },
//   {
//     id: "total_amount",
//     label: "Total Amount",
//     render: (row) =>
//       `$${Number(row.total_amount || 0).toLocaleString()}`
//   }
// ];

// function ClientStoresList() {
//   const navigate = useNavigate();

//   const [rows, setRows] = useState([]);
//   const [filteredRows, setFilteredRows] = useState([]);

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // ⭐ Range values for amount (received from GenericTable)
//   const [amountRange, setAmountRange] = useState([0, 50000]);

//   // 🔥 Fetch API
//   useEffect(() => {
//     const fetchClientStores = async () => {
//       try {
//         const res = await axios.get(API_URL);
//         const responseArray = res.data.data || [];

//         const sanitized = responseArray.map((row) => ({
//           ...row,
//           total_amount: Number(row.total_amount) || 0,
//         }));

//         setRows(sanitized);
//         setFilteredRows(sanitized); // initial view
//       } catch (err) {
//         setError("Failed to load client store data");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchClientStores();
//   }, []);

//   // ⭐ Amount Range Filtering Logics (min / max)
//   const applyAmountFilter = (range) => {
//     setAmountRange(range);

//     const [min, max] = range;

//     const updated = rows.filter((row) => {
//       const amount = Number(row.total_amount) || 0;
//       return amount >= min && amount <= max;
//     });

//     setFilteredRows(updated);
//   };

//   const customActions = [
//     {
//       label: "View Details",
//       icon: "visibility",
//       color: "secondary",
//       onClick: (row) => navigate(`/client-stores/${row.client_store_id}`)
//     }
//   ];

//   if (loading) return <p>Loading client stores...</p>;
//   if (error) return <p style={{ color: "red" }}>{error}</p>;

//   // ...other imports & state kept the same...

// return (
//   <GenericTable
//     title="Client Stores"
//     columns={storeColumns}
//     rows={filteredRows}            // or rows if GenericTable filters internally
//     showView={false}
//     showEdit={false}
//     showDelete={false}
//     dropdownFilters={["plan_name"]}

//     // <-- pass array like GenericTable expects
//     rangeFilters={["total_amount"]}

//     customActions={customActions}
//     customActionsHeader="View Details"
//   />
// );

// }

// export default ClientStoresList;
// 888888888888888888888888888888888

// import React, { useEffect, useState } from "react";
// import GenericTable from "../GenericTable/GenericTable";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const API_URL = "http://127.0.0.1:8000/api/client-stores/get_client_admin";

// const storeColumns = [
//   { id: "client_name", label: "Client Name" },
//   { id: "store_name", label: "Store Name" },
//   { id: "store_type", label: "Store Type", render: row => row.store_types?.join(", ") || "-" },
//   {
//     id: "subscription_status",
//     label: "Subscription Plan",
//     render: (row) => row.subscription_status || "-"
//   },
//   {
//     id: "selected_plan",
//     label: "Selected Plan",
//     render: (row) =>
//       row.plan_name && row.subscription_type
//         ? `${row.plan_name} - ${row.subscription_type}`
//         : "-"
//   },
//   {
//     id: "number_of_locations",
//     label: "Number Of Locations",
//     render: (row) => row.location_count ?? "-"
//   },
//   {
//     id: "total_amount",
//     label: "Total Amount",
//     render: (row) =>
//       `$${Number(row.total_amount || 0).toLocaleString()}`
//   }
// ];

// function ClientStoresList() {
//   const navigate = useNavigate();

//   const [rows, setRows] = useState([]);
//   const [filteredRows, setFilteredRows] = useState([]);

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // ⭐ Range values for amount (received from GenericTable)
//   // const [amountRange, setAmountRange] = useState([0, 50000]);

  

//   useEffect(() => {
//     const fetchClientStores = async () => {
//       try {
//         const res = await axios.get(API_URL);
//         const responseArray = res.data.data || [];

//         const sanitized = responseArray.map((row) => ({
//           ...row,
//           total_amount: Number(row.total_amount) || 0,
//         }));

//         setRows(sanitized);
//         setFilteredRows(sanitized);
//       } catch (err) {
//         setError("Failed to load client store data");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchClientStores();
//   }, []);

//   // ⭐ Range filter logic
//   const applyAmountFilter = (range) => {
    

//     const [min, max] = range;

//     const updated = rows.filter((row) => {
//       const amount = Number(row.total_amount) || 0;
//       return amount >= min && amount <= max;
//     });

//     setFilteredRows(updated);
//   };

//   const customActions = [
//     {
//       label: "View Details",
//       icon: "visibility",
//       color: "secondary",
//       onClick: (row) => navigate(`/client-stores/${row.client_store_id}`)
//     }
//   ];

//   if (loading) return <p>Loading client stores...</p>;
//   if (error) return <p style={{ color: "red" }}>{error}</p>;

//   return (
//     <GenericTable
//       title="Client Stores"
//       columns={storeColumns}
//       rows={filteredRows}
//       showView={false}
//       showEdit={false}
//       showDelete={false}
//       dropdownFilters={["plan_name"]}

//       rangeFilters={["total_amount"]}

//       customActions={customActions}
//       customActionsHeader="View Details"

//       // ⭐ REQUIRED — Fixes the warnings
//       onRangeFilter={applyAmountFilter}
//     />
//   );
// }

// export default ClientStoresList;
// ----------------------------------------------------------------------------------
// import React, { useEffect, useState } from "react";
// import GenericTable from "../GenericTable/GenericTable";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const API_URL = "http://127.0.0.1:8000/api/client-stores/get_client_admin";

// const storeColumns = [
//   { id: "client_name", label: "Client Name" },
//   { id: "store_name", label: "Store Name" },
//   {
//     id: "store_type",
//     label: "Store Type",
//     render: (row) => row.store_types?.join(", ") || "-"
//   },
//   // {
//   //   id: "subscription_status",
//   //   label: "Subscription Plan",
//   //   render: (row) => row.subscription_status || "-"
//   // },
//   {
//     id: "plan_name",
//     label: "Selected Plan",
//     render: (row) => row.plan_name || "-"
//   },
//   {
//     id: "number_of_locations",
//     label: "Number Of Locations",
//     render: (row) => row.number_of_locations ?? "-"
//   },
//   {
//     id: "total_amount",
//     label: "Total Amount",
//     render: (row) => `$${Number(row.total_amount || 0).toLocaleString()}`
//   }
// ];

// function ClientStoresList() {
//   const navigate = useNavigate();

//   const [rows, setRows] = useState([]);
//   const [filteredRows, setFilteredRows] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // ⭐ Pagination states
//   const [page, setPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(50);

//   useEffect(() => {
//     const fetchClientStores = async () => {
//       try {
//         const res = await axios.get(API_URL);
//         const responseArray = res.data.data || [];

//         const sanitized = responseArray.map((row) => ({
//           ...row,
//           total_amount: Number(row.total_amount) || 0
//         }));

//         setRows(sanitized);
//         setFilteredRows(sanitized);
//       } catch (err) {
//         setError("Failed to load client store data");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchClientStores();
//   }, []);

//   // ⭐ Range filter logic
//   const applyAmountFilter = (range) => {
//     const [min, max] = range;

//     const updated = rows.filter((row) => {
//       const amount = Number(row.total_amount) || 0;
//       return amount >= min && amount <= max;
//     });

//     setFilteredRows(updated);

//     // Reset to page 1 when filtering
//     setPage(1);
//   };

//   // ⭐ Apply pagination
//   const paginatedRows = filteredRows.slice(
//     (page - 1) * rowsPerPage,
//     page * rowsPerPage
//   );

//   const customActions = [
//     {
//       label: "View Details",
//       icon: "visibility",
//       color: "secondary",

//       onClick: (row) => {
//         console.log("ROW:", row);
//         navigate(( `/client-stores/${row.client_store_id}` ))}
//     }
//   ];
 
//   if (loading) return <p>Loading client stores...</p>;
//   if (error) return <p style={{ color: "red" }}>{error}</p>;

//   return (
//     <GenericTable
//       title="Client Stores"
//       columns={storeColumns}
//       rows={paginatedRows}
//       showView={false}
//       showEdit={false}
//       showDelete={false}
//       dropdownFilters={["plan_name"]}
//       rangeFilters={["total_amount"]}
//       onRangeFilter={applyAmountFilter}
//       customActions={customActions}
//       customActionsHeader="View Details"

//       // ⭐ Pagination props
//       currentPage={page}
//       rowsPerPage={rowsPerPage}
//       totalCount={filteredRows.length}
//       onPageChange={setPage}
//       onRowsPerPageChange={setRowsPerPage}
//     />
//   );
// }

// export default ClientStoresList;


import React, { useEffect, useState } from "react";
import GenericTable from "../GenericTable/GenericTable";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// ⭐ LIST API
const LIST_API = "http://127.0.0.1:8000/api/client-stores/get_client_admin";

const storeColumns = [
  { id: "client_name", label: "Client Name" },
  { id: "store_name", label: "Store Name" },
  {
    id: "store_type",
    label: "Store Type",
    render: (row) => row.store_types?.join(", ") || "-"
  },
  {
    id: "plan_name",
    label: "Selected Plan",
    render: (row) => row.plan_name || "-"
  },
  {
    id: "number_of_locations",
    label: "Number Of Locations",
    render: (row) => row.number_of_locations ?? "-"
  },
  {
    id: "total_amount",
    label: "Total Amount",
    render: (row) => `$${Number(row.total_amount || 0).toLocaleString()}`
  }
];

function ClientStoresList() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(50);

  useEffect(() => {
    const fetchClientStores = async () => {
      try {
        const res = await axios.get(LIST_API);

        const responseArray = res.data.data || [];

        // ⭐ Convert cents → dollars here
        const sanitized = responseArray.map((row) => ({
          ...row,
          store_id: row.client_store_id,
          client_id: row.client_id,
          total_amount: (Number(row.total_amount) || 0) / 100
        }));
        
        setRows(sanitized);
        setFilteredRows(sanitized);
      } catch (err) {
        setError("Failed to load client store data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchClientStores();
  }, []);

  const applyAmountFilter = (range) => {
    const [min, max] = range;

    const updated = rows.filter((row) => {
      const amount = Number(row.total_amount) || 0;
      return amount >= min && amount <= max;
    });

    setFilteredRows(updated);
    setPage(1);
  };

  // Apply pagination
  const paginatedRows = filteredRows.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  // ⭐ The MOST IMPORTANT PART
  const customActions = [
    {
      label: "View Details",
      icon: "visibility",
      color: "secondary",
      onClick: (row) => {
        console.log("ROW:", row);
        navigate(`/store_id/${row.store_id}?client_id=${row.client_id}`);
      }
    }
  ];

  if (loading) return <p>Loading client stores...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <GenericTable
      title="Client Stores"
      columns={storeColumns}
      rows={paginatedRows}
      showView={false}
      showEdit={false}
      showDelete={false}
      dropdownFilters={["plan_name"]}
      rangeFilters={["total_amount"]}
      onRangeFilter={applyAmountFilter}
      customActions={customActions}
      customActionsHeader="View Details"
      currentPage={page}
      rowsPerPage={rowsPerPage}
      totalCount={filteredRows.length}
      onPageChange={setPage}
      onRowsPerPageChange={setRowsPerPage}
    />
  );
}

export default ClientStoresList;









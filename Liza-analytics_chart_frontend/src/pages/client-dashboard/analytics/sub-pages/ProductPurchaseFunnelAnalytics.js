
// import React from "react";
// import { Table, TableHead, TableRow, TableCell, TableBody, Button, TextField } from "@mui/material";
// import { CSVLink } from "react-csv";
// import analyticsData from "../../../components/AdminDashboard/Analytics/Data/AnalyticsData";

// const ProductPurchaseFunnelAnalytics = () => {
//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Product Purchase Funnel - Detailed Insights</h2>

//       {/* Filters */}
//       <div style={{ display: "flex", gap: 10, marginBottom: 15 }}>
//         <TextField label="Search Product" size="small" />
//         <TextField type="date" size="small" InputLabelProps={{ shrink: true }} />
//       </div>

//       {/* Download Button */}
//       <CSVLink 
//         filename="product-purchase-funnel.csv"
//         data={analyticsData.productPurchaseFunnel || []}
//         style={{ textDecoration: "none" }}
//       >
//         <Button variant="outlined" style={{ marginBottom: 15 }}>
//           Download CSV
//         </Button>
//       </CSVLink>

//       {/* Table */}
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell><strong>Stage</strong></TableCell>
//             <TableCell><strong>Conversion %</strong></TableCell>
//             <TableCell><strong>User Count</strong></TableCell>
//           </TableRow>
//         </TableHead>

//         <TableBody>
//           {(analyticsData.productPurchaseFunnel || []).map((item, index) => (
//             <TableRow key={index}>
//               <TableCell>{item.stage}</TableCell>
//               <TableCell>{item.rate}%</TableCell>
//               <TableCell>{item.users}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// };

// export default ProductPurchaseFunnelAnalytics;

// import React, { useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import ReactApexChart from "react-apexcharts";
// import {
//   Box,
//   Button,
//   TextField,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   TablePagination,
//   Chip,
// } from "@mui/material";
// import { CSVLink } from "react-csv";

// const productsData = [
//   { name: "Mystery Box", value: 350, category: "Box" },
//   { name: "High Potency Oil", value: 300, category: "Oil" },
//   { name: "Sample Pack", value: 248, category: "Pack" },
//   { name: "Merch Hoodie", value: 200, category: "Merch" },
//   { name: "Bath Bomb", value: 140, category: "Bath" },
// ];

// const HighClicksLowConversionsDetails = () => {
//   const navigate = useNavigate();
//   const [filter, setFilter] = useState("");
//   const [date, setDate] = useState(""); // Date filter state
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);

//   const filteredData = useMemo(
//     () =>
//       productsData.filter((item) =>
//         item.name.toLowerCase().includes(filter.toLowerCase())
//       ),
//     [filter]
//   );

//   const handleChangePage = (e, newPage) => setPage(newPage);
//   const handleChangeRowsPerPage = (e) => {
//     setRowsPerPage(parseInt(e.target.value, 10));
//     setPage(0);
//   };

//   const chartState = {
//     series: [{ data: filteredData.map((d) => d.value) }],
//     options: {
//       chart: { type: "bar", height: 350 },
//       plotOptions: { bar: { borderRadius: 4, borderRadiusApplication: "end", horizontal: true } },
//       colors: ["#FF0000"],
//       dataLabels: { enabled: false },
//       xaxis: { categories: filteredData.map((d) => d.name) },
//     },
//   };

//   return (
//     <Box p={3}>
//       {/* Back Button */}
//       <Button
//         variant="outlined"
//         onClick={() => navigate("/analytics")}
//         sx={{ mb: 2, borderRadius: 2 }}
//       >
//         ← Back
//       </Button>

//       {/* Chart */}
//       <ReactApexChart
//         options={chartState.options}
//         series={chartState.series}
//         type="bar"
//         height={350}
//       />

//       {/* Search + Date Filter + CSV Export */}
//       <Box display="flex" justifyContent="space-between" alignItems="center" my={2} flexWrap="wrap" gap={2}>
//         {/* Search */}
//         <TextField
//           size="small"
//           label="Search Product"
//           value={filter}
//           onChange={(e) => setFilter(e.target.value)}
//           sx={{ width: 250 }}
//         />

//         {/* Date Filter */}
//         <TextField
//           label="Select Date"
//           type="date"
//           size="small"
//           value={date}
//           onChange={(e) => setDate(e.target.value)}
//           sx={{ width: 200 }}
//           InputLabelProps={{ shrink: true }}
//         />

//         {/* CSV Export */}
//         <Button variant="contained">
//           <CSVLink
//             data={filteredData}
//             filename="high_clicks_low_conversions.csv"
//             style={{ textDecoration: "none", color: "#fff" }}
//           >
//             Export CSV
//           </CSVLink>
//         </Button>
//       </Box>

//       {/* Table */}
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell><strong>Product Name</strong></TableCell>
//             <TableCell><strong>Clicks</strong></TableCell>
//             <TableCell><strong>Category</strong></TableCell>
//           </TableRow>
//         </TableHead>

//         <TableBody>
//           {filteredData
//             .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//             .map((row, index) => (
//               <TableRow key={index}>
//                 <TableCell>{row.name}</TableCell>
//                 <TableCell>{row.value}</TableCell>
//                 <TableCell><Chip label={row.category} /></TableCell>
//               </TableRow>
//             ))}
//         </TableBody>
//       </Table>

//       {/* Pagination */}
//       <TablePagination
//         component="div"
//         count={filteredData.length}
//         page={page}
//         onPageChange={handleChangePage}
//         rowsPerPage={rowsPerPage}
//         rowsPerPageOptions={[5, 10, 25]}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//     </Box>
//   );
// };

// export default HighClicksLowConversionsDetails;


/////////////////////////////////////////////////////////////////////////////////


import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactApexChart from "react-apexcharts";
import {
  Box,
  Button,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Chip,
} from "@mui/material";
import { CSVLink } from "react-csv";

const productsData = [
  { name: "Mystery Box", value: 350, category: "Box" },
  { name: "High Potency Oil", value: 300, category: "Oil" },
  { name: "Sample Pack", value: 248, category: "Pack" },
  { name: "Merch Hoodie", value: 200, category: "Merch" },
  { name: "Bath Bomb", value: 140, category: "Bath" },
];

const HighClicksLowConversionsDetails = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("");
  const [date, setDate] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const filteredData = useMemo(
    () =>
      productsData.filter((item) =>
        item.name.toLowerCase().includes(filter.toLowerCase())
      ),
    [filter]
  );

  const chartState = {
    series: [{ data: filteredData.map((d) => d.value) }],
    options: {
      chart: {
        type: "bar",
        height: 350,
        toolbar: { show: false },
        fontFamily: "Inter, sans-serif",
      },
      plotOptions: {
        bar: {
          horizontal: true,
          borderRadius: 6,
          endingShape: "rounded",
        },
      },
      dataLabels: { enabled: false },

      // ⭐ Trezo Purple Color
      colors: ["#6f42c1"],

      xaxis: {
        categories: filteredData.map((d) => d.name),
        labels: {
          style: {
            colors: "#495057",
            fontSize: "14px",
          },
        },
      },

      yaxis: {
        labels: {
          style: {
            colors: "#495057",
            fontSize: "14px",
          },
        },
      },

      grid: {
        borderColor: "#e9ecef",
        strokeDashArray: 4,
      },

      tooltip: {
        theme: "dark",
      },
    },
  };

  const handleChangePage = (e, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  return (
    <Box p={3}>
      {/* Back Button */}
      <Button
        variant="outlined"
        onClick={() => navigate("/analytics")}
        sx={{ mb: 2, borderRadius: 2 }}
      >
        ← Back
      </Button>

      {/* Chart */}
      <ReactApexChart
        options={chartState.options}
        series={chartState.series}
        type="bar"
        height={350}
      />

      {/* Search + Date + CSV */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        my={2}
        flexWrap="wrap"
        gap={2}
      >
        <TextField
          size="small"
          label="Search Product"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          sx={{ width: 250 }}
        />

        <TextField
          label="Select Date"
          type="date"
          size="small"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          sx={{ width: 200 }}
          InputLabelProps={{ shrink: true }}
        />

        <Button variant="contained" sx={{ borderRadius: "8px" }}>
          <CSVLink
            data={filteredData}
            filename="high_clicks_low_conversions.csv"
            style={{ textDecoration: "none", color: "#fff" }}
          >
            Export CSV
          </CSVLink>
        </Button>
      </Box>

      {/* Table */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Product Name</strong></TableCell>
            <TableCell><strong>Clicks</strong></TableCell>
            <TableCell><strong>Category</strong></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {filteredData
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.value}</TableCell>
                <TableCell>
                  <Chip label={row.category} color="primary" size="small" />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <TablePagination
        component="div"
        count={filteredData.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default HighClicksLowConversionsDetails;

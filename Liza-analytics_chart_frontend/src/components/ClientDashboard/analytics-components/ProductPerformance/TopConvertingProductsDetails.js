// import React, { useState, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import ReactApexChart from "react-apexcharts";
// import {
//   Card,
//   CardContent,
//   Box,
//   Typography,
//   Button,
//   TextField,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Chip,
//   Breadcrumbs,
//   Link,
//   useTheme,
//   TablePagination,
// } from "@mui/material";
// import { CSVLink } from "react-csv";

// const productsData = [
//   { name: "Sleep Gummies", value: 360, category: "Edibles" },
//   { name: "Pain Relief Balm", value: 330, category: "Topicals" },
//   { name: "Calm Tincture", value: 300, category: "Tinctures" },
//   { name: "Focus Capsules", value: 270, category: "Capsules" },
//   { name: "Relax Vape", value: 140, category: "Vapes" },
// ];

// const TopConvertingProductsDetails = () => {
//   const navigate = useNavigate();
//   const theme = useTheme();
//   const [filter, setFilter] = useState("");
//   const [date, setDate] = useState(""); // Added date filter state
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);

//   const filteredData = useMemo(
//     () =>
//       productsData.filter((row) =>
//         row.name.toLowerCase().includes(filter.toLowerCase())
//       ),
//     [filter]
//   );

//   const getCategoryChip = (category) => {
//     const colors = {
//       Edibles: "success",
//       Topicals: "warning",
//       Tinctures: "info",
//       Capsules: "primary",
//       Vapes: "error",
//     };
//     return <Chip label={category} color={colors[category] || "default"} size="small" />;
//   };

//   const chartState = {
//     series: [{ data: filteredData.map((d) => d.value) }],
//     options: {
//       chart: { type: "bar", height: 350 },
//       plotOptions: { bar: { borderRadius: 4, borderRadiusApplication: "end", horizontal: true } },
//       dataLabels: { enabled: false },
//       xaxis: { categories: filteredData.map((d) => d.name) },
//       colors: [theme.palette.primary.main],
//     },
//   };

//   return (
//     <Box p={3}>
//       <Breadcrumbs sx={{ mb: 2, fontSize: "14px" }}>
//         <Link underline="hover" sx={{ cursor: "pointer" }} onClick={() => navigate("/analytics")}>
//           Analytics
//         </Link>
//         <Link underline="hover" sx={{ cursor: "pointer" }} onClick={() => navigate("/analytics/top-products")}>
//           Top Converting Products
//         </Link>
//         <Typography color={theme.palette.text.primary}>Details</Typography>
//       </Breadcrumbs>

//       {/* Back Button */}
//       <Box mb={2}>
//         <Button variant="outlined" onClick={() => navigate("/analytics")} sx={{ borderRadius: 2 }}>
//           ← Back
//         </Button>
//       </Box>

//       {/* Chart */}
//       <Card sx={{ borderRadius: 3, boxShadow: 3, mb: 3 }}>
//         <CardContent>
//           <ReactApexChart options={chartState.options} series={chartState.series} type="bar" height={350} />
//         </CardContent>
//       </Card>

//       {/* Search + Date Filter + Export */}
//       <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} flexWrap="wrap" gap={2}>
//         <TextField
//           label="Search Product"
//           variant="outlined"
//           value={filter}
//           size="small"
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

//         <Button variant="contained" color="primary">
//           <CSVLink data={filteredData} filename={"top_products.csv"} style={{ color: "#fff", textDecoration: "none" }}>
//             Export CSV
//           </CSVLink>
//         </Button>
//       </Box>

//       {/* Table */}
//       <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
//         <CardContent>
//           <Table>
//             <TableHead>
//               <TableRow sx={{ backgroundColor: theme.palette.action.hover }}>
//                 <TableCell><strong>Product Name</strong></TableCell>
//                 <TableCell><strong>Value</strong></TableCell>
//                 <TableCell><strong>Category</strong></TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filteredData
//                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 .map((row, idx) => (
//                   <TableRow key={idx}>
//                     <TableCell>{row.name}</TableCell>
//                     <TableCell>{row.value}</TableCell>
//                     <TableCell>{getCategoryChip(row.category)}</TableCell>
//                   </TableRow>
//                 ))}
//             </TableBody>
//           </Table>

//           <TablePagination
//             component="div"
//             count={filteredData.length}
//             page={page}
//             onPageChange={(e, newPage) => setPage(newPage)}
//             rowsPerPage={rowsPerPage}
//             onRowsPerPageChange={(e) => {
//               setRowsPerPage(parseInt(e.target.value, 10));
//               setPage(0);
//             }}
//             rowsPerPageOptions={[5, 10, 25]}
//           />
//         </CardContent>
//       </Card>
//     </Box>
//   );
// };

// export default TopConvertingProductsDetails;
import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ReactApexChart from "react-apexcharts";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Button,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Breadcrumbs,
  Link,
  TablePagination,
} from "@mui/material";
import { CSVLink } from "react-csv";

const productsData = [
  { name: "Sleep Gummies", value: 360, category: "Edibles" },
  { name: "Pain Relief Balm", value: 330, category: "Topicals" },
  { name: "Calm Tincture", value: 300, category: "Tinctures" },
  { name: "Focus Capsules", value: 270, category: "Capsules" },
  { name: "Relax Vape", value: 140, category: "Vapes" },
];

const TopConvertingProductsDetails = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("");
  const [date, setDate] = useState(""); // Date filter
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const filteredData = useMemo(
    () =>
      productsData.filter((row) =>
        row.name.toLowerCase().includes(filter.toLowerCase())
      ),
    [filter]
  );

  const getCategoryChip = (category) => {
    const colors = {
      Edibles: "success",
      Topicals: "warning",
      Tinctures: "info",
      Capsules: "primary",
      Vapes: "error",
    };
    return <Chip label={category} color={colors[category] || "default"} size="small" />;
  };

  const chartState = {
    series: [{ data: filteredData.map((d) => d.value) }],
    options: {
      chart: { type: "bar", height: 350 },
      plotOptions: { bar: { borderRadius: 4, borderRadiusApplication: "end", horizontal: true } },
      dataLabels: { enabled: false },
      xaxis: { categories: filteredData.map((d) => d.name) },
      colors: ["#6f42c1"], // Trezo purple
    },
  };

  return (
    <Box p={3}>
      {/* <Breadcrumbs sx={{ mb: 2, fontSize: "14px" }}>
        <Link underline="hover" sx={{ cursor: "pointer" }} onClick={() => navigate("/analytics")}>
          Analytics
        </Link>
        <Link underline="hover" sx={{ cursor: "pointer" }} onClick={() => navigate("/analytics/top-products")}>
          Top Converting Products
        </Link>
        <Typography color="textPrimary">Details</Typography>
      </Breadcrumbs> */}

      {/* Back Button */}
      <Box mb={2}>
        <Button variant="outlined" onClick={() => navigate("/analytics")} sx={{ borderRadius: 2 }}>
          ← Back
        </Button>
      </Box>

      {/* Chart */}
      <Card sx={{ borderRadius: 3, boxShadow: 3, mb: 3 }}>
        <CardContent>
          <ReactApexChart options={chartState.options} series={chartState.series} type="bar" height={350} />
        </CardContent>
      </Card>

      {/* Search + Date Filter + Export */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} flexWrap="wrap" gap={2}>
        <TextField
          label="Search Product"
          variant="outlined"
          value={filter}
          size="small"
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

        <Button variant="contained" color="primary">
          <CSVLink data={filteredData} filename={"top_products.csv"} style={{ color: "#fff", textDecoration: "none" }}>
            Export CSV
          </CSVLink>
        </Button>
      </Box>

      {/* Table */}
      <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
        <CardContent>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell><strong>Product Name</strong></TableCell>
                <TableCell><strong>Value</strong></TableCell>
                <TableCell><strong>Category</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.value}</TableCell>
                    <TableCell>{getCategoryChip(row.category)}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>

          <TablePagination
            component="div"
            count={filteredData.length}
            page={page}
            onPageChange={(e, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(0);
            }}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default TopConvertingProductsDetails;

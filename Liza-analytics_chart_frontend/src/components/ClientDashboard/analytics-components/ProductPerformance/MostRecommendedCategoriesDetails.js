// import React, { useState, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import ReactApexChart from "react-apexcharts";
// import {
//   Box,
//   Button,
//   Typography,
//   TextField,
//   Card,
//   CardContent,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   TablePagination,
//   Breadcrumbs,
//   Link,
//   Chip,
//   useTheme,
// } from "@mui/material";
// import { CSVLink } from "react-csv";

// const productsData = [
//   { name: "Edibles", value: 400, category: "Edibles" },
//   { name: "Flower", value: 380, category: "Flower" },
//   { name: "Vapes", value: 348, category: "Vapes" },
//   { name: "Topicals", value: 270, category: "Topicals" },
//   { name: "Tinctures", value: 240, category: "Tinctures" },
// ];

// const MostRecommendedCategoriesDetails = () => {
//   const navigate = useNavigate();
//   const theme = useTheme();
//   const [filter, setFilter] = useState("");
//   const [date, setDate] = useState("");
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
//       Flower: "primary",
//       Vapes: "error",
//       Topicals: "warning",
//       Tinctures: "info",
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
//       {/* Breadcrumbs */}
//       <Breadcrumbs sx={{ mb: 2, fontSize: "14px" }}>
//         <Link underline="hover" sx={{ cursor: "pointer" }} onClick={() => navigate("/analytics")}>Analytics</Link>
//         <Link underline="hover" sx={{ cursor: "pointer" }} onClick={() => navigate("/analytics/most-recommended")}>
//           Most Recommended Categories
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
//         {/* Search */}
//         <TextField
//           label="Search Category"
//           variant="outlined"
//           value={filter}
//           size="small"
//           onChange={(e) => setFilter(e.target.value)}
//           sx={{ width: "250px" }}
//         />

//         {/* Date Filter */}
//         <TextField
//           label="Select Date"
//           type="date"
//           size="small"
//           value={date}
//           onChange={(e) => setDate(e.target.value)}
//           sx={{ width: "200px" }}
//           InputLabelProps={{ shrink: true }}
//         />

//         {/* Export CSV */}
//         <Button variant="contained" color="primary">
//           <CSVLink
//             data={filteredData}
//             filename={"most_recommended_categories.csv"}
//             style={{ color: "#fff", textDecoration: "none" }}
//           >
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
//                 <TableCell><strong>Category</strong></TableCell>
//                 <TableCell><strong>Value</strong></TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filteredData
//                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 .map((row, idx) => (
//                   <TableRow key={idx}>
//                     <TableCell>{row.name}</TableCell>
//                     <TableCell>{row.value}</TableCell>
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

// export default MostRecommendedCategoriesDetails;

//////////////////////////////////////////////////////////////////////////////////

import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ReactApexChart from "react-apexcharts";
import {
  Box,
  Button,
  Typography,
  TextField,
  Card,
  CardContent,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Breadcrumbs,
  Link,
  Chip,
} from "@mui/material";
import { CSVLink } from "react-csv";

const productsData = [
  { name: "Edibles", value: 400, category: "Edibles" },
  { name: "Flower", value: 380, category: "Flower" },
  { name: "Vapes", value: 348, category: "Vapes" },
  { name: "Topicals", value: 270, category: "Topicals" },
  { name: "Tinctures", value: 240, category: "Tinctures" },
];

const MostRecommendedCategoriesDetails = () => {
  const navigate = useNavigate();

  const [filter, setFilter] = useState("");
  const [date, setDate] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const filteredData = useMemo(
    () =>
      productsData.filter((row) =>
        row.name.toLowerCase().includes(filter.toLowerCase())
      ),
    [filter]
  );

  // Trezo Chart Styling Applied Here
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
          borderRadius: 6,
          horizontal: true,
          endingShape: "rounded",
        },
      },

      dataLabels: { enabled: false },

      // ⭐ Trezo primary purple
      colors: ["#6f42c1"],

      grid: {
        borderColor: "#e9ecef",
        strokeDashArray: 4,
      },

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

      tooltip: {
        theme: "dark",
      },
    },
  };

  return (
    <Box p={3}>
      {/* Breadcrumbs */}
      {/* <Breadcrumbs sx={{ mb: 2, fontSize: "14px" }}>
        <Link underline="hover" sx={{ cursor: "pointer" }} onClick={() => navigate("/analytics")}>
          Analytics
        </Link>
        <Link underline="hover" sx={{ cursor: "pointer" }} onClick={() => navigate("/analytics/most-recommended")}>
          Most Recommended Categories
        </Link>
        <Typography color={"text.primary"}>Details</Typography>
      </Breadcrumbs> */}

      {/* Back Button */}
      <Button variant="outlined" onClick={() => navigate("/analytics")} sx={{ mb: 2, borderRadius: 2 }}>
        ← Back
      </Button>

      {/* Chart */}
      <Card sx={{ borderRadius: 3, boxShadow: 3, mb: 3 }}>
        <CardContent>
          <ReactApexChart
            options={chartState.options}
            series={chartState.series}
            type="bar"
            height={350}
          />
        </CardContent>
      </Card>

      {/* Filters */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} flexWrap="wrap" gap={2}>
        <TextField
          label="Search Category"
          size="small"
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

        <Button variant="contained">
          <CSVLink
            data={filteredData}
            filename="most_recommended_categories.csv"
            style={{ textDecoration: "none", color: "#fff" }}
          >
            Export CSV
          </CSVLink>
        </Button>
      </Box>

      {/* Table */}
      <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
        <CardContent>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f8f9fa" }}>
                <TableCell><strong>Category</strong></TableCell>
                <TableCell><strong>Value</strong></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.value}</TableCell>
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

export default MostRecommendedCategoriesDetails;

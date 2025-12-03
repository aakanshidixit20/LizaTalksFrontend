"use client";

import React from "react";
import {
  Card,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

function createData(
  name,
  calories,
  fat,
  carbs,
  protein
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const BasicTable = () => {
  return (
    <>
      <Card
        sx={{
          boxShadow: "none",
          borderRadius: "7px",
          mb: "25px",
          padding: { xs: "18px", sm: "20px", lg: "25px" },
        }}
        className="rmui-card"
      >
        <Typography
          variant="h3"
          sx={{
            fontSize: { xs: "16px", md: "18px" },
            fontWeight: 700,
            mb: "25px",
          }}
          className="text-black"
        >
          Basic Table
        </Typography>

        <TableContainer
          component={Paper}
          sx={{
            boxShadow: "none",
          }}
          className="border"
        >
          <Table
            sx={{
              minWidth: 650,
            }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow
                sx={{
                  th: {
                    fontSize: "15px",
                  },
                }}
              >
                <TableCell className="text-black border-bottom">
                  Dessert (100g serving)
                </TableCell>
                <TableCell className="text-black border-bottom" align="right">
                  Calories
                </TableCell>
                <TableCell className="text-black border-bottom" align="right">
                  Fat&nbsp;(g)
                </TableCell>
                <TableCell className="text-black border-bottom" align="right">
                  Carbs&nbsp;(g)
                </TableCell>
                <TableCell className="text-black border-bottom" align="right">
                  Protein&nbsp;(g)
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{
                    "td, th": {
                      fontSize: "15px",
                    },

                    "&:last-child td, &:last-child th": {
                      border: 0,
                    },
                  }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    className="border-bottom"
                  >
                    {row.name}
                  </TableCell>
                  <TableCell align="right" className="border-bottom">
                    {row.calories}
                  </TableCell>
                  <TableCell align="right" className="border-bottom">
                    {row.fat}
                  </TableCell>
                  <TableCell align="right" className="border-bottom">
                    {row.carbs}
                  </TableCell>
                  <TableCell align="right" className="border-bottom">
                    {row.protein}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </>
  );
};

export default BasicTable;

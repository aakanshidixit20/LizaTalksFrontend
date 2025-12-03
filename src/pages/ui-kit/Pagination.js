import React from "react";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";    
import BasicPagination from "../../components/UiKit/Pagination/BasicPagination";
import PaginationOutlined from "../../components/UiKit/Pagination/PaginationOutlined";
import PaginationRounded from "../../components/UiKit/Pagination/PaginationRounded";
import PaginationSize from "../../components/UiKit/Pagination/PaginationSize";
import PaginationButtons from "../../components/UiKit/Pagination/PaginationButtons";
import CustomIcons from "../../components/UiKit/Pagination/CustomIcons";

const Pagination = () => {
  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb-card">
        <h5>Pagination</h5>

        <ul className="breadcrumb">
          <li>
            <Link to="/dashboard/ecommerce/">
              <i className="material-symbols-outlined">home</i>
              Dashboard
            </Link>
          </li>
          <li>UI Elements</li>
          <li>Pagination</li>
        </ul>
      </div>

      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <BasicPagination />

          <PaginationRounded />

          <PaginationButtons />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <PaginationOutlined />

          <PaginationSize />

          <CustomIcons />
        </Grid> 
      </Grid>
    </>
  );
};

export default Pagination;

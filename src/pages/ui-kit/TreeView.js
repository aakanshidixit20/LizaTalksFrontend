import React from "react";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";     
import BasicSimpleTreeView from "../../components/UiKit/TreeView/BasicSimpleTreeView";
import BasicRichTreeView from "../../components/UiKit/TreeView/BasicRichTreeView";

const TreeView = () => {
  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb-card">
        <h5>Tree View</h5>

        <ul className="breadcrumb">
          <li>
            <Link to="/dashboard/ecommerce/">
              <i className="material-symbols-outlined">home</i>
              Dashboard
            </Link>
          </li>
          <li>UI Elements</li>
          <li>Tree View</li>
        </ul>
      </div>

      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <BasicSimpleTreeView />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <BasicRichTreeView />
        </Grid>
      </Grid>
    </>
  );
};

export default TreeView;

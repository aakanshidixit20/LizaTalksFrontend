import React from "react";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";  
import SimpleDialogDemo from "../../components/UiKit/Dialog/SimpleDialogDemo";
import AlertDialog from "../../components/UiKit/Dialog/AlertDialog";
import AlertDialogSlide from "../../components/UiKit/Dialog/AlertDialogSlide";
import FormDialog from "../../components/UiKit/Dialog/FormDialog";
import CustomizedDialogs from "../../components/UiKit/Dialog/CustomizedDialogs";
import FullScreenDialog from "../../components/UiKit/Dialog/FullScreenDialog";

const Dialog = () => {
  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb-card">
        <h5>Dialog</h5>

        <ul className="breadcrumb">
          <li>
            <Link to="/dashboard/ecommerce/">
              <i className="material-symbols-outlined">home</i>
              Dashboard
            </Link>
          </li>
          <li>UI Elements</li>
          <li>Dialog</li>
        </ul>
      </div>

      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <SimpleDialogDemo />

          <AlertDialogSlide />

          <CustomizedDialogs />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <AlertDialog />

          <FormDialog />

          <FullScreenDialog />
        </Grid>
      </Grid>
    </>
  );
};

export default Dialog;

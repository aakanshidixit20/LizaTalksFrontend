import React from "react";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";  
import BasicTabs from "../../components/UiKit/Tabs/BasicTabs";
import LabTabs from "../../components/UiKit/Tabs/LabTabs";
import TabsWrappedLabel from "../../components/UiKit/Tabs/TabsWrappedLabel";
import ColorTabs from "../../components/UiKit/Tabs/ColorTabs";
import ScrollableTabsButtonAuto from "../../components/UiKit/Tabs/ScrollableTabsButtonAuto";
import VerticalTabs from "../../components/UiKit/Tabs/VerticalTabs";

const Tabs = () => {
  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb-card">
        <h5>Tabs</h5>

        <ul className="breadcrumb">
          <li>
            <Link to="/dashboard/ecommerce/">
              <i className="material-symbols-outlined">home</i>
              Dashboard
            </Link>
          </li>
          <li>UI Elements</li>
          <li>Tabs</li>
        </ul>
      </div>

      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
          <BasicTabs />

          <TabsWrappedLabel />

          <ScrollableTabsButtonAuto />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
          <LabTabs />

          <ColorTabs />

          <VerticalTabs />
        </Grid> 
      </Grid>
    </>
  );
};

export default Tabs;

import React from "react";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material"; 
import BasicAccordion from "../../components/UiKit/Accordion/BasicAccordion";
import AccordionExpandIcon from "../../components/UiKit/Accordion/AccordionExpandIcon"; 
import CustomizedAccordions from "../../components/UiKit/Accordion/CustomizedAccordions";

const Accordion = () => {
  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb-card">
        <h5>Accordion</h5>

        <ul className="breadcrumb">
          <li>
            <Link to="/dashboard/ecommerce/">
              <i className="material-symbols-outlined">home</i>
              Dashboard
            </Link>
          </li>
          <li>UI Elements</li>
          <li>Accordion</li>
        </ul>
      </div>

      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <BasicAccordion /> 
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <AccordionExpandIcon />

          <CustomizedAccordions />
        </Grid> 
      </Grid>
    </>
  );
};

export default Accordion;

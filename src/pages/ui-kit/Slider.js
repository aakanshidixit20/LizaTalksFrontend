import React from "react";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";    
import ContinuousSlider from "../../components/UiKit/Slider/ContinuousSlider";
import SliderSizes from "../../components/UiKit/Slider/SliderSizes";
import DiscreteSlider from "../../components/UiKit/Slider/DiscreteSlider";
import DiscreteSliderSteps from "../../components/UiKit/Slider/DiscreteSliderSteps";
import DiscreteSliderMarks from "../../components/UiKit/Slider/DiscreteSliderMarks";
import DiscreteSliderValues from "../../components/UiKit/Slider/DiscreteSliderValues";
import DiscreteSliderLabel from "../../components/UiKit/Slider/DiscreteSliderLabel";
import RangeSlider from "../../components/UiKit/Slider/RangeSlider";
import MinimumDistanceSlider from "../../components/UiKit/Slider/MinimumDistanceSlider";
import CustomizedSlider from "../../components/UiKit/Slider/CustomizedSlider";
import VerticalSlider from "../../components/UiKit/Slider/VerticalSlider";

const Slider = () => {
  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb-card">
        <h5>Slider</h5>

        <ul className="breadcrumb">
          <li>
            <Link to="/dashboard/ecommerce/">
              <i className="material-symbols-outlined">home</i>
              Dashboard
            </Link>
          </li>
          <li>UI Elements</li>
          <li>Slider</li>
        </ul>
      </div>

      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <ContinuousSlider />

          <DiscreteSlider />

          <DiscreteSliderMarks />

          <DiscreteSliderLabel />

          <MinimumDistanceSlider />
          
          <VerticalSlider />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <SliderSizes />

          <DiscreteSliderSteps />

          <DiscreteSliderValues />

          <RangeSlider />

          <CustomizedSlider />
        </Grid>
      </Grid>
    </>
  );
};

export default Slider;

"use client";

import React, { useState } from "react";
import {
  Card,
  Typography,
  Box,
  SpeedDialIcon,
  SpeedDialAction,
  styled,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Switch,
} from "@mui/material";
import SpeedDial from "@mui/material/SpeedDial";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";

const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
  position: "absolute",
  "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
    top: theme.spacing(2),
    left: theme.spacing(2),
  },
}));

const actions = [
  { icon: <FileCopyIcon />, name: "Copy" },
  { icon: <SaveIcon />, name: "Save" },
  { icon: <PrintIcon />, name: "Print" },
  { icon: <ShareIcon />, name: "Share" },
];

const PlaygroundSpeedDial = () => {
  const [direction, setDirection] = useState("up");
  const [hidden, setHidden] = useState(false);

  const handleDirectionChange = (event) => {
    setDirection(event.target.value);
  };

  const handleHiddenChange = (event) => {
    setHidden(event.target.checked);
  };

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
          Playground Speed Dial
        </Typography>

        <Box sx={{ transform: "translateZ(0px)", flexGrow: 1 }}>
          <FormControlLabel
            control={
              <Switch
                checked={hidden}
                onChange={handleHiddenChange}
                color="primary"
              />
            }
            label="Hidden"
          />
          <FormControl component="fieldset" sx={{ mt: 1, display: "flex" }}>
            <FormLabel component="legend">Direction</FormLabel>
            <RadioGroup
              aria-label="direction"
              name="direction"
              value={direction}
              onChange={handleDirectionChange}
              row
            >
              <FormControlLabel value="up" control={<Radio />} label="Up" />
              <FormControlLabel value="right" control={<Radio />} label="Right" />
              <FormControlLabel value="down" control={<Radio />} label="Down" />
              <FormControlLabel value="left" control={<Radio />} label="Left" />
            </RadioGroup>
          </FormControl>
          <Box sx={{ position: "relative", mt: 3, height: 320 }}>
            <StyledSpeedDial
              ariaLabel="SpeedDial playground example"
              hidden={hidden}
              icon={<SpeedDialIcon sx={{ color: "#fff" }} />}
              direction={direction}
            >
              {actions.map((action) => (
                <SpeedDialAction
                  key={action.name}
                  icon={action.icon}
                  tooltipTitle={action.name}
                />
              ))}
            </StyledSpeedDial>
          </Box>
        </Box>
      </Card>
    </>
  );
};

export default PlaygroundSpeedDial;

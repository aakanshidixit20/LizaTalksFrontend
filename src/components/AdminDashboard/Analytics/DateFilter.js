import React, { useState } from "react";
import {
  Box,
  Button,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
 
export default function DateFilter({ onChange }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openCustom, setOpenCustom] = useState(false);
  const [range, setRange] = useState({
    label: "This month",
    start: "",
    end: "",
  });
 
  const options = ["This week", "This month", "Last 3 months", "Custom"];
 
  const handleSelect = (value) => {
    if (value === "Custom") {
      setOpenCustom(true);
    } else {
      setRange({ label: value });
      onChange && onChange(value);
    }
    setAnchorEl(null);
  };
 
  const applyCustomRange = () => {
    onChange && onChange(range);
    setOpenCustom(false);
  };
 
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        width: "100%",
        marginBottom: "10px",
      }}
    >
      <Button
        variant="outlined"
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{
          width: "fit-content",
          borderRadius: "6px",
          padding: "6px 12px",
          fontSize: "14px",
          borderColor: "#6366F1",
          color: "#111827",
          textTransform: "none",
          whiteSpace: "nowrap",
          minHeight: "32px"
        }}
        endIcon={<CalendarTodayIcon fontSize="small" />}
      >
        {range.label}
      </Button>
 
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        {options.map((opt) => (
          <MenuItem key={opt} onClick={() => handleSelect(opt)}>
            {opt}
          </MenuItem>
        ))}
      </Menu>
 
      <Dialog open={openCustom} onClose={() => setOpenCustom(false)}>
        <DialogTitle>Select Custom Date Range</DialogTitle>
 
        <DialogContent>
          <TextField
            label="Start Date"
            type="date"
            fullWidth
            sx={{ mt: 2 }}
            InputLabelProps={{ shrink: true }}
            onChange={(e) => setRange({ ...range, start: e.target.value })}
          />
          <TextField
            label="End Date"
            type="date"
            fullWidth
            sx={{ mt: 2 }}
            InputLabelProps={{ shrink: true }}
            onChange={(e) => setRange({ ...range, end: e.target.value })}
          />
        </DialogContent>
 
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenCustom(false)}>Cancel</Button>
          <Button
            variant="contained"
            sx={{ background: "#6366F1" }}
            onClick={applyCustomRange}
          >
            Apply Range
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

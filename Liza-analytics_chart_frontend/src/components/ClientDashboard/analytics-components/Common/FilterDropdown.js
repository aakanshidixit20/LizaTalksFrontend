import { MenuItem, Select, Box } from "@mui/material";
import { useState } from "react";

export default function FilterDropdown({ onChange }) {
  const [value, setValue] = useState("month");

  const handleChange = (e) => {
    setValue(e.target.value);
    onChange(e.target.value);
  };

  return (
    <Box sx={{ minWidth: 100 }}>
      <Select
        value={value}
        onChange={handleChange}
        size="small"
        sx={{
          fontSize: "12px",
          borderRadius: "8px",
          "& .MuiSelect-select": {
            padding: "4px 10px", // Smaller height
          },
        }}
      >
        <MenuItem value="week">This Week</MenuItem>
        <MenuItem value="month">This Month</MenuItem>
        <MenuItem value="3months">Last 3 Months</MenuItem>
        <MenuItem value="custom">Custom</MenuItem>
      </Select>
    </Box>
  );
}

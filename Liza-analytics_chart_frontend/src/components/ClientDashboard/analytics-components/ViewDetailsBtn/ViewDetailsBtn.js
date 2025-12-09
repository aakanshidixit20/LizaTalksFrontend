import { Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PRIMARY_PURPLE = "#5a42f2ff";
const PURPLE_HOVER = "#5645c0";

const ViewDetailsBtn = ({
  redirectTo = "/",
  label = "View Details →",
  align = "right",
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(redirectTo);
  };

  return (
    <Box
      display="flex"
      justifyContent={align === "right" ? "flex-end" : "flex-start"}
      width="100%"
    >
      <Button
        variant="contained"
        onClick={handleClick}
        sx={{
          textTransform: "none",
          backgroundColor: PRIMARY_PURPLE,
          fontWeight: 600,
          fontSize: "12px",         
          padding: "2px 10px",      
          minHeight: "26px",         
          borderRadius: "6px",
          transition: "0.2s ease-in-out",
          "&:hover": {
            backgroundColor: PURPLE_HOVER,
          },
        }}
      >
        {label}
      </Button>
    </Box>
  );
};

export default ViewDetailsBtn;

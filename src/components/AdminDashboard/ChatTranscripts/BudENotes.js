import React from 'react';
import { 
  Card, CardContent, Typography, List, ListItem, ListItemIcon, 
  ListItemText, Box, Divider 
} from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import HotelIcon from '@mui/icons-material/Hotel';
import NightlightIcon from '@mui/icons-material/Nightlight';

const BudENotes = ({ moodTrends, usageSummary, productEngagement }) => {
  return (
  <Box
  sx={{
    flex: 1,
    overflowY: "auto",
    pr: 1,
    transition: "margin 0.3s ease",
    scrollbarWidth: "thin",
    scrollbarColor: "rgb(180, 179, 222) transparent",
    "&::-webkit-scrollbar": { width: "4px", height: "0.5px" },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor:"rgb(171, 171, 181)",
      borderRadius: "10px",
    },
    "&::-webkit-scrollbar-track": { backgroundColor: "transparent" },

    // 👇 this part is important
    height: "100%",         // fill available parent height
    maxHeight: "100%",      // keep it constrained
    display: "flex",
    flexDirection: "column",
    gap: 2,
    p: 2,
  }}
>
      <Typography 
        variant="h6" 
        textAlign="center" 
        color="primary" 
        fontWeight="bold" 
        gutterBottom
      >
        Liza Notes
      </Typography>

      {/* Mood Trends */}
      <StyledCard title="Mood Trends">
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Top 3 mood tags:
        </Typography>
        <List dense>
          {moodTrends["Top 3 mood tags"].map((tag, i) => (
            <ListItem key={i} disableGutters>
              <ListItemIcon sx={{ minWidth: 24 }}>
                <FiberManualRecordIcon sx={{ fontSize: 8, color: "primary.main" }} />
              </ListItemIcon>
              <ListItemText 
                primary={tag} 
                primaryTypographyProps={{ variant: "body2", fontWeight: 500 }}
              />
            </ListItem>
          ))}
        </List>
        <Divider sx={{ my: 1 }} />
        <Typography variant="body2">
          Latest mood submitted:{" "}
          <Box component="span" sx={{ verticalAlign: "middle" }}>
            {getMoodIcon(moodTrends["Latest mood submitted"])}
          </Box>{" "}
          <strong>{moodTrends["Latest mood submitted"]}</strong>
        </Typography>
      </StyledCard>

      {/* Usage Summary */}
      <StyledCard title="Usage Summary">
        <List dense>
          {[
            `Total credits used: ${usageSummary["Total credits used"]}`,
            `Number of sessions: ${usageSummary["Number of sessions"]}`,
            `Average credits per session: ${usageSummary["Average credits per session"]}`,
            `Longest session: ${usageSummary["Longest session"]}`
          ].map((item, i) => (
            <ListItem key={i} disableGutters>
              <ListItemIcon sx={{ minWidth: 24 }}>
                <FiberManualRecordIcon sx={{ fontSize: 8, color: "primary.main" }} />
              </ListItemIcon>
              <ListItemText 
                primary={item} 
                primaryTypographyProps={{ variant: "body2" }}
              />
            </ListItem>
          ))}
        </List>
      </StyledCard>

      {/* Product Engagement */}
      <StyledCard title="Product Engagement">
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Top clicked products:
        </Typography>
        <List dense>
          {productEngagement["Top clicked products"].map((product, i) => (
            <ListItem key={i} disableGutters>
              <ListItemIcon sx={{ minWidth: 24 }}>
                <FiberManualRecordIcon sx={{ fontSize: 8, color: "primary.main" }} />
              </ListItemIcon>
              <ListItemText 
                primary={product} 
                primaryTypographyProps={{ variant: "body2", fontWeight: 500 }}
              />
            </ListItem>
          ))}
        </List>
        <Divider sx={{ my: 1 }} />
        <Typography variant="body2">
          Most viewed product type: <strong>{productEngagement["Most viewed product type"]}</strong> 🍬
        </Typography>
        <Typography variant="body2">
          Most common effect searched: <strong>{productEngagement["Most common effect searched"]}</strong>
        </Typography>
        <Typography variant="body2">
          Total product clicks: <strong>{productEngagement["Total product clicks"]}</strong>
        </Typography>
      </StyledCard>
    </Box>
  );
};

// Reusable styled card component
const StyledCard = ({ title, children }) => (
  // <Card 
  //   variant="outlined" 
  //   sx={{ borderRadius: 2, boxShadow: 2, flexShrink: 0  }}
  // >
      <Card sx={{ boxShadow: "none", boxShadow: 0.5, borderRadius: 2,flexShrink: 0, p: 1 }}>
    <CardContent>
      <Typography variant="subtitle1" color="primary" fontWeight="bold" gutterBottom>
        {title}
      </Typography>
      {children}
    </CardContent>
  </Card>
);

// Function to map mood to Material UI icons
const getMoodIcon = (mood) => {
  const moodMap = {
    "Calm": <SentimentSatisfiedAltIcon color="warning" fontSize="small" />,
    "Sleepy": <HotelIcon color="primary" fontSize="small" />,
    "Anxious": <SentimentDissatisfiedIcon sx={{ color: '#ea4335' }} fontSize="small" />,
    "Relaxed": <SentimentVerySatisfiedIcon sx={{ color: '#0f9d58' }} fontSize="small" />,
    "Stressed": <SentimentVeryDissatisfiedIcon sx={{ color: '#ea4335' }} fontSize="small" />,
    "Can't Sleep": <NightlightIcon color="primary" fontSize="small" />
  };
  return moodMap[mood] || <SentimentSatisfiedAltIcon fontSize="small" />;
};

export default BudENotes;

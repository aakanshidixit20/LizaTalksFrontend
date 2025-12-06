"use client";

import React from "react";
import { Card, Box, Typography, List, ListItem, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ProductPerformance = () => {
  const navigate = useNavigate();

  const topProducts = [
    { name: "Calm Kush Oil", clicks: 212, image: "/images/products/product1.jpg" },
    { name: "Sleep Tincture", clicks: 187, image: "/images/products/product2.jpg" },
    { name: "Anxiety Relief", clicks: 156, image: "/images/products/product3.jpg" },
    { name: "Energy Boost", clicks: 134, image: "/images/products/product4.jpg" }
  ];

  const missedOpportunities = [
    { name: "Dreamland 3.5g", requests: 27, since: "Sep 20", status: "OOS" },
    { name: "Relax Capsules", requests: 15, since: "Sep 22", status: "OOS" },
    { name: "Sleep Gummies", requests: 12, since: "Sep 25", status: "OOS" }
  ];

  return (
    <>
      {/* Top Performing Products */}
      <Card sx={{ boxShadow: "none", borderRadius: "7px", p: 3, mb: 3 }}>
        <Typography variant="h6" fontWeight={700} mb={2} className="text-black">
          Top Performing Products
        </Typography>
        <List sx={{ p: 0 }}>
          {topProducts.map((product, index) => (
            <ListItem 
              key={index}
              sx={{ 
                display: "flex", 
                justifyContent: "space-between", 
                alignItems: "center",
                py: 1.5,
                borderBottom: index < topProducts.length - 1 ? "1px solid #ECEEF2" : "none",
                cursor: "pointer",
                "&:hover": { bgcolor: "#F8F9FA" }
              }}
              onClick={() => navigate("/products")}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <img 
                  src={product.image} 
                  alt={product.name}
                  width={40}
                  height={40}
                  style={{ borderRadius: "7px" }}
                />
                <Typography fontWeight={500}>{product.name}</Typography>
              </Box>
              <Chip 
                label={`${product.clicks} clicks`} 
                size="small"
                sx={{ bgcolor: "#605DFF", color: "white" }}
              />
            </ListItem>
          ))}
        </List>
      </Card>

      {/* Missed Opportunities */}
      <Card sx={{ boxShadow: "none", borderRadius: "7px", p: 3 }}>
        <Typography variant="h6" fontWeight={700} mb={2} className="text-black">
          Missed Opportunities
        </Typography>
        <List sx={{ p: 0 }}>
          {missedOpportunities.map((product, index) => (
            <ListItem 
              key={index}
              sx={{ 
                display: "flex", 
                justifyContent: "space-between", 
                alignItems: "center",
                py: 1.5,
                borderBottom: index < missedOpportunities.length - 1 ? "1px solid #ECEEF2" : "none"
              }}
            >
              <Box>
                <Typography fontWeight={500}>{product.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.requests} requests since {product.since}
                </Typography>
              </Box>
              <Chip 
                label={product.status} 
                size="small"
                color="error"
              />
            </ListItem>
          ))}
        </List>
      </Card>
    </>
  );
};

export default ProductPerformance;
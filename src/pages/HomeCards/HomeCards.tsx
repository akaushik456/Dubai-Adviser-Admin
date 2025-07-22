import React from "react";
import { Box, Container } from "@mui/material";
import { People } from "@mui/icons-material";
import AnalyticsCard from "../../components/DashboaradCharts/AnalyticsCard";
import TrafficDashboard from "../../components/DashboaradCharts/AnalyticsWidgets";
import StatCard from "../../components/DashboaradCharts/AnalyticsCard";

const HomeCards = () => {
  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fit, minmax(240px, 1fr))"
        gap={2}
        mb={4}
      >
        <AnalyticsCard
          title="Impressions"
          value="9,903"
          color="#03A9F4"
        />

        <AnalyticsCard
          title="Click Through"
          value="5,200"
          color="#4CAF50"
        />

          <StatCard
          title="Total Users"
          value="9,789"
          change="+0.892"
          changePositive
        />

        <StatCard
          title="Live Visitors"
          value="12,240"
          change="-0.59"
          changePositive={false}
          />

        <StatCard
          title="Bounce Rate"
          value="77.3%"
          change="+0.59"
          changePositive
        />
      </Box>

      <TrafficDashboard />
    </Container>
  );
};

export default HomeCards;

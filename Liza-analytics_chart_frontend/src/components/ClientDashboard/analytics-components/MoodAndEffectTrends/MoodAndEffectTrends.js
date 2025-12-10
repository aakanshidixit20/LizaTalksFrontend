import ReactApexChart from "react-apexcharts";
import { Box, Typography, Card } from "@mui/material";
import ViewDetailsBtn from "../ViewDetailsBtn/ViewDetailsBtn";

const MoodAndEffectTrends = () => {
  const series = [32, 26, 24, 10, 8];

  const options = {
    labels: ["Happy", "Neutral", "Calm", "Sad", "Stressed"],
    colors: ["#6366F1", "#22C55E", "#A78BFA", "#FACC15", "#EF4444"],

    chart: { type: "donut" },

    legend: {
      position: "right",
      labels: { colors: "#444" },
    },
  };

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 3,
        paddingTop: "12px",
        pb: 1,
      }}
    >
      {/* HEADER ROW */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        px={2}
        mb={1}
      >
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{
            color: "#6D5DD2",
            whiteSpace: "nowrap",
          }}
        >
          Mood & Effect Trends
        </Typography>

        {/* ⭐ ONLY ONE BUTTON – NO DUPLICATE NOW ⭐ */}
        <ViewDetailsBtn
          redirectTo="/analytics/mood-trend/details"
          align="right"
        />
      </Box>

      {/* DONUT CHART */}
      <Box px={2}>
        <ReactApexChart
          type="donut"
          height={300}
          options={options}
          series={series}
        />
      </Box>
    </Card>
  );
};

export default MoodAndEffectTrends;

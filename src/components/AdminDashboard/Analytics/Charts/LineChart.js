import ReactApexChart from "react-apexcharts";

const LineChart = ({ labels, data, title }) => {
  const chartData = {
    series: [{ name: title, data }],
    chart: { type: "line" },
    xaxis: { categories: labels },
  };

  return <ReactApexChart options={chartData} series={chartData.series} type="line" height={350} />;
};

export default LineChart;

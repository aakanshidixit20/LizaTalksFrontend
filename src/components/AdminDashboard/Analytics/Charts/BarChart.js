import ReactApexChart from "react-apexcharts";

const BarChart = ({ labels, data, title }) => {
  const chartData = {
    series: [{ name: title, data }],
    chart: { type: "bar" },
    xaxis: { categories: labels },
  };

  return <ReactApexChart options={chartData} series={chartData.series} type="bar" height={350} />;
};

export default BarChart;

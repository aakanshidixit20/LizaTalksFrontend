import ReactApexChart from "react-apexcharts";

const HorizontalBar = ({ labels, data, title }) => {
  const chartData = {
    series: [{ name: title, data }],
    chart: { type: "bar" },
    plotOptions: { bar: { horizontal: true } },
    xaxis: { categories: labels },
  };

  return <ReactApexChart options={chartData} series={chartData.series} type="bar" height={350} />;
};

export default HorizontalBar;

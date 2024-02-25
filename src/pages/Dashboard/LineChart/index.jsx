import { Line } from "react-chartjs-2";
import { PropTypes } from "prop-types";
import {
  Chart,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
  Tooltip,
  Legend,
  Title,
  Filler,
} from "chart.js";
import { Box } from "@mui/material";

Chart.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title,
  Filler
);

const generateArrayOfNumber = () =>
  Array(24)
    .fill()
    .map((_, index) => (index >= 10 ? index + ":00" : "0" + index + ":00"));

const LineChart = ({ data, yAxisName, chartName }) => {
  return (
    <Box width={"1000px"} height={"350px"}>
      <Line
        data={{
          labels: generateArrayOfNumber().slice(
            data?.startingPoint,
            data?.lastPoint + 1
          ),
          datasets: [
            {
              label: "Net-Sales($)",
              data: data?.data,
              fill: {
                target: "origin",
                above: "rgba(0,0,255,0.3)", // Area will be red above the origin
                // below: "rgb(0, 0, 255)", // And blue below the origin
              },
              backgroundColor: "rgba(0,0,255,0.1)",
              borderColor: "rgba(0,0,255,0.7)",
              tension: 0,
              borderWidth: 5,
              pointRadius: 2,
              pointBorderWidth: 0,
            },
          ],
        }}
        options={{
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: yAxisName,
                font: {
                  size: 16,
                  weight: "bold",
                },
              },
            },

            x: {
              title: {
                display: true,
                text: "Time",
                font: {
                  size: 16,
                  weight: "bold",
                  color: "black", //navy
                },
              },
            },
          },

          plugins: {
            tooltip: { enabled: true, position: "nearest" },
            title: {
              display: true,
              text: `${chartName} Line Chart`,
              color: "grey",
              position: "bottom",
              align: "center",
              font: {
                weight: "bold",
                size: 20,
              },
              padding: { top: 5 },
            },
            legend: {
              display: true,
              labels: {
                color: "black",
              },
            },
            filler: {
              drawTime: "beforeDraw",
              propagate: true,
            },
          },
        }}
        height={"1.5"}
        width={"3"}
      />
    </Box>
  );
};

LineChart.propTypes = {
  data: PropTypes.object,
  yAxisName: PropTypes.string,
  chartName: PropTypes.string,
};

export default LineChart;

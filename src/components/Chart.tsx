import { WeatherData } from "@/app/models/weather-model";
import { Line } from "react-chartjs-2";

interface Props {
  weatherData: WeatherData[];
}

export const Chart = ({ weatherData }: Props) => {
  const sortedData = weatherData.sort((a, b) => {
    if (a.date < b.date) {
      return -1;
    }
    if (a.date > b.date) {
      return 1;
    }
    return 0;
  });

  const chartData = {
    labels: sortedData.map((data) => new Date(data.date).toLocaleDateString()),
    datasets: [
      {
        label: "Temperature (°C)",
        data: sortedData.map((data) => data.temperature),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        yAxisID: "y",
      },
      {
        label: "Humidity (%)",
        data: sortedData.map((data) => data.humidity),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        yAxisID: "y1",
      },
      {
        label: "Wind Speed (m/s)",
        data: sortedData.map((data) => data.windSpeed),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        yAxisID: "y2",
      },
      {
        label: "UV Index",
        data: sortedData.map((data) => data.uvIndex),
        borderColor: "rgb(255, 159, 64)",
        backgroundColor: "rgba(255, 159, 64, 0.5)",
        yAxisID: "y3",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: "Weather Data Over Time",
      },
    },
    scales: {
      y: {
        type: "linear" as const,
        display: true,
        position: "left" as const,
        title: {
          display: true,
          text: "Temperature (°C)",
        },
      },
      y1: {
        type: "linear" as const,
        display: true,
        position: "right" as const,
        title: {
          display: true,
          text: "Humidity (%)",
        },
        grid: {
          drawOnChartArea: false,
        },
      },
      y2: {
        type: "linear" as const,
        display: true,
        position: "right" as const,
        title: {
          display: true,
          text: "Wind Speed (m/s)",
        },
        grid: {
          drawOnChartArea: false,
        },
      },
      y3: {
        type: "linear" as const,
        display: true,
        position: "right" as const,
        title: {
          display: true,
          text: "UV Index",
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return (
    <div className="mb-8">
      <Line options={chartOptions} data={chartData} />
    </div>
  );
};

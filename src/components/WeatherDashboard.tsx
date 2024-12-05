"use client";

import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import DateRangePicker from "./DatatRangePicker";

export const mockWeatherData: WeatherData[] = [
  {
    id: 1,
    cityName: "Budapest",
    temperature: 25.5,
    humidity: 60,
    source: "OpenWeatherMap",
    createdAt: "2024-12-04T08:00:00Z",
  },
  {
    id: 2,
    cityName: "Budapest",
    temperature: 26.2,
    humidity: 58,
    source: "WeatherAPI",
    createdAt: "2024-12-04T08:05:00Z",
  },
  {
    id: 3,
    cityName: "London",
    temperature: 15.1,
    humidity: 75,
    source: "OpenWeatherMap",
    createdAt: "2024-12-04T08:10:00Z",
  },
  {
    id: 4,
    cityName: "London",
    temperature: 15.4,
    humidity: 74,
    source: "WeatherAPI",
    createdAt: "2024-12-04T08:15:00Z",
  },
  {
    id: 5,
    cityName: "New York",
    temperature: 10.3,
    humidity: 65,
    source: "OpenWeatherMap",
    createdAt: "2024-12-04T08:20:00Z",
  },
  {
    id: 6,
    cityName: "New York",
    temperature: 10.8,
    humidity: 63,
    source: "WeatherAPI",
    createdAt: "2024-12-04T08:25:00Z",
  },
  {
    id: 7,
    cityName: "Tokyo",
    temperature: 18.9,
    humidity: 70,
    source: "OpenWeatherMap",
    createdAt: "2024-12-04T08:30:00Z",
  },
  {
    id: 8,
    cityName: "Tokyo",
    temperature: 19.1,
    humidity: 68,
    source: "WeatherAPI",
    createdAt: "2024-12-04T08:35:00Z",
  },
  {
    id: 9,
    cityName: "Sydney",
    temperature: 22.3,
    humidity: 55,
    source: "OpenWeatherMap",
    createdAt: "2024-12-04T08:40:00Z",
  },
  {
    id: 10,
    cityName: "Sydney",
    temperature: 22.5,
    humidity: 54,
    source: "WeatherAPI",
    createdAt: "2024-12-04T08:45:00Z",
  },
  {
    id: 11,
    cityName: "Mumbai",
    temperature: 29.7,
    humidity: 82,
    source: "OpenWeatherMap",
    createdAt: "2024-12-04T08:50:00Z",
  },
  {
    id: 12,
    cityName: "Mumbai",
    temperature: 30.1,
    humidity: 80,
    source: "WeatherAPI",
    createdAt: "2024-12-04T08:55:00Z",
  },
  {
    id: 13,
    cityName: "Berlin",
    temperature: 12.0,
    humidity: 68,
    source: "OpenWeatherMap",
    createdAt: "2024-12-04T09:00:00Z",
  },
  {
    id: 14,
    cityName: "Berlin",
    temperature: 12.3,
    humidity: 67,
    source: "WeatherAPI",
    createdAt: "2024-12-04T09:05:00Z",
  },
  {
    id: 15,
    cityName: "Rio de Janeiro",
    temperature: 28.5,
    humidity: 78,
    source: "OpenWeatherMap",
    createdAt: "2024-12-04T09:10:00Z",
  },
  {
    id: 16,
    cityName: "Rio de Janeiro",
    temperature: 28.9,
    humidity: 77,
    source: "WeatherAPI",
    createdAt: "2024-12-04T09:15:00Z",
  },
  {
    id: 17,
    cityName: "Cape Town",
    temperature: 20.2,
    humidity: 56,
    source: "OpenWeatherMap",
    createdAt: "2024-12-04T09:20:00Z",
  },
  {
    id: 18,
    cityName: "Cape Town",
    temperature: 20.4,
    humidity: 55,
    source: "WeatherAPI",
    createdAt: "2024-12-04T09:25:00Z",
  },
  {
    id: 19,
    cityName: "Moscow",
    temperature: -5.1,
    humidity: 78,
    source: "OpenWeatherMap",
    createdAt: "2024-12-04T09:30:00Z",
  },
  {
    id: 20,
    cityName: "Moscow",
    temperature: -4.8,
    humidity: 79,
    source: "WeatherAPI",
    createdAt: "2024-12-04T09:35:00Z",
  },
];

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface WeatherData {
  id: number;
  cityName: string;
  temperature: number;
  humidity: number;
  source: string;
  createdAt: string;
}

export default function WeatherDashboard() {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    fetchWeatherData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate]);

  const fetchWeatherData = async () => {
    const queryParams = new URLSearchParams();
    if (startDate) queryParams.append("startDate", startDate);
    if (endDate) queryParams.append("endDate", endDate);

    const response = await fetch(`/api/weather?${queryParams.toString()}`);
    const data = await response.json();

    setWeatherData(data);
  };

  const chartData = {
    labels: weatherData.map((data) =>
      new Date(data.createdAt).toLocaleDateString()
    ),
    datasets: [
      {
        label: "Temperature (°C)",
        data: weatherData.map((data) => data.temperature),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Humidity (%)",
        data: weatherData.map((data) => data.humidity),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Weather Data Over Time",
      },
    },
  };

  const calculateAverages = () => {
    if (weatherData.length === 0) return { avgTemp: 0, avgHumidity: 0 };

    const sum = weatherData.reduce(
      (acc, data) => {
        acc.temp += data.temperature;
        acc.humidity += data.humidity;
        return acc;
      },
      { temp: 0, humidity: 0 }
    );

    return {
      avgTemp: (sum.temp / weatherData.length).toFixed(2),
      avgHumidity: (sum.humidity / weatherData.length).toFixed(2),
    };
  };

  const { avgTemp, avgHumidity } = calculateAverages();

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-blue-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Average Temperature</h2>
          <p className="text-3xl font-bold text-blue-600">{avgTemp}°C</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Average Humidity</h2>
          <p className="text-3xl font-bold text-green-600">{avgHumidity}%</p>
        </div>
      </div>
      <div className="mb-8">
        <Line options={chartOptions} data={chartData} />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                City
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Temperature
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Humidity
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Source
              </th>
            </tr>
          </thead>
          <tbody>
            {weatherData.map((data) => (
              <tr key={data.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(data.createdAt).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{data.cityName}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {data.temperature}°C
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {data.humidity}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{data.source}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

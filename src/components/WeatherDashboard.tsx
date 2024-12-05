"use client";

import { useState, useEffect } from "react";
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
import { WeatherData } from "@/app/models/weather-model";
import { Table } from "./Table";
import { Averages } from "./Averages";
import { Chart } from "./Chart";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type SortConfig = {
  key: keyof WeatherData;
  direction: "ascending" | "descending";
};

export default function WeatherDashboard() {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "date",
    direction: "descending",
  });

  useEffect(() => {
    console.log(cityFilter);
    fetchWeatherData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate, cityFilter]);

  const fetchWeatherData = async () => {
    const queryParams = new URLSearchParams();
    if (startDate) queryParams.append("startDate", startDate);
    if (endDate) queryParams.append("endDate", endDate);
    if (cityFilter) queryParams.append("city", cityFilter);

    const response = await fetch(`/api/weather?${queryParams.toString()}`);
    const data = await response.json();
    console.log(data);
    setWeatherData(data);
  };

  const sortedData = [...weatherData].sort((a, b) => {
    if ((a[sortConfig.key] ?? 0) < (b[sortConfig.key] ?? 0)) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if ((a[sortConfig.key] ?? 0) > (b[sortConfig.key] ?? 0)) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key: keyof WeatherData) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
      />
      <div className="mb-4">
        <label
          htmlFor="city-filter"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Filter by City
        </label>
        <input
          type="text"
          id="city-filter"
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
          placeholder="Enter city name"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <Averages weatherData={weatherData} />
      <Chart weatherData={weatherData} />
      <Table weatherData={sortedData} requestSort={requestSort} />
    </div>
  );
}

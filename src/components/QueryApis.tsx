"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function QueryAPIs() {
  const [city, setCity] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const openWeatherResponse = await fetch(
        `/api/fetch-weather?source=openweathermap&city=${encodeURIComponent(
          city
        )}&date=${date}`
      );
      const weatherAPIResponse = await fetch(
        `/api/fetch-weather?source=weatherapi&city=${encodeURIComponent(
          city
        )}&date=${date}`
      );
      const visualcrossingAPIResponse = await fetch(
        `/api/fetch-weather?source=visualcrossing&city=${encodeURIComponent(
          city
        )}&date=${date}`
      );

      if (
        !openWeatherResponse.ok ||
        !weatherAPIResponse.ok ||
        !visualcrossingAPIResponse.ok
      ) {
        throw new Error("Failed to fetch weather data");
      }

      const openWeatherData = await openWeatherResponse.json();
      const weatherAPIData = await weatherAPIResponse.json();
      const visualcrossingAPIData = await visualcrossingAPIResponse.json();

      const dataToSave = [weatherAPIData, visualcrossingAPIData];
      if (openWeatherData) {
        dataToSave.push(openWeatherData);
      }

      const saveResponse = await fetch("/api/save-weather", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSave),
      });

      if (!saveResponse.ok) {
        throw new Error("Failed to save weather data");
      }

      setSuccess("Weather data fetched and saved successfully!");
      router.refresh();
    } catch (err) {
      setError("An error occurred while fetching or saving weather data.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            City Name
          </label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
        >
          {loading ? "Fetching..." : "Fetch and Save Weather Data"}
        </button>
      </form>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
    </div>
  );
}

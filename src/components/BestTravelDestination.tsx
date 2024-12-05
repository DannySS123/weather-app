"use client";

import React, { useEffect, useState } from "react";
import { WeatherData } from "@/app/models/weather-model";

interface BestCity {
  cityName: string;
  totalScore: number;
  description: string | null;
}

export const BestTravelDestination = () => {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [bestCity, setBestCity] = useState<BestCity | null>(null);

  useEffect(() => {
    fetchWeatherData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const city = getBestCity();
    setBestCity(city);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weatherData]);

  const fetchWeatherData = async () => {
    const response = await fetch(`/api/weather`);
    const data = await response.json();
    setWeatherData(data);
  };

  const getBestCity = () => {
    if (weatherData.length === 0) {
      return null;
    }

    const scoredCities = weatherData.map((data) => {
      const tempScore =
        data.temperature >= 18 && data.temperature <= 26 ? 10 : 0;
      const humidityScore = data.humidity >= 30 && data.humidity <= 60 ? 10 : 0;
      const uvIndexScore = data.uvIndex && data.uvIndex <= 5 ? 10 : 0;
      const rainScore = data.rainVolume === 0 ? 10 : 0;
      const windScore = data.windSpeed && data.windSpeed <= 10 ? 5 : 0;

      const totalScore =
        tempScore + humidityScore + uvIndexScore + rainScore + windScore;

      return {
        cityName: data.cityName,
        totalScore,
        description: data.description,
      };
    });

    return scoredCities.reduce((best, city) =>
      city.totalScore > best.totalScore ? city : best
    );
  };

  return (
    <div className="p-4 bg-green-100 rounded-lg">
      {bestCity ? (
        <>
          <h3 className="text-2xl font-bold text-green-700 mb-2">
            Best travel destination: {bestCity.cityName}
          </h3>
          <p className="text-lg">Weather: {bestCity.description}</p>
          <p className="text-md text-gray-600">
            Score: {bestCity.totalScore}/45
          </p>
        </>
      ) : (
        <p className="text-md text-gray-600">Not enough data</p>
      )}
    </div>
  );
};

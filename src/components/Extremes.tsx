import { WeatherData } from "@/app/models/weather-model";
import { useEffect, useState } from "react";

interface Props {
  weatherData: WeatherData[];
}

interface Extremes {
  maxTemp: number | null;
  minTemp: number | null;
  maxHumidity: number | null;
  minHumidity: number | null;
  maxWindSpeed: number | null;
  minWindSpeed: number | null;
  maxPressure: number | null;
  minPressure: number | null;
  maxUvIndex: number | null;
  minUvIndex: number | null;
}

export const Extremes = ({ weatherData }: Props) => {
  const [extremesData, setExtremesData] = useState<Extremes>();

  const calculateExtremes = () => {
    if (weatherData.length === 0)
      return {
        maxTemp: null as number | null,
        minTemp: null as number | null,
        maxHumidity: null as number | null,
        minHumidity: null as number | null,
        maxWindSpeed: null as number | null,
        minWindSpeed: null as number | null,
        maxPressure: null as number | null,
        minPressure: null as number | null,
        maxUvIndex: null as number | null,
        minUvIndex: null as number | null,
      };

    const extremes = weatherData.reduce(
      (acc, data) => {
        acc.maxTemp =
          acc.maxTemp === -Infinity
            ? data.temperature
            : Math.max(acc.maxTemp, data.temperature);
        acc.minTemp =
          acc.minTemp === Infinity
            ? data.temperature
            : Math.min(acc.minTemp, data.temperature);

        acc.maxHumidity =
          acc.maxHumidity === -Infinity
            ? data.humidity
            : Math.max(acc.maxHumidity, data.humidity);
        acc.minHumidity =
          acc.minHumidity === Infinity
            ? data.humidity
            : Math.min(acc.minHumidity, data.humidity);

        acc.maxWindSpeed =
          acc.maxWindSpeed === -Infinity
            ? data.windSpeed || -Infinity
            : Math.max(acc.maxWindSpeed, data.windSpeed || -Infinity);
        acc.minWindSpeed =
          acc.minWindSpeed === Infinity
            ? data.windSpeed || Infinity
            : Math.min(acc.minWindSpeed, data.windSpeed || Infinity);

        acc.maxPressure =
          acc.maxPressure === -Infinity
            ? data.pressure || -Infinity
            : Math.max(acc.maxPressure, data.pressure || -Infinity);
        acc.minPressure =
          acc.minPressure === Infinity
            ? data.pressure || Infinity
            : Math.min(acc.minPressure, data.pressure || Infinity);

        acc.maxUvIndex =
          acc.maxUvIndex === -Infinity
            ? data.uvIndex || -Infinity
            : Math.max(acc.maxUvIndex, data.uvIndex || -Infinity);
        acc.minUvIndex =
          acc.minUvIndex === Infinity
            ? data.uvIndex || Infinity
            : Math.min(acc.minUvIndex, data.uvIndex || Infinity);

        return acc;
      },
      {
        maxTemp: -Infinity,
        minTemp: Infinity,
        maxHumidity: -Infinity,
        minHumidity: Infinity,
        maxWindSpeed: -Infinity,
        minWindSpeed: Infinity,
        maxPressure: -Infinity,
        minPressure: Infinity,
        maxUvIndex: -Infinity,
        minUvIndex: Infinity,
      }
    );

    const safeExtremes = {
      maxTemp: extremes.maxTemp === -Infinity ? null : extremes.maxTemp,
      minTemp: extremes.minTemp === Infinity ? null : extremes.minTemp,
      maxHumidity:
        extremes.maxHumidity === -Infinity ? null : extremes.maxHumidity,
      minHumidity:
        extremes.minHumidity === Infinity ? null : extremes.minHumidity,
      maxWindSpeed:
        extremes.maxWindSpeed === -Infinity ? null : extremes.maxWindSpeed,
      minWindSpeed:
        extremes.minWindSpeed === Infinity ? null : extremes.minWindSpeed,
      maxPressure:
        extremes.maxPressure === -Infinity ? null : extremes.maxPressure,
      minPressure:
        extremes.minPressure === Infinity ? null : extremes.minPressure,
      maxUvIndex:
        extremes.maxUvIndex === -Infinity ? null : extremes.maxUvIndex,
      minUvIndex: extremes.minUvIndex === Infinity ? null : extremes.minUvIndex,
    };

    return safeExtremes;
  };

  useEffect(() => {
    const extremes = calculateExtremes();
    setExtremesData(extremes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weatherData]);

  const {
    maxTemp,
    minTemp,
    maxHumidity,
    minHumidity,
    maxWindSpeed,
    minWindSpeed,
    maxPressure,
    minPressure,
    maxUvIndex,
    minUvIndex,
  } = extremesData || {};

  return (
    <>
      <p className="text-2xl font-bold py-1">Extremes</p>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        <div className="bg-red-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-1">Max Temperature</h3>
          <p className="text-2xl font-bold text-red-600 mb-2">{maxTemp}°C</p>
          <h3 className="text-lg font-semibold mb-1">Min Temperature</h3>
          <p className="text-2xl font-bold text-red-600">{minTemp}°C</p>
        </div>

        <div className="bg-blue-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-1">Max Humidity</h3>
          <p className="text-2xl font-bold text-blue-600 mb-2">
            {maxHumidity}%
          </p>
          <h3 className="text-lg font-semibold mb-1">Min Humidity</h3>
          <p className="text-2xl font-bold text-blue-600">{minHumidity}%</p>
        </div>

        <div className="bg-green-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-1">Max Wind Speed</h3>
          <p className="text-2xl font-bold text-green-600 mb-2">
            {maxWindSpeed} m/s
          </p>
          <h3 className="text-lg font-semibold mb-1">Min Wind Speed</h3>
          <p className="text-2xl font-bold text-green-600">
            {minWindSpeed} m/s
          </p>
        </div>

        <div className="bg-purple-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-1">Max Pressure</h3>
          <p className="text-2xl font-bold text-purple-600 mb-2">
            {maxPressure} hPa
          </p>
          <h3 className="text-lg font-semibold mb-1">Min Pressure</h3>
          <p className="text-2xl font-bold text-purple-600">
            {minPressure} hPa
          </p>
        </div>

        <div className="bg-yellow-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-1">Max UV Index</h3>
          <p className="text-2xl font-bold text-yellow-600 mb-2">
            {maxUvIndex}
          </p>
          <h3 className="text-lg font-semibold mb-1">Min UV Index</h3>
          <p className="text-2xl font-bold text-yellow-600">{minUvIndex}</p>
        </div>
      </div>
    </>
  );
};

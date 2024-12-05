import { WeatherData } from "@/app/models/weather-model";

interface Props {
  weatherData: WeatherData[];
}

export const Averages = ({ weatherData }: Props) => {
  const calculateAverages = () => {
    if (weatherData.length === 0)
      return {
        avgTemp: 0,
        avgHumidity: 0,
        avgWindSpeed: 0,
        avgPressure: 0,
        avgUvIndex: 0,
      };

    const sum = weatherData.reduce(
      (acc, data) => {
        acc.tempSum += data.temperature;
        acc.humiditySum += data.humidity;
        acc.windSpeedSum += data.windSpeed || 0;
        acc.pressureSum += data.pressure || 0;
        acc.uvIndexSum += data.uvIndex || 0;
        acc.count++;
        return acc;
      },
      {
        tempSum: 0,
        humiditySum: 0,
        windSpeedSum: 0,
        pressureSum: 0,
        uvIndexSum: 0,
        count: 0,
      }
    );

    return {
      avgTemp: (sum.tempSum / sum.count).toFixed(2),
      avgHumidity: (sum.humiditySum / sum.count).toFixed(2),
      avgWindSpeed: (sum.windSpeedSum / sum.count).toFixed(2),
      avgPressure: (sum.pressureSum / sum.count).toFixed(2),
      avgUvIndex: (sum.uvIndexSum / sum.count).toFixed(2),
    };
  };

  const { avgTemp, avgHumidity, avgWindSpeed, avgPressure, avgUvIndex } =
    calculateAverages();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
      <div className="bg-red-100 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Avg Temperature</h3>
        <p className="text-2xl font-bold text-red-600">{avgTemp}°C</p>
      </div>
      <div className="bg-blue-100 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Avg Humidity</h3>
        <p className="text-2xl font-bold text-blue-600">{avgHumidity}%</p>
      </div>
      <div className="bg-green-100 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Avg Wind Speed</h3>
        <p className="text-2xl font-bold text-green-600">{avgWindSpeed} m/s</p>
      </div>
      <div className="bg-purple-100 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Avg Pressure</h3>
        <p className="text-2xl font-bold text-purple-600">{avgPressure} hPa</p>
      </div>
      <div className="bg-yellow-100 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Avg UV Index</h3>
        <p className="text-2xl font-bold text-yellow-600">{avgUvIndex}</p>
      </div>
    </div>
  );
};

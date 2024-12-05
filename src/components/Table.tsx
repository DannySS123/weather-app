import { WeatherData } from "@/app/models/weather-model";

interface Props {
  weatherData: WeatherData[];
  requestSort: (key: keyof WeatherData) => void;
}

export const Table = ({ weatherData, requestSort }: Props) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th
              className="py-3 px-6 text-left cursor-pointer"
              onClick={() => requestSort("date")}
            >
              Date
            </th>
            <th
              className="py-3 px-6 text-left cursor-pointer"
              onClick={() => requestSort("cityName")}
            >
              City
            </th>
            <th
              className="py-3 px-6 text-left cursor-pointer"
              onClick={() => requestSort("temperature")}
            >
              Temperature (°C)
            </th>
            <th
              className="py-3 px-6 text-left cursor-pointer"
              onClick={() => requestSort("feelsLike")}
            >
              Feels Like (°C)
            </th>
            <th
              className="py-3 px-6 text-left cursor-pointer"
              onClick={() => requestSort("humidity")}
            >
              Humidity (%)
            </th>
            <th
              className="py-3 px-6 text-left cursor-pointer"
              onClick={() => requestSort("pressure")}
            >
              Pressure (hPa)
            </th>
            <th
              className="py-3 px-6 text-left cursor-pointer"
              onClick={() => requestSort("windSpeed")}
            >
              Wind Speed (m/s)
            </th>
            <th
              className="py-3 px-6 text-left cursor-pointer"
              onClick={() => requestSort("windDir")}
            >
              Wind Direction (°)
            </th>
            <th
              className="py-3 px-6 text-left cursor-pointer"
              onClick={() => requestSort("visibility")}
            >
              Visibility (m)
            </th>
            <th
              className="py-3 px-6 text-left cursor-pointer"
              onClick={() => requestSort("cloudiness")}
            >
              Cloudiness (%)
            </th>
            <th
              className="py-3 px-6 text-left cursor-pointer"
              onClick={() => requestSort("rainVolume")}
            >
              Rain Volume (mm)
            </th>
            <th
              className="py-3 px-6 text-left cursor-pointer"
              onClick={() => requestSort("snowVolume")}
            >
              Snow Volume (mm)
            </th>
            <th
              className="py-3 px-6 text-left cursor-pointer"
              onClick={() => requestSort("uvIndex")}
            >
              UV Index
            </th>
            <th
              className="py-3 px-6 text-left cursor-pointer"
              onClick={() => requestSort("sunrise")}
            >
              Sunrise
            </th>
            <th
              className="py-3 px-6 text-left cursor-pointer"
              onClick={() => requestSort("sunset")}
            >
              Sunset
            </th>
            <th
              className="py-3 px-6 text-left cursor-pointer"
              onClick={() => requestSort("description")}
            >
              Description
            </th>
            <th
              className="py-3 px-6 text-left cursor-pointer"
              onClick={() => requestSort("source")}
            >
              Source
            </th>
            <th
              className="py-3 px-6 text-left cursor-pointer"
              onClick={() => requestSort("createdAt")}
            >
              Created At
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {weatherData.map((data) => (
            <tr
              key={data.id}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="py-3 px-6 text-left whitespace-nowrap">
                {new Date(data.date).toLocaleDateString()}
              </td>
              <td className="py-3 px-6 text-left">{data.cityName}</td>
              <td className="py-3 px-6 text-left">
                {data.temperature.toFixed(1)}
              </td>
              <td className="py-3 px-6 text-left">
                {data.feelsLike ? data.feelsLike.toFixed(1) : "N/A"}
              </td>
              <td className="py-3 px-6 text-left">{data.humidity}</td>
              <td className="py-3 px-6 text-left">{data.pressure || "N/A"}</td>
              <td className="py-3 px-6 text-left">
                {data.windSpeed ? data.windSpeed.toFixed(1) : "N/A"}
              </td>
              <td className="py-3 px-6 text-left">{data.windDir || "N/A"}</td>
              <td className="py-3 px-6 text-left">
                {data.visibility || "N/A"}
              </td>
              <td className="py-3 px-6 text-left">
                {data.cloudiness || "N/A"}
              </td>
              <td className="py-3 px-6 text-left">
                {data.rainVolume ? data.rainVolume.toFixed(1) : "N/A"}
              </td>
              <td className="py-3 px-6 text-left">
                {data.snowVolume ? data.snowVolume.toFixed(1) : "N/A"}
              </td>
              <td className="py-3 px-6 text-left">
                {data.uvIndex ? data.uvIndex.toFixed(1) : "N/A"}
              </td>
              <td className="py-3 px-6 text-left">
                {data.sunrise
                  ? new Date(data.sunrise).toLocaleTimeString()
                  : "N/A"}
              </td>
              <td className="py-3 px-6 text-left">
                {data.sunset
                  ? new Date(data.sunset).toLocaleTimeString()
                  : "N/A"}
              </td>
              <td className="py-3 px-6 text-left">
                {data.description || "N/A"}
              </td>
              <td className="py-3 px-6 text-left">{data.source}</td>
              <td className="py-3 px-6 text-left">
                {new Date(data.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

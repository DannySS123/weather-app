import { NextResponse } from 'next/server'
import axios from 'axios'

const OPEN_WEATHER_MAP_API_KEY = process.env.OPEN_WEATHER_MAP_API_KEY
const WEATHER_API_KEY = process.env.WEATHER_API_KEY
const VISUAL_CROSSING_API_KEY = process.env.VISUAL_CROSSING_API_KEY

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const city = searchParams.get('city')
  const source = searchParams.get('source')
  const date = searchParams.get('date') || new Date().toISOString().split('T')[0]

  if (!city || !source) {
    return NextResponse.json({ error: 'City and source are required' }, { status: 400 })
  }

  try {
    let weatherData

    if (source === 'openweathermap') {
        const normalizeDate = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
        const isHistorical = normalizeDate(new Date(date)) < normalizeDate(new Date());
      
      if (isHistorical) {
        return NextResponse.json(null) //free plan doesn't have histrical data :(
      }

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPEN_WEATHER_MAP_API_KEY}&units=metric`
      const response = await axios.get(url)
      const data = response.data

      weatherData = {
        cityName: city,
        temperature: data.main.temp,
        feelsLike: data.main.feels_like,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        windSpeed: data.wind.speed,
        windDir: data.wind.deg,
        visibility: data.visibility,
        cloudiness: data.clouds.all,
        rainVolume: data.rain ? data.rain['1h'] : null,
        snowVolume: data.snow ? data.snow['1h'] : null,
        uvIndex: null,
        sunrise: new Date(data.sys.sunrise * 1000),
        sunset: new Date(data.sys.sunset * 1000),
        description: data.weather[0].description,
        source: 'OpenWeatherMap',
        date: new Date(),
      }
    } else if (source === 'weatherapi') {
      const url = `http://api.weatherapi.com/v1/history.json?key=${WEATHER_API_KEY}&q=${city}&dt=${date}`
      const response = await axios.get(url)
      const data = response.data

      const dayData = data.forecast.forecastday[0].day
      const astroData = data.forecast.forecastday[0].astro

      weatherData = {
        cityName: data.location.name,
        temperature: dayData.avgtemp_c,
        feelsLike: null,
        humidity: dayData.avghumidity,
        pressure: dayData.pressure_mb,
        windSpeed: dayData.maxwind_kph,
        windDir: null, 
        visibility: dayData.avgvis_km * 1000,
        cloudiness: null,
        rainVolume: dayData.totalprecip_mm,
        snowVolume: null,
        uvIndex: dayData.uv,
        sunrise: new Date(`${date} ${astroData.sunrise}`),
        sunset: new Date(`${date} ${astroData.sunset}`),
        description: dayData.condition.text,
        source: 'WeatherAPI',
        date: new Date(date),
      }
    } else if (source === 'visualcrossing') {
      const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${date}?unitGroup=metric&key=${VISUAL_CROSSING_API_KEY}&contentType=json`
      const response = await axios.get(url)
      const data = response.data

      const normalizeDate = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
      const isHistorical = normalizeDate(new Date(date)) < normalizeDate(new Date());
      
      const currentData = isHistorical ? data.days[0] : data.currentConditions
      
      weatherData = {
        cityName: data.address,
        temperature: currentData.temp,
        feelsLike: currentData.feelslike,
        humidity: currentData.humidity,
        pressure: currentData.pressure,
        windSpeed: currentData.windspeed,
        windDir: currentData.winddir,
        visibility: currentData.visibility,
        cloudiness: currentData.cloudcover,
        rainVolume: currentData.precip,
        snowVolume: null,
        uvIndex: currentData.uvindex,
        sunrise: new Date(currentData.sunrise * 1000),
        sunset: new Date(currentData.sunset * 1000),
        description: currentData.conditions,
        source: 'VisualCrossing',
        date: new Date(date),
      }
    } else {
      return NextResponse.json({ error: 'Invalid source' }, { status: 400 })
    }

    return NextResponse.json(weatherData)
  } catch (error) {
    console.error('Error fetching weather data:', error)
    return NextResponse.json({ error: 'Failed to fetch weather data' }, { status: 500 })
  }
}
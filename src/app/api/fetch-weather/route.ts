import { NextResponse } from 'next/server'
import axios from 'axios'

const OPEN_WEATHER_MAP_API_KEY = process.env.OPEN_WEATHER_MAP_API_KEY
const WEATHER_API_KEY = process.env.WEATHER_API_KEY

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const city = searchParams.get('city')
  const source = searchParams.get('source')

  if (!city || !source) {
    return NextResponse.json({ error: 'City and source are required' }, { status: 400 })
  }

  try {
    let weatherData

    if (source === 'openweathermap') {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPEN_WEATHER_MAP_API_KEY}&units=metric`
      const response = await axios.get(url)
      const data = response.data

      weatherData = {
        cityName: data.name,
        temperature: data.main.temp,
        humidity: data.main.humidity,
        source: 'OpenWeatherMap',
      }
    } else if (source === 'weatherapi') {
      const url = `http://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${city}`
      const response = await axios.get(url)
      const data = response.data

      weatherData = {
        cityName: data.location.name,
        temperature: data.current.temp_c,
        humidity: data.current.humidity,
        source: 'WeatherAPI',
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


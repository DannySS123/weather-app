import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const weatherDataArray = await request.json()

    for (const weatherData of weatherDataArray) {
        if (weatherData) {
            await prisma.weather.create({
                data: weatherData
            })
        }
    }

    return NextResponse.json({ message: 'Weather data saved successfully' })
  } catch (error) {
    console.error('Error saving weather data:', error)
    return NextResponse.json({ error: 'Failed to save weather data' }, { status: 500 })
  }
}

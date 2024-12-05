import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const startDate = searchParams.get('startDate')
  const endDate = searchParams.get('endDate')
  const city = searchParams.get('city')

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const whereClause: any = {}

  if (startDate && endDate) {
    whereClause.date = {
      gte: new Date(startDate),
      lte: new Date(endDate),
    }
  }

  if (city) {
    whereClause.cityName = {
      contains: city,
      mode: 'insensitive',
    }
  }

  const weatherData = await prisma.weather.findMany({
    where: whereClause,
    orderBy: {
      createdAt: 'asc',
    },
  })

  return NextResponse.json(weatherData)
}


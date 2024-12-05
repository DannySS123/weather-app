import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const startDate = searchParams.get('startDate')
  const endDate = searchParams.get('endDate')

  const whereClause = startDate && endDate
    ? {
        createdAt: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      }
    : {}

  const weatherData = await prisma.weather.findMany({
    where: whereClause,
    orderBy: {
      createdAt: 'asc',
    },
  })

  return NextResponse.json(weatherData)
}


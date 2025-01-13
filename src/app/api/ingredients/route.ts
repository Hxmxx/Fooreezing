import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

// GET: 모든 식재료 조회
export async function GET() {
  try {
    const ingredients = await prisma.ingredient.findMany({
      orderBy: { expiryDate: 'asc' }
    })
    return NextResponse.json(ingredients)
  } catch (error) {
    return NextResponse.json(
      { error: '식재료 목록을 가져오는데 실패했습니다.' },
      { status: 500 }
    )
  }
}

// POST: 새로운 식재료 추가
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const ingredient = await prisma.ingredient.create({
      data: body
    })
    return NextResponse.json(ingredient)
  } catch (error) {
    return NextResponse.json(
      { error: '식재료 추가에 실패했습니다.' },
      { status: 500 }
    )
  }
} 
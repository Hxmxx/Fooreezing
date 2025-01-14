import { analyzeImage } from '@/lib/vision'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { imageData } = await request.json()
    
    if (!imageData) {
      return NextResponse.json(
        { success: false, error: '이미지 데이터가 없습니다.' },
        { status: 400 }
      )
    }

    console.log('Vision API 호출 시작...')
    const results = await analyzeImage(imageData)
    console.log('Vision API 결과:', results)

    if (!results || results.length === 0) {
      return NextResponse.json(
        { success: false, error: '인식된 객체가 없습니다.' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      results
    })
  } catch (error) {
    console.error('Vision API 에러:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : '이미지 분석에 실패했습니다' 
      },
      { status: 500 }
    )
  }
} 
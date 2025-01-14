import { ImageAnnotatorClient } from '@google-cloud/vision'

if (!process.env.GOOGLE_CLOUD_CLIENT_EMAIL || !process.env.GOOGLE_CLOUD_PRIVATE_KEY || !process.env.GOOGLE_CLOUD_PROJECT_ID) {
  throw new Error('Google Cloud 환경변수가 설정되지 않았습니다.')
}

const client = new ImageAnnotatorClient({
  credentials: {
    client_email: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_CLOUD_PRIVATE_KEY.replace(/\\n/g, '\n'),
  },
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
})

export async function analyzeImage(imageData: string) {
  try {
    console.log('Vision API 클라이언트 설정 확인...')
    
    // Base64 이미지 데이터에서 헤더 제거
    const base64Image = imageData.replace(/^data:image\/\w+;base64,/, '')
    
    console.log('이미지 분석 시작...')
    const [result] = await client.labelDetection({
      image: { content: base64Image }
    })
    
    console.log('분석 결과:', result)
    
    const labels = result.labelAnnotations || []
    return labels.map(label => ({
      name: label.description,
      confidence: label.score
    }))
  } catch (error) {
    console.error('Vision API 분석 에러:', error)
    throw error
  }
} 
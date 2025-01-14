'use client'
import { useEffect, useRef, useState } from 'react'

interface CameraCaptureProps {
  onCapture: (imageData: string, results: any[]) => void
  onClose: () => void
}

export default function CameraCapture({ onCapture, onClose }: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [isStreaming, setIsStreaming] = useState(false)
  const [error, setError] = useState<string>('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  useEffect(() => {
    async function initCamera() {
      try {
        if (!navigator.mediaDevices?.getUserMedia) {
          throw new Error('카메라가 지원되지 않는 브라우저입니다.')
        }

        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' }
        })
        
        streamRef.current = stream

        if (videoRef.current) {
          videoRef.current.srcObject = stream
          // play() 호출 전에 loadedmetadata 이벤트를 기다립니다
          videoRef.current.onloadedmetadata = async () => {
            try {
              await videoRef.current?.play()
              setIsStreaming(true)
            } catch (err) {
              console.error('Video play error:', err)
              setError('비디오 재생 실패')
            }
          }
        }
      } catch (err) {
        console.error('Camera error:', err)
        setError(err instanceof Error ? err.message : '카메라 시작 실패')
      }
    }

    initCamera()

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop())
      }
    }
  }, [])

  const takePhoto = async () => {
    if (!videoRef.current) return

    try {
      setIsAnalyzing(true)
      const canvas = document.createElement('canvas')
      canvas.width = videoRef.current.videoWidth
      canvas.height = videoRef.current.videoHeight
      
      const context = canvas.getContext('2d')
      if (!context) throw new Error('Canvas context 생성 실패')
      
      context.drawImage(videoRef.current, 0, 0)
      const imageData = canvas.toDataURL('image/jpeg')

      // Vision API 호출
      const response = await fetch('/api/vision', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageData })
      })
      
      const data = await response.json()
      if (!data.success) throw new Error(data.error)
      
      onCapture(imageData, data.results)
    } catch (err) {
      console.error('Photo error:', err)
      setError(err instanceof Error ? err.message : '사진 촬영 실패')
    } finally {
      setIsAnalyzing(false)
    }
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
        <div className="text-center p-4">
          <p className="text-white mb-4">{error}</p>
          <button 
            onClick={onClose}
            className="bg-white text-black px-6 py-2 rounded-lg"
          >
            닫기
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-full h-full object-cover"
      />
      
      <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-center gap-4">
        {isStreaming && !isAnalyzing && (
          <>
            <button 
              onClick={takePhoto}
              className="bg-white text-black px-6 py-3 rounded-full"
            >
              촬영
            </button>
            <button 
              onClick={onClose}
              className="bg-red-500 text-white px-6 py-3 rounded-full"
            >
              취소
            </button>
          </>
        )}
      </div>

      {isAnalyzing && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent mx-auto mb-4" />
            <p>식재료 분석 중...</p>
          </div>
        </div>
      )}
    </div>
  )
} 
'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ProductGalleryProps {
  images: string[]
  productName: string
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)

  const handlePrevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleNextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length)
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div
        className="relative bg-muted aspect-square rounded-lg overflow-hidden group cursor-zoom-in"
        onClick={() => setIsZoomed(!isZoomed)}
      >
        <div className="w-full h-full flex items-center justify-center text-6xl">⚡</div>

        {/* Zoom Button */}
        <Button
          variant="outline"
          size="icon"
          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90"
          onClick={(e) => {
            e.stopPropagation()
            setIsZoomed(!isZoomed)
          }}
        >
          <ZoomIn className="w-4 h-4" />
        </Button>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90"
              onClick={(e) => {
                e.stopPropagation()
                handlePrevImage()
              }}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90"
              onClick={(e) => {
                e.stopPropagation()
                handleNextImage()
              }}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-xs">
            {selectedImage + 1}/{images.length}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`flex-shrink-0 w-16 h-16 rounded border-2 transition-all ${
                index === selectedImage
                  ? 'border-primary'
                  : 'border-muted hover:border-primary/50'
              }`}
            >
              <div className="w-full h-full bg-muted flex items-center justify-center text-lg">
                ⚡
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

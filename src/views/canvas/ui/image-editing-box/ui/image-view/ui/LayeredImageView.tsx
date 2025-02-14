import { useEffect } from 'react'

import Image from 'next/image'

import { useLayersStore } from '../lib/useLayersStore'

export const LayeredImageView = () => {
  const baseLayer = useLayersStore((state) => state.baseLayer)
  const skinGlowLayer = useLayersStore((state) => state.skinGlowLayer)
  const colorBrushLayers = useLayersStore((state) => state.colorBrushLayers)
  const hairColorLayer = useLayersStore((state) => state.hairColorLayer)
  const eyeContactsLayer = useLayersStore((state) => state.eyeContactsLayer)

  useEffect(() => {
    console.log('colorBrushLayers:', colorBrushLayers)
  }, [colorBrushLayers])

  return (
    <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
      {/* 기본 이미지 레이어 */}
      {baseLayer && (
        <div className="absolute inset-0">
          <Image
            src={baseLayer}
            alt="Base"
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>
      )}

      {/* 스킨 글로우 레이어 */}
      {skinGlowLayer && (
        <div className="absolute inset-0" style={{ zIndex: 1 }}>
          <Image
            src={skinGlowLayer}
            alt="Skin Glow"
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>
      )}

      {/* 컬러 브러시 레이어들 */}
      {Object.entries(colorBrushLayers).map(([brushId, base64], idx) => (
        <div
          key={brushId}
          className="absolute inset-0"
          style={{ zIndex: idx + 2 }}
        >
          <Image
            src={base64}
            alt={`Brush ${brushId}`}
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>
      ))}

      {/* 헤어 컬러 레이어 */}
      {hairColorLayer && (
        <div className="absolute inset-0" style={{ zIndex: 10 }}>
          <Image
            src={hairColorLayer}
            alt="Hair Color"
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>
      )}

      {/* 아이 컨택트 레이어 */}
      {eyeContactsLayer && (
        <div className="absolute inset-0" style={{ zIndex: 11 }}>
          <Image
            src={eyeContactsLayer}
            alt="Eye Contacts"
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>
      )}
    </div>
  )
}

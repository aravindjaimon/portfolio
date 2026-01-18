import { ImageResponse } from 'next/og'

export const alt = 'Aravind Jaimon - Lead Software Engineer'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0A0A0A 0%, #1a1a2e 50%, #0A0A0A 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 20,
          }}
        >
          <div
            style={{
              fontSize: 120,
              fontWeight: 'bold',
              color: '#fff',
              letterSpacing: '-0.02em',
            }}
          >
            AJ
          </div>
          <div
            style={{
              fontSize: 60,
              fontWeight: 'bold',
              color: '#fff',
              letterSpacing: '0.05em',
            }}
          >
            Aravind Jaimon
          </div>
          <div
            style={{
              fontSize: 32,
              color: 'rgba(255,255,255,0.7)',
              letterSpacing: '0.1em',
            }}
          >
            Lead Software Engineer
          </div>
          <div
            style={{
              fontSize: 24,
              color: 'rgba(255,255,255,0.5)',
              marginTop: 20,
            }}
          >
            Building systems for millions
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}

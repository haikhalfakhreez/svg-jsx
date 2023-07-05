import { ImageResponse } from 'next/server'

export const runtime = 'edge'

export const alt = 'SVG-JSX'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

const interSemiBold = fetch(new URL('../styles/Inter-SemiBold.ttf', import.meta.url)).then((res) =>
  res.arrayBuffer()
)

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        SVG-JSX ✨
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Inter',
          data: await interSemiBold,
          style: 'normal',
          weight: 400,
        },
      ],
    }
  )
}

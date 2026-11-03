import { ImageResponse } from 'next/og';

export const alt = 'Moaaz Albari – Front-end Developer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * Social preview image. English-only on purpose: the built-in font used here
 * has no Arabic glyphs.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 80,
          color: 'white',
          backgroundImage: 'linear-gradient(135deg, #7c3aed, #db2777, #f97316)',
        }}
      >
        <div style={{ fontSize: 96, fontWeight: 800 }}>Moaaz Albari</div>
        <div style={{ fontSize: 48, marginTop: 16 }}>Front-end Developer</div>
        <div style={{ fontSize: 32, marginTop: 40, opacity: 0.9 }}>
          React · Next.js · TypeScript
        </div>
      </div>
    ),
    { ...size },
  );
}
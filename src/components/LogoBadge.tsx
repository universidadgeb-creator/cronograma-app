import type { LogoTipo } from '../types'

export default function LogoBadge({ logo, size = 44 }: { logo: LogoTipo; size?: number }) {
  const isEasyFit = logo === 'EasyFit'
  return (
    <div
      style={{
        width: size * 2.1,
        height: size,
        borderRadius: 8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: isEasyFit ? '#F5A623' : '#FFFFFF',
        border: '2px solid #F5A623',
      }}
    >
      <span
        style={{
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 700,
          fontSize: size * 0.28,
          color: isEasyFit ? '#4A1A6B' : '#4A1A6B',
          letterSpacing: 0.5,
        }}
      >
        {isEasyFit ? 'EasyFit' : 'Vivo 47'}
      </span>
    </div>
  )
}

import { COLORES_DIA, PALETTE } from '../data/constants'
import { footerTextoPara, nombreActividad } from '../lib/businessRules'
import type { CronogramaData } from '../types'
import LogoBadge from './LogoBadge'

export default function Preview({ data }: { data: CronogramaData }) {
  const { colaborador, dias, notaImportante } = data

  return (
    <div
      className="mx-auto shadow-lg"
      style={{ width: 612, background: PALETTE.lightBg, position: 'relative' }}
    >
      {/* Stripe verde vertical izquierdo */}
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 6, background: PALETTE.green }} />

      <div style={{ paddingLeft: 6 }}>
        {/* Header */}
        <div style={{ position: 'relative', background: PALETTE.purpleDark, height: 130 }}>
          <div style={{ height: 6, background: PALETTE.orange }} />
          <div style={{ position: 'absolute', top: 16, right: 16 }}>
            <LogoBadge logo={colaborador.logo} size={36} />
          </div>
          <div className="flex flex-col items-center justify-center" style={{ height: 124, padding: '0 60px' }}>
            <h1
              className="text-center"
              style={{ color: PALETTE.white, fontWeight: 700, fontSize: 20, margin: 0, letterSpacing: 0.5 }}
            >
              CRONOGRAMA DE NUEVO INGRESO
            </h1>
            <p style={{ color: PALETTE.orange, fontSize: 12, marginTop: 8, textAlign: 'center' }}>
              Plan de Inducción — Semana de Integración
            </p>
          </div>
        </div>

        {/* Badge colaborador */}
        <div style={{ padding: '16px 24px 0' }}>
          <div
            style={{
              background: PALETTE.purpleMid,
              border: `2px solid ${PALETTE.orange}`,
              borderRadius: 12,
              padding: '12px 20px',
              textAlign: 'center',
            }}
          >
            <div style={{ color: PALETTE.white, fontWeight: 700, fontSize: 13 }}>
              {colaborador.nombreCompleto || 'Nombre del colaborador'}
            </div>
            <div style={{ color: PALETTE.green, fontSize: 10, marginTop: 4 }}>
              {[colaborador.puesto, colaborador.sucursal, colaborador.turno].filter(Boolean).join(' | ') ||
                'Puesto | Sucursal | Turno'}
            </div>
          </div>
        </div>

        {/* Cards de días */}
        <div style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {dias.length === 0 && (
            <p style={{ color: '#999', fontSize: 12, textAlign: 'center' }}>
              Agrega días de inducción para verlos aquí.
            </p>
          )}
          {dias.map((dia, i) => {
            const color = COLORES_DIA[i % COLORES_DIA.length]
            return (
              <div
                key={dia.id}
                style={{
                  position: 'relative',
                  background: PALETTE.cardBg,
                  border: `1.5px solid ${color.principal}`,
                  borderRadius: 10,
                  paddingLeft: 16,
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: 8,
                    background: color.principal,
                  }}
                />
                <div style={{ padding: '12px 12px 12px 4px' }}>
                  <div className="flex items-center justify-between">
                    <span
                      style={{
                        background: color.principal,
                        color: PALETTE.white,
                        fontSize: 10,
                        fontWeight: 700,
                        borderRadius: 6,
                        padding: '3px 10px',
                      }}
                    >
                      {(dia.diaSemana || 'DÍA').toUpperCase()} {dia.numeroDia}
                    </span>
                    <span style={{ color: color.acento, fontSize: 11, fontWeight: 700 }}>Día {i + 1}</span>
                  </div>

                  <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <Row label="Sucursal" value={dia.sucursal} />
                    <Row
                      label="Horario"
                      value={dia.horaInicio || dia.horaFin ? `${dia.horaInicio} – ${dia.horaFin}` : ''}
                    />
                    <Row label="Actividad" value={nombreActividad(dia)} />
                    {dia.presentacion && <Row label="Presentación" value={dia.presentacion} />}
                    {dia.recibe && <Row label="Recibe" value={dia.recibe} />}
                    {dia.notaEspecial && <Row label="Nota" value={dia.notaEspecial} />}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Nota importante */}
        {notaImportante.activa && notaImportante.texto && (
          <div style={{ padding: '0 24px 16px' }}>
            <div
              style={{
                background: PALETTE.noteBg,
                border: `1.5px solid ${PALETTE.orange}`,
                borderRadius: 10,
                padding: '10px 14px',
              }}
            >
              <span style={{ color: PALETTE.orange, fontWeight: 700, fontSize: 11 }}>NOTA IMPORTANTE: </span>
              <span style={{ color: PALETTE.textGray, fontSize: 11 }}>{notaImportante.texto}</span>
            </div>
          </div>
        )}

        {/* Footer */}
        <div>
          <div
            style={{
              background: PALETTE.purpleDark,
              height: 28,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ color: PALETTE.white, fontSize: 9, textAlign: 'center', padding: '0 12px' }}>
              {footerTextoPara(colaborador.logo)}
            </span>
          </div>
          <div style={{ height: 4, background: PALETTE.green }} />
        </div>
      </div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', gap: 6, fontSize: 12 }}>
      <span style={{ color: PALETTE.purpleDark, fontWeight: 700, minWidth: 74 }}>{label}:</span>
      <span style={{ color: PALETTE.textGray }}>{value || '—'}</span>
    </div>
  )
}

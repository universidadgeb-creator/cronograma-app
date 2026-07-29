import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import { COLORES_DIA, PALETTE } from '../data/constants'
import type { CronogramaData } from '../types'
import { footerTextoPara, nombreActividad } from './businessRules'

const styles = StyleSheet.create({
  page: {
    backgroundColor: PALETTE.lightBg,
    fontFamily: 'Helvetica',
  },
  stripeLeft: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 6,
    backgroundColor: PALETTE.green,
  },
  content: {
    paddingLeft: 6,
  },
  header: {
    backgroundColor: PALETTE.purpleDark,
    height: 130,
  },
  stripeTop: {
    height: 6,
    backgroundColor: PALETTE.orange,
  },
  logoBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 78,
    height: 34,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: PALETTE.orange,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 10,
    color: PALETTE.purpleDark,
  },
  headerTextWrap: {
    height: 124,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 60,
  },
  title: {
    color: PALETTE.white,
    fontFamily: 'Helvetica-Bold',
    fontSize: 20,
    textAlign: 'center',
  },
  subtitle: {
    color: PALETTE.orange,
    fontSize: 12,
    marginTop: 8,
    textAlign: 'center',
  },
  badgeWrap: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  badge: {
    backgroundColor: PALETTE.purpleMid,
    borderWidth: 2,
    borderColor: PALETTE.orange,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  badgeName: {
    color: PALETTE.white,
    fontFamily: 'Helvetica-Bold',
    fontSize: 13,
  },
  badgeSub: {
    color: PALETTE.green,
    fontSize: 10,
    marginTop: 4,
  },
  cardsWrap: {
    paddingHorizontal: 24,
    paddingTop: 16,
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  card: {
    position: 'relative',
    backgroundColor: PALETTE.cardBg,
    borderWidth: 1.5,
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 8,
  },
  cardInner: {
    paddingVertical: 12,
    paddingRight: 12,
    paddingLeft: 16,
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pill: {
    color: PALETTE.white,
    fontFamily: 'Helvetica-Bold',
    fontSize: 10,
    borderRadius: 6,
    paddingVertical: 3,
    paddingHorizontal: 10,
  },
  diaLabel: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 11,
  },
  rowsWrap: {
    marginTop: 8,
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  row: {
    flexDirection: 'row',
    fontSize: 10,
  },
  rowLabel: {
    color: PALETTE.purpleDark,
    fontFamily: 'Helvetica-Bold',
    minWidth: 74,
  },
  rowValue: {
    color: PALETTE.textGray,
  },
  noteWrap: {
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  note: {
    backgroundColor: PALETTE.noteBg,
    borderWidth: 1.5,
    borderColor: PALETTE.orange,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  noteLabel: {
    color: PALETTE.orange,
    fontFamily: 'Helvetica-Bold',
    fontSize: 11,
  },
  noteText: {
    color: PALETTE.textGray,
    fontSize: 11,
    marginTop: 2,
  },
  footer: {
    backgroundColor: PALETTE.purpleDark,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    color: PALETTE.white,
    fontSize: 8,
    textAlign: 'center',
    paddingHorizontal: 12,
  },
  footerStripe: {
    height: 4,
    backgroundColor: PALETTE.green,
  },
})

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}:</Text>
      <Text style={styles.rowValue}>{value || '—'}</Text>
    </View>
  )
}

export default function PdfDocument({ data }: { data: CronogramaData }) {
  const { colaborador, dias, notaImportante } = data
  const isEasyFit = colaborador.logo === 'EasyFit'

  return (
    <Document title="Cronograma de Nuevo Ingreso">
      <Page size="LETTER" style={styles.page}>
        <View style={styles.stripeLeft} fixed />

        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.stripeTop} />
            <View
              style={[
                styles.logoBadge,
                { backgroundColor: isEasyFit ? PALETTE.orange : PALETTE.white },
              ]}
            >
              <Text style={styles.logoText}>{isEasyFit ? 'EasyFit' : 'Vivo 47'}</Text>
            </View>
            <View style={styles.headerTextWrap}>
              <Text style={styles.title}>CRONOGRAMA DE NUEVO INGRESO</Text>
              <Text style={styles.subtitle}>Plan de Inducción — Semana de Integración</Text>
            </View>
          </View>

          <View style={styles.badgeWrap}>
            <View style={styles.badge}>
              <Text style={styles.badgeName}>{colaborador.nombreCompleto || 'Nombre del colaborador'}</Text>
              <Text style={styles.badgeSub}>
                {[colaborador.puesto, colaborador.sucursal, colaborador.turno].filter(Boolean).join(' | ') ||
                  'Puesto | Sucursal | Turno'}
              </Text>
            </View>
          </View>

          <View style={styles.cardsWrap}>
            {dias.map((dia, i) => {
              const color = COLORES_DIA[i % COLORES_DIA.length]
              return (
                <View key={dia.id} style={[styles.card, { borderColor: color.principal }]} wrap={false}>
                  <View style={[styles.cardBar, { backgroundColor: color.principal }]} />
                  <View style={styles.cardInner}>
                    <View style={styles.cardTopRow}>
                      <Text style={[styles.pill, { backgroundColor: color.principal }]}>
                        {(dia.diaSemana || 'DÍA').toUpperCase()} {dia.numeroDia}
                      </Text>
                      <Text style={[styles.diaLabel, { color: color.acento }]}>Día {i + 1}</Text>
                    </View>
                    <View style={styles.rowsWrap}>
                      <Row label="Sucursal" value={dia.sucursal} />
                      <Row
                        label="Horario"
                        value={dia.horaInicio || dia.horaFin ? `${dia.horaInicio} - ${dia.horaFin}` : ''}
                      />
                      <Row label="Actividad" value={nombreActividad(dia)} />
                      {dia.presentacion ? <Row label="Presentación" value={dia.presentacion} /> : null}
                      {dia.recibe ? <Row label="Recibe" value={dia.recibe} /> : null}
                      {dia.notaEspecial ? <Row label="Nota" value={dia.notaEspecial} /> : null}
                    </View>
                  </View>
                </View>
              )
            })}
          </View>

          {notaImportante.activa && notaImportante.texto ? (
            <View style={styles.noteWrap}>
              <View style={styles.note}>
                <Text style={styles.noteLabel}>NOTA IMPORTANTE:</Text>
                <Text style={styles.noteText}>{notaImportante.texto}</Text>
              </View>
            </View>
          ) : null}
        </View>

        <View fixed style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}>
          <View style={{ paddingLeft: 6 }}>
            <View style={styles.footer}>
              <Text style={styles.footerText}>{footerTextoPara(colaborador.logo)}</Text>
            </View>
            <View style={styles.footerStripe} />
          </View>
        </View>
      </Page>
    </Document>
  )
}

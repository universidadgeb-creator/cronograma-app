import { Suspense, lazy, useMemo } from 'react'
import type { CronogramaData } from '../types'

const PDFDownloadLink = lazy(() =>
  import('@react-pdf/renderer').then((m) => ({ default: m.PDFDownloadLink })),
)
const PdfDocument = lazy(() => import('../lib/PdfDocument'))

export default function DownloadButton({ data }: { data: CronogramaData }) {
  const fileName = useMemo(() => {
    const nombre = data.colaborador.nombreCompleto.trim().replace(/\s+/g, '_') || 'colaborador'
    return `Cronograma_${nombre}.pdf`
  }, [data.colaborador.nombreCompleto])

  return (
    <Suspense
      fallback={
        <button type="button" disabled className="rounded-lg bg-gray-300 text-gray-500 font-bold py-3">
          Cargando generador de PDF...
        </button>
      }
    >
      <PDFDownloadLink
        document={<PdfDocument data={data} />}
        fileName={fileName}
        className="text-center rounded-lg bg-[#F5A623] text-[#4A1A6B] font-bold py-3 hover:brightness-95 transition"
      >
        {({ loading }: { loading: boolean }) => (loading ? 'Generando PDF...' : 'Descargar PDF')}
      </PDFDownloadLink>
    </Suspense>
  )
}

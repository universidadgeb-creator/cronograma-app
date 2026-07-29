import { useState } from 'react'
import ColaboradorForm from './components/ColaboradorForm'
import DiasSection from './components/DiasSection'
import DownloadButton from './components/DownloadButton'
import NotaImportanteForm from './components/NotaImportanteForm'
import Preview from './components/Preview'
import type { CronogramaData } from './types'

const INITIAL: CronogramaData = {
  colaborador: {
    nombreCompleto: '',
    puesto: '',
    sucursal: '' as CronogramaData['colaborador']['sucursal'],
    turno: '' as CronogramaData['colaborador']['turno'],
    logo: 'Vivo47',
  },
  dias: [],
  notaImportante: { activa: false, texto: '' },
}

function App() {
  const [data, setData] = useState<CronogramaData>(INITIAL)

  const puedeDescargar = data.dias.length >= 1 && data.colaborador.nombreCompleto.trim() !== ''

  return (
    <div className="min-h-screen bg-[#eef0f4]">
      <header style={{ background: '#4A1A6B' }} className="text-white px-6 py-4">
        <h1 className="text-xl font-bold">Generador de Cronogramas de Nuevo Ingreso</h1>
        <p className="text-sm text-[#F5A623]">Grupo Empresarial Bienestar · Vivo 47 / EasyFit</p>
      </header>

      <main className="max-w-[1400px] mx-auto p-6 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_640px] gap-6">
        <div className="flex flex-col gap-5">
          <ColaboradorForm
            colaborador={data.colaborador}
            onChange={(colaborador) => setData((d) => ({ ...d, colaborador }))}
          />
          <DiasSection dias={data.dias} onChange={(dias) => setData((d) => ({ ...d, dias }))} />
          <NotaImportanteForm
            nota={data.notaImportante}
            onChange={(notaImportante) => setData((d) => ({ ...d, notaImportante }))}
          />
        </div>

        <div className="flex flex-col gap-4 lg:sticky lg:top-6 lg:self-start">
          <div className="overflow-auto max-h-[80vh] rounded-lg border border-gray-200 bg-[#F5EFF9] p-4">
            <Preview data={data} />
          </div>

          {!puedeDescargar && (
            <p className="text-sm text-red-500 text-center">
              Agrega el nombre del colaborador y al menos 1 día de inducción para poder descargar.
            </p>
          )}

          {puedeDescargar ? (
            <DownloadButton data={data} />
          ) : (
            <button
              type="button"
              disabled
              className="rounded-lg bg-gray-300 text-gray-500 font-bold py-3 cursor-not-allowed"
            >
              Descargar PDF
            </button>
          )}
        </div>
      </main>
    </div>
  )
}

export default App

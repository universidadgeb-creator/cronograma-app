import type { NotaImportante } from '../types'

export default function NotaImportanteForm({
  nota,
  onChange,
}: {
  nota: NotaImportante
  onChange: (n: NotaImportante) => void
}) {
  return (
    <section className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-[#4A1A6B]">Nota importante</h2>
        <label className="flex items-center gap-2 text-sm text-[#333333] cursor-pointer">
          <input
            type="checkbox"
            checked={nota.activa}
            onChange={(e) => onChange({ ...nota, activa: e.target.checked })}
          />
          Activar
        </label>
      </div>
      {nota.activa && (
        <textarea
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#8B44B8] focus:border-transparent"
          rows={3}
          value={nota.texto}
          onChange={(e) => onChange({ ...nota, texto: e.target.value })}
          placeholder="Ej. Presentarse con documentos originales para cotejo."
        />
      )}
    </section>
  )
}

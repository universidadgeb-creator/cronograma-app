import {
  DndContext,
  type DragEndEvent,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { MAX_DIAS, SUCURSALES, nuevoDia } from '../data/constants'
import { horarioSugeridoParaActividad, sucursalSugeridaParaDia } from '../lib/businessRules'
import type { DiaInduccion } from '../types'
import DiaCard from './DiaCard'

export default function DiasSection({
  dias,
  onChange,
}: {
  dias: DiaInduccion[]
  onChange: (dias: DiaInduccion[]) => void
}) {
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))

  function addDia() {
    if (dias.length >= MAX_DIAS) return
    const dia = nuevoDia()
    const sucursalSugerida = sucursalSugeridaParaDia(dia.actividad, dias)
    if (sucursalSugerida) dia.sucursal = sucursalSugerida
    const horario = horarioSugeridoParaActividad(dia.actividad)
    if (horario) {
      dia.horaInicio = horario.inicio
      dia.horaFin = horario.fin
    }
    onChange([...dias, dia])
  }

  function updateDia(id: string, patch: Partial<DiaInduccion>) {
    onChange(dias.map((d) => (d.id === id ? { ...d, ...patch } : d)))
  }

  function removeDia(id: string) {
    onChange(dias.filter((d) => d.id !== id))
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const oldIndex = dias.findIndex((d) => d.id === active.id)
    const newIndex = dias.findIndex((d) => d.id === over.id)
    onChange(arrayMove(dias, oldIndex, newIndex))
  }

  return (
    <section className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col gap-4">
      <datalist id="sucursales-list">
        {SUCURSALES.map((s) => (
          <option key={s} value={s} />
        ))}
      </datalist>

      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-[#4A1A6B]">Días de inducción</h2>
        <span className="text-xs text-gray-500">{dias.length} / {MAX_DIAS}</span>
      </div>

      {dias.length === 0 && (
        <p className="text-sm text-gray-500">Agrega al menos un día de inducción.</p>
      )}

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={dias.map((d) => d.id)} strategy={verticalListSortingStrategy}>
          <div className="flex flex-col gap-3">
            {dias.map((dia, index) => (
              <DiaCard
                key={dia.id}
                dia={dia}
                index={index}
                diasPrevios={dias.slice(0, index)}
                onUpdate={updateDia}
                onRemove={removeDia}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <button
        type="button"
        onClick={addDia}
        disabled={dias.length >= MAX_DIAS}
        className="self-start rounded-md bg-[#6B2E9A] px-4 py-2 text-sm font-bold text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#4A1A6B] transition-colors"
      >
        + Agregar día
      </button>
    </section>
  )
}

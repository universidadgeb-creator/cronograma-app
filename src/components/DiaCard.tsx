import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { ACTIVIDADES, DIAS_SEMANA, PRESENTACIONES } from '../data/constants'
import {
  horarioSugeridoParaActividad,
  requiereRecibeYPresentacion,
  sucursalSugeridaParaDia,
} from '../lib/businessRules'
import type { Actividad, DiaInduccion } from '../types'
import { FormField, inputClass } from './FormField'

export default function DiaCard({
  dia,
  index,
  diasPrevios,
  onUpdate,
  onRemove,
}: {
  dia: DiaInduccion
  index: number
  diasPrevios: DiaInduccion[]
  onUpdate: (id: string, patch: Partial<DiaInduccion>) => void
  onRemove: (id: string) => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: dia.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  function update(patch: Partial<DiaInduccion>) {
    onUpdate(dia.id, patch)
  }

  function handleActividadChange(actividad: Actividad) {
    const patch: Partial<DiaInduccion> = { actividad }
    const sucursalSugerida = sucursalSugeridaParaDia(actividad, diasPrevios)
    if (sucursalSugerida && !dia.sucursal) patch.sucursal = sucursalSugerida
    const horario = horarioSugeridoParaActividad(actividad)
    if (horario && !dia.horaInicio && !dia.horaFin) {
      patch.horaInicio = horario.inicio
      patch.horaFin = horario.fin
    }
    update(patch)
  }

  const esInicioFormal = requiereRecibeYPresentacion(dia.actividad)

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col gap-3"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Arrastrar para reordenar"
            className="cursor-grab text-gray-400 hover:text-gray-600 px-1"
            {...attributes}
            {...listeners}
          >
            ⠿
          </button>
          <span className="text-sm font-bold text-[#4A1A6B]">Día {index + 1}</span>
        </div>
        <button
          type="button"
          onClick={() => onRemove(dia.id)}
          className="text-xs text-red-500 hover:text-red-700"
        >
          Eliminar
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <FormField label="Día de la semana" required>
          <select
            className={inputClass}
            value={dia.diaSemana}
            onChange={(e) => update({ diaSemana: e.target.value })}
          >
            {DIAS_SEMANA.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </FormField>
        <FormField label="Número de día" required>
          <input
            type="number"
            className={inputClass}
            value={dia.numeroDia}
            onChange={(e) => update({ numeroDia: e.target.value })}
            placeholder="Ej. 6"
          />
        </FormField>
      </div>

      <FormField label="Sucursal" required>
        <input
          className={inputClass}
          list="sucursales-list"
          value={dia.sucursal}
          onChange={(e) => update({ sucursal: e.target.value })}
          placeholder="Ej. Naciones Unidas"
        />
      </FormField>

      <div className="grid grid-cols-2 gap-3">
        <FormField label="Horario inicio" required>
          <input
            type="time"
            className={inputClass}
            value={dia.horaInicio}
            onChange={(e) => update({ horaInicio: e.target.value })}
          />
        </FormField>
        <FormField label="Horario fin" required>
          <input
            type="time"
            className={inputClass}
            value={dia.horaFin}
            onChange={(e) => update({ horaFin: e.target.value })}
          />
        </FormField>
      </div>

      <FormField label="Actividad" required>
        <select
          className={inputClass}
          value={dia.actividad}
          onChange={(e) => handleActividadChange(e.target.value as Actividad)}
        >
          {ACTIVIDADES.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
      </FormField>

      {dia.actividad === 'Personalizado' && (
        <FormField label="Nombre de la actividad" required>
          <input
            className={inputClass}
            value={dia.actividadPersonalizada}
            onChange={(e) => update({ actividadPersonalizada: e.target.value })}
            placeholder="Ej. Recorrido por instalaciones"
          />
        </FormField>
      )}

      <div
        className={
          esInicioFormal ? 'grid grid-cols-2 gap-3 rounded-md bg-[#FFF8EC] p-2 -m-1' : 'grid grid-cols-2 gap-3'
        }
      >
        <FormField label={`Presentación${esInicioFormal ? ' (recomendado)' : ''}`}>
          <select
            className={inputClass}
            value={dia.presentacion}
            onChange={(e) => update({ presentacion: e.target.value as DiaInduccion['presentacion'] })}
          >
            <option value="">—</option>
            {PRESENTACIONES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </FormField>
        <FormField label={`Recibe (líder)${esInicioFormal ? ' (recomendado)' : ''}`}>
          <input
            className={inputClass}
            value={dia.recibe}
            onChange={(e) => update({ recibe: e.target.value })}
            placeholder="Nombre de quien recibe"
          />
        </FormField>
      </div>

      <FormField label="Nota especial">
        <input
          className={inputClass}
          value={dia.notaEspecial}
          onChange={(e) => update({ notaEspecial: e.target.value })}
          placeholder="Ej. Llegar a las 2:30 para firma de contrato"
        />
      </FormField>
    </div>
  )
}

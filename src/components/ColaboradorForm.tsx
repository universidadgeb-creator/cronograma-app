import { SUCURSALES, TURNOS } from '../data/constants'
import { logoParaSucursal } from '../lib/businessRules'
import type { Colaborador } from '../types'
import { FormField, inputClass } from './FormField'
import LogoBadge from './LogoBadge'

export default function ColaboradorForm({
  colaborador,
  onChange,
}: {
  colaborador: Colaborador
  onChange: (c: Colaborador) => void
}) {
  function update<K extends keyof Colaborador>(key: K, value: Colaborador[K]) {
    const next = { ...colaborador, [key]: value }
    if (key === 'sucursal') {
      next.logo = logoParaSucursal(value as string)
    }
    onChange(next)
  }

  return (
    <section className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col gap-4">
      <h2 className="text-lg font-bold text-[#4A1A6B]">Datos del colaborador</h2>

      <FormField label="Nombre completo" required>
        <input
          className={inputClass}
          value={colaborador.nombreCompleto}
          onChange={(e) => update('nombreCompleto', e.target.value)}
          placeholder="Ej. Juan Pérez García"
        />
      </FormField>

      <FormField label="Puesto" required>
        <input
          className={inputClass}
          value={colaborador.puesto}
          onChange={(e) => update('puesto', e.target.value)}
          placeholder="Ej. Instructor de piso"
        />
      </FormField>

      <div className="grid grid-cols-2 gap-3">
        <FormField label="Sucursal" required>
          <select
            className={inputClass}
            value={colaborador.sucursal}
            onChange={(e) => update('sucursal', e.target.value as Colaborador['sucursal'])}
          >
            <option value="" disabled>
              Selecciona...
            </option>
            {SUCURSALES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label="Turno" required>
          <select
            className={inputClass}
            value={colaborador.turno}
            onChange={(e) => update('turno', e.target.value as Colaborador['turno'])}
          >
            <option value="" disabled>
              Selecciona...
            </option>
            {TURNOS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </FormField>
      </div>

      <FormField label="Logo">
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm text-[#333333]">
            <input
              type="radio"
              name="logo"
              checked={colaborador.logo === 'Vivo47'}
              onChange={() => update('logo', 'Vivo47')}
            />
            Vivo 47
          </label>
          <label className="flex items-center gap-2 text-sm text-[#333333]">
            <input
              type="radio"
              name="logo"
              checked={colaborador.logo === 'EasyFit'}
              onChange={() => update('logo', 'EasyFit')}
            />
            EasyFit
          </label>
          <LogoBadge logo={colaborador.logo} size={28} />
        </div>
        <span className="text-[11px] text-gray-500">
          Se auto-selecciona según la sucursal, pero puedes cambiarlo.
        </span>
      </FormField>
    </section>
  )
}

import { EASYFIT_SUCURSALES } from '../data/constants'
import type { Actividad, DiaInduccion, LogoTipo, Sucursal } from '../types'

/** Regla: EasyFit -> logo EasyFit, cualquier otra sucursal -> logo Vivo 47. */
export function logoParaSucursal(sucursal: Sucursal | string): LogoTipo {
  return EASYFIT_SUCURSALES.includes(sucursal as Sucursal) ? 'EasyFit' : 'Vivo47'
}

/** Regla: footer distinto según marca. */
export function footerTextoPara(logo: LogoTipo): string {
  return logo === 'EasyFit'
    ? 'Grupo Empresarial Bienestar | EasyFit by Vivo 47 | Documento de uso interno'
    : 'Grupo Empresarial Bienestar | Vivo 47 Family Fitness Club | Documento de uso interno'
}

/** Regla: primeros 2 días de Inducción GEB sugieren Naciones Unidas (editable). */
export function sucursalSugeridaParaDia(
  actividad: Actividad,
  diasPrevios: DiaInduccion[],
): string | null {
  if (actividad !== 'Inducción GEB') return null
  const gebPrevios = diasPrevios.filter((d) => d.actividad === 'Inducción GEB').length
  if (gebPrevios < 2) return 'Naciones Unidas'
  return null
}

/** Regla: Inducción Vivo 47 dura por default 10:00–11:30 AM (editable). */
export const HORARIO_DEFAULT_INDUCCION_VIVO47 = { inicio: '10:00', fin: '11:30' }

export function horarioSugeridoParaActividad(
  actividad: Actividad,
): { inicio: string; fin: string } | null {
  if (actividad === 'Inducción Vivo 47') return HORARIO_DEFAULT_INDUCCION_VIVO47
  return null
}

/** Regla: el día de Inicio Formal resalta los campos Recibe y Presentación. */
export function requiereRecibeYPresentacion(actividad: Actividad): boolean {
  return actividad === 'Inicio Formal'
}

export function nombreActividad(dia: DiaInduccion): string {
  return dia.actividad === 'Personalizado' && dia.actividadPersonalizada
    ? dia.actividadPersonalizada
    : dia.actividad
}

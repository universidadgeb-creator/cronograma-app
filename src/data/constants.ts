import type { Actividad, DiaInduccion, Presentacion, Sucursal, Turno } from '../types'

export const SUCURSALES: Sucursal[] = [
  'Naciones Unidas',
  'Valle Real',
  'La Estancia',
  'EasyFit La Estancia',
  'EasyFit Cañadas',
  'La Gourmetería',
]

export const EASYFIT_SUCURSALES: Sucursal[] = ['EasyFit La Estancia', 'EasyFit Cañadas']

export const TURNOS: Turno[] = ['Matutino', 'Vespertino', 'Mixto']

export const ACTIVIDADES: Actividad[] = [
  'Inducción GEB',
  'Inducción Vivo 47',
  'Inducción EasyFit',
  'Inducción Deportes',
  'Inducción Administración',
  'Inicio Formal',
  'Personalizado',
]

export const PRESENTACIONES: Presentacion[] = ['Con uniforme completo', 'Con ropa deportiva']

export const DIAS_SEMANA = [
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
  'Domingo',
]

export const COLORES_DIA = [
  { principal: '#4A1A6B', acento: '#5CB85C', nombre: 'Purple Dark' },
  { principal: '#6B2E9A', acento: '#F5A623', nombre: 'Purple Mid' },
  { principal: '#8B44B8', acento: '#5CB85C', nombre: 'Purple Light' },
  { principal: '#4A1A6B', acento: '#F5A623', nombre: 'Purple Dark' },
  { principal: '#6B2E9A', acento: '#5CB85C', nombre: 'Purple Mid' },
]

export const PALETTE = {
  purpleDark: '#4A1A6B',
  purpleMid: '#6B2E9A',
  purpleLight: '#8B44B8',
  green: '#5CB85C',
  orange: '#F5A623',
  white: '#FFFFFF',
  lightBg: '#F5EFF9',
  cardBg: '#FFFFFF',
  noteBg: '#FFF8EC',
  textGray: '#333333',
}

export function nuevoDia(): DiaInduccion {
  return {
    id: crypto.randomUUID(),
    diaSemana: DIAS_SEMANA[0],
    numeroDia: '',
    sucursal: '',
    horaInicio: '',
    horaFin: '',
    actividad: 'Inducción GEB',
    actividadPersonalizada: '',
    presentacion: '',
    recibe: '',
    notaEspecial: '',
  }
}

export const MAX_DIAS = 5

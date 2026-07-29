export type Sucursal =
  | 'Naciones Unidas'
  | 'Valle Real'
  | 'La Estancia'
  | 'EasyFit La Estancia'
  | 'EasyFit Cañadas'
  | 'La Gourmetería'

export type Turno = 'Matutino' | 'Vespertino' | 'Mixto'

export type LogoTipo = 'Vivo47' | 'EasyFit'

export type Actividad =
  | 'Inducción GEB'
  | 'Inducción Vivo 47'
  | 'Inducción EasyFit'
  | 'Inducción Deportes'
  | 'Inducción Administración'
  | 'Inicio Formal'
  | 'Personalizado'

export type Presentacion = 'Con uniforme completo' | 'Con ropa deportiva' | ''

export interface DiaInduccion {
  id: string
  diaSemana: string
  numeroDia: string
  sucursal: string
  horaInicio: string
  horaFin: string
  actividad: Actividad
  actividadPersonalizada: string
  presentacion: Presentacion
  recibe: string
  notaEspecial: string
}

export interface Colaborador {
  nombreCompleto: string
  puesto: string
  sucursal: Sucursal
  turno: Turno
  logo: LogoTipo
}

export interface NotaImportante {
  activa: boolean
  texto: string
}

export interface CronogramaData {
  colaborador: Colaborador
  dias: DiaInduccion[]
  notaImportante: NotaImportante
}

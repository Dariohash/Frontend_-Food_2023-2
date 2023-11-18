import { Plato } from "./plato"

export interface Restaurante{
    id: number
    nombre: string
    descripcion: string
    estrellas: number
    platoId: Plato
  }
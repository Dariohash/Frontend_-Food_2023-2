import { Restaurante } from "./restaurante"
import { Cliente } from "./cliente"


export interface Orden{
    id: number
    restauranteId: Restaurante
    clienteId: Cliente 
  }
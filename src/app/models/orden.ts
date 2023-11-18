import { Restaurante } from "./restaurante"
import { Cliente } from "./cliente"
import { Plato } from "./plato"

export interface Orden{
    id: number
    restauranteId: Restaurante
    clienteId: Cliente

    
  }
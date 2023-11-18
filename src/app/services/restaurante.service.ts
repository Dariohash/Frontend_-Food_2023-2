import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Restaurante } from '../models/restaurante';

const base_url = "https://bitfood-backend.onrender.com/restaurante"

@Injectable({
  providedIn: 'root'
})
export class RestauranteService {

  constructor(private http:HttpClient) { }

  getRestaurante(){
    const endpoint = `${base_url}/listar`;
    return this.http.get<Restaurante[]>(endpoint)
  }
  getRestauranteById(id: any) {
    const endpoint = `${base_url}/listar/${id}`;
    return this.http.get<Restaurante>(endpoint)
  }
  saveRestaurante(body: any){
    const endpoint = `${base_url}/insertar`;
    return this.http.post<Restaurante>(endpoint, body)
  }
  updateRestaurante(body: any, id: any) {
    const endpoint = `${base_url}/actualizar/${id}`;
    return this.http.put<Restaurante>(endpoint, body)
  }
  deleteRestaurante(id: any) {
    const endpoint = `${base_url}/eliminar/${id}`;
    return this.http.delete<Restaurante>(endpoint)

  }
}

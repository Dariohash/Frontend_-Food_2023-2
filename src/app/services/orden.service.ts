import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Orden } from '../models/orden';

const base_url = "https://bitfood-backend.onrender.com/orden"

@Injectable({
  providedIn: 'root'
})
export class OrdenService {

  constructor(private http:HttpClient) { }

  getOrden(){
    const endpoint = `${base_url}/listar`;
    return this.http.get<Orden[]>(endpoint)
  }
  getOrdenById(id: any) {
    const endpoint = `${base_url}/listar/${id}`;
    return this.http.get<Orden>(endpoint)
  }
  saveOrden(body: any){
    const endpoint = `${base_url}/insertar`;
    return this.http.post<Orden>(endpoint, body)
  }
  updateOrden(body: any, id: any) {
    const endpoint = `${base_url}/actualizar/${id}`;
    return this.http.put<Orden>(endpoint, body)
  }
  deleteOrden(id: any) {
    const endpoint = `${base_url}/eliminar/${id}`;
    return this.http.delete<Orden>(endpoint)

  }
}

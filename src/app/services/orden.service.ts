import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Orden } from '../models/orden';

const base_url = "http://localhost:3000/orden"

@Injectable({
  providedIn: 'root'
})
export class OrdenService {

  constructor(private http:HttpClient) { }

  getOrden(){
    const endpoint = `${base_url}/`;
    return this.http.get<Orden[]>(endpoint)
  }
  getOrdenById(id: any) {
    const endpoint = `${base_url}/${id}`;
    return this.http.get<Orden>(endpoint)
  }
  saveOrden(body: any){
    const endpoint = `${base_url}`;
    return this.http.post<Orden>(endpoint, body)
  }
  updateOrden(body: any, id: any) {
    const endpoint = `${base_url}/${id}`;
    return this.http.put<Orden>(endpoint, body)
  }
  deleteOrden(id: any) {
    const endpoint = `${base_url}/${id}`;
    return this.http.delete<Orden>(endpoint)

  }
}

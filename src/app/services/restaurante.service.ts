import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Restaurante } from '../models/restaurante';

const base_url = "http://localhost:3000/restaurante"

@Injectable({
  providedIn: 'root'
})
export class RestauranteService {

  constructor(private http:HttpClient) { }

  getRestaurante(){
    const endpoint = `${base_url}/`;
    return this.http.get<Restaurante[]>(endpoint)
  }
  getRestauranteById(id: any) {
    const endpoint = `${base_url}/${id}`;
    return this.http.get<Restaurante>(endpoint)
  }
  saveRestaurante(body: any){
    const endpoint = `${base_url}`;
    return this.http.post<Restaurante>(endpoint, body)
  }
  updateRestaurante(body: any, id: any) {
    const endpoint = `${base_url}/${id}`;
    return this.http.put<Restaurante>(endpoint, body)
  }
  deleteRestaurante(id: any) {
    const endpoint = `${base_url}/${id}`;
    return this.http.delete<Restaurante>(endpoint)

  }
}

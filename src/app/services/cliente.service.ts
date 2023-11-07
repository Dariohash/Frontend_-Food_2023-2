import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../models/cliente';

const base_url = "http://localhost:3000/cliente"

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http:HttpClient) { }

  getCliente(){
    const endpoint = `${base_url}/`;
    return this.http.get<Cliente[]>(endpoint)
  }
  getClientesById(id: any) {
    const endpoint = `${base_url}/${id}`;
    return this.http.get<Cliente>(endpoint)
  }
  saveCliente(body: any){
    const endpoint = `${base_url}`;
    return this.http.post<Cliente>(endpoint, body)
  }
  updateCliente(body: any, id: any) {
    const endpoint = `${base_url}/${id}`;
    return this.http.put<Cliente>(endpoint, body)
  }
  deleteCliente(id: any) {
    const endpoint = `${base_url}/${id}`;
    return this.http.delete<Cliente>(endpoint)

  }
}
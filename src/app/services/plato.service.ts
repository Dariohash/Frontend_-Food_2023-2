import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Plato } from '../models/plato';

const base_url = "http://localhost:3000/plato"


@Injectable({
  providedIn: 'root'
})
export class PlatoService {

  constructor(private http:HttpClient) { }

  getPlato(){
    const endpoint = `${base_url}/`;
    return this.http.get<Plato[]>(endpoint)
  }
  savePlato(body: any){
    const endpoint = `${base_url}`;
    return this.http.post<Plato>(endpoint, body)
  }



}

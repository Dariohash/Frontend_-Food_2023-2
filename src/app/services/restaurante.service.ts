import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Restaurante } from '../models/restaurante';
import * as XLSX from 'xlsx';

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

  exportToExcel(restaurantes: Restaurante[]) {

    const dataToExport = restaurantes.map(restaurante => ({
      id: restaurante.id,
      nombre: restaurante.nombre,
      estrellas: restaurante.estrellas,
      descripcion: restaurante.descripcion,
    }));

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    XLSX.writeFile(workbook, 'restaurantes.xlsx');
  }
  
  

}

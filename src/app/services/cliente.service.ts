import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../models/cliente';
import * as XLSX from 'xlsx';

const base_url = "https://bitfood-backend.onrender.com/cliente"

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http:HttpClient) { }

  getCliente(){
    const endpoint = `${base_url}/listar`;
    return this.http.get<Cliente[]>(endpoint)
  }
  getClientesById(id: any) {
    const endpoint = `${base_url}/listar/${id}`;
    return this.http.get<Cliente>(endpoint)
  }
  saveCliente(body: any){
    const endpoint = `${base_url}/insertar`;
    return this.http.post<Cliente>(endpoint, body)
  }
  updateCliente(body: any, id: any) {
    const endpoint = `${base_url}/actualizar/${id}`;
    return this.http.put<Cliente>(endpoint, body)
  }
  deleteCliente(id: any) {
    const endpoint = `${base_url}/eliminar/${id}`;
    return this.http.delete<Cliente>(endpoint)

  }

  exportToExcel(clientes: Cliente[]) {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(clientes);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    XLSX.writeFile(workbook, 'clientes.xlsx');
  }
  
}
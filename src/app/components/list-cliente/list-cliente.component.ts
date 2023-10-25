import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table'
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-list-cliente',
  templateUrl: './list-cliente.component.html',
  styleUrls: ['./list-cliente.component.css']
})
export class ListClienteComponent implements OnInit {
  displayedColumns: string[] = ['id','nombre','correo','contrasena','telefono']
  dataSource = new MatTableDataSource<Cliente>()

constructor(private clienteService: ClienteService){}

  ngOnInit(): void {
    this.getCliente()
  }

  getCliente(){
    this.clienteService.getCliente().subscribe((data: Cliente[]) =>{
      this.dataSource = new MatTableDataSource(data)
    })
  }

}

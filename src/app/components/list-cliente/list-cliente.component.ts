import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-list-cliente',
  templateUrl: './list-cliente.component.html',
  styleUrls: ['./list-cliente.component.css']
})
export class ListClienteComponent implements OnInit {
  [x: string]: any;
  displayedColumns: string[] = ['id','nombre','correo','contrasena','telefono','acciones']
  dataSource = new MatTableDataSource<Cliente>()

constructor(private clienteService: ClienteService, private snackBar: MatSnackBar,
  private router: Router){}

  ngOnInit(): void {
    this.getCliente()
  }

  getCliente(){
    this.clienteService.getCliente().subscribe((data: Cliente[]) =>{
      this.dataSource = new MatTableDataSource(data)
    })
  }

  edit(
    id: number,
    nombre: string,
    correo: string,
    contrasena: string,
    telefono: string
  ) {
    console.log('Editando ...')

  }

  delete(
    id: any
  ) {
    this.clienteService.deleteCliente(id).subscribe({
    next: (data) => {
      console.log("eliminando registro..." + id)
      this.snackBar.open('Cliente eliminado correctamento', '', {
        duration: 3000
      })
      this.getCliente()
      this.router.navigate(['/listCliente'])

    },
    error: (err) => {
      console.log(err)
    },
  })}

}

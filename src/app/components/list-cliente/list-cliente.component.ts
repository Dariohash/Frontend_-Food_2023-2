import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-list-cliente',
  templateUrl: './list-cliente.component.html',
  styleUrls: ['./list-cliente.component.css']
})
export class ListClienteComponent implements OnInit {
  [x: string]: any;
  displayedColumns: string[] = ['nombre','correo','contrasena','telefono','acciones']
  dataSource = new MatTableDataSource<Cliente>()
  @ViewChild(MatPaginator, {static: true}) paginator!:MatPaginator
constructor(private clienteService: ClienteService, private snackBar: MatSnackBar,
  private router: Router, public dialog: MatDialog){}

  ngOnInit(): void {
    this.getCliente()
  }

  getCliente(){
    this.clienteService.getCliente().subscribe((data: Cliente[]) =>{
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator
      
    })
  }

  filterClienteByNombre(nombre: any) {
    if (nombre.length === 0)
      {return this.getCliente()}

      this.clienteService.getCliente().subscribe((resp: any) => {
      this.processClienteResponse(resp, nombre)
    })
  }

  
  processClienteResponse(resp: any, nombre: string) {
    const cliente: Cliente[] = []

    let listCliente = resp
    console.log("resp.."+ resp)

    listCliente.forEach((element: Cliente) => {
      if (element.nombre.startsWith(nombre))
      {cliente.push(element)}

    });

  this.dataSource = new MatTableDataSource<Cliente>(cliente);
  this.dataSource.paginator = this.paginator;
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

  showDialog(id: number): void {
    this.dialog
      .open(DialogComponent, {
        data: "¿Deseas eliminar?"
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.delete(id)
        }
      })
  }

}

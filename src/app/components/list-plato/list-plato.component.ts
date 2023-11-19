import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Plato } from 'src/app/models/plato';
import { PlatoService } from 'src/app/services/plato.service';
import { DialogComponent } from '../dialog/dialog.component';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-list-plato',
  templateUrl: './list-plato.component.html',
  styleUrls: ['./list-plato.component.css']
})
export class ListPlatoComponent implements OnInit {
  [x: string]: any;
  displayedColumns: string[] = ['id','nombre','descripcion','precio', 'acciones']
  dataSource = new MatTableDataSource<Plato>()

  @ViewChild(MatPaginator, {static: true}) paginator!:MatPaginator

constructor(
  private platoService: PlatoService,
  private snackBar: MatSnackBar,
  private router: Router,
  public dialog: MatDialog
  ){}

  ngOnInit(): void {
    this.getPlato()
  }

  getPlato(){
    this.platoService.getPlato().subscribe((data: Plato[]) =>{
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator
    })
  }

//Cración para la filtración del plato por nombre
  filterPlatoByNombre(nombre: any) {
    if (nombre.length === 0)
      {return this.getPlato()}

      this.platoService.getPlato().subscribe((resp: any) => {
      this.processPlatoResponse(resp, nombre)
    })
  }
  processPlatoResponse(resp: any, nombre: string) {
    const datPlato: Plato[] = []

    let listAuto = resp
    console.log("resp.."+ resp)

//Busqueda por nombre
    listAuto.forEach((element: Plato) => {
      if (element.nombre.toLowerCase().startsWith(nombre.toLowerCase())) //este codigo es para quela búsqueda en tu filtro sea insensible a mayúsculas y minúsculas  // element.nombre.startsWith(nombre) este es el code del profe pero solo busca como esta escrito respetando mayusculas y minusculas
      {datPlato.push(element)}
    });
  //Refresca los datos buscados
  this.dataSource = new MatTableDataSource<Plato>(datPlato);
  this.dataSource.paginator = this.paginator;
  }

edit(id:number,
  nombre:string,
  descripcion:string,
  precio:number)
  {
    console.log('Editando ...')
  }

delete(id: any){
  this.platoService.deletePlato(id).subscribe({
    next: (data) => {
      console.log("eliminando registro..." + id)
      this.snackBar.open('Plato eliminado correctamento', '', {
        duration: 3000
      })
      this.getPlato()
      this.router.navigate(['/listPlato'])
    },
    error: (err) => {
      console.log(err)
    },
  })
}
//Para que nos pregunte si en verdad queremos eliminarlo
showDialog(id: number): void {
  this.dialog.open(DialogComponent, {
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

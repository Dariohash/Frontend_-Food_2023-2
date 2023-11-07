import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table'
import { Router } from '@angular/router';
import { Plato } from 'src/app/models/plato';
import { PlatoService } from 'src/app/services/plato.service';

@Component({
  selector: 'app-list-plato',
  templateUrl: './list-plato.component.html',
  styleUrls: ['./list-plato.component.css']
})
export class ListPlatoComponent implements OnInit {
  [x: string]: any;
  displayedColumns: string[] = ['id','nombre','descripcion','precio','acciones']
  dataSource = new MatTableDataSource<Plato>()

constructor(private platoService: PlatoService, private snackBar: MatSnackBar,
  private router: Router){}

  ngOnInit(): void {
    this.getPlato()
  }

  getPlato(){
    this.platoService.getPlato().subscribe((data: Plato[]) =>{
      this.dataSource = new MatTableDataSource(data)
    })
  }

  edit(
    id: number,
    nombre: string,
    descripcion: string,
    precio: number
  ) {
    console.log('Editando ...')

  }

  delete(
    id: any
  ) {
    this.platoService.deletePlato(id).subscribe({
    next: (data) => {
      console.log("eliminando registro..." + id)
      this.snackBar.open('Plato eliminado correctamente', '', {
        duration: 3000
      })
      this.getPlato()
      this.router.navigate(['/listPlato'])

    },
    error: (err) => {
      console.log(err)
    },
  })}

}

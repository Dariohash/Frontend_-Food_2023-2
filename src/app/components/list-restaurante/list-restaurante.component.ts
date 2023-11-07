import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table'
import { Router } from '@angular/router';
import { Restaurante } from 'src/app/models/restaurante';
import { RestauranteService } from 'src/app/services/restaurante.service';

@Component({
  selector: 'app-list-restaurante',
  templateUrl: './list-restaurante.component.html',
  styleUrls: ['./list-restaurante.component.css']
})
export class ListRestauranteComponent implements OnInit {
  displayedColumns: string[] = ['id','nombre','descripcion','cantidad','estrellas','fecha','acciones']
  dataSource = new MatTableDataSource<Restaurante>()

constructor(private restauranteService: RestauranteService, private snackBar: MatSnackBar,
  private router: Router){}

  ngOnInit(): void {
    this.getRestaurante()
  }

  getRestaurante(){
    this.restauranteService.getRestaurante().subscribe((data: Restaurante[]) =>{
      this.dataSource = new MatTableDataSource(data)
    })
  }

  edit(
    id: number,
    nombre: string,
    descripcion: string,
    cantidad: number,
    estrellas: number,
    fecha: string
  ) {
    console.log('Editando ...')

  }

  delete(
    id: any
  ) {
    this.restauranteService.deleteRestaurante(id).subscribe({
    next: (data) => {
      console.log("eliminando registro..." + id)
      this.snackBar.open('Restaurante eliminado correctamente', '', {
        duration: 3000
      })
      this.getRestaurante()
      this.router.navigate(['/listRestaurante'])

    },
    error: (err) => {
      console.log(err)
    },
  })}

}

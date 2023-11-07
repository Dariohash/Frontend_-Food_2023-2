import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table'
import { Restaurante } from 'src/app/models/restaurante';
import { RestauranteService } from 'src/app/services/restaurante.service';

@Component({
  selector: 'app-list-restaurante',
  templateUrl: './list-restaurante.component.html',
  styleUrls: ['./list-restaurante.component.css']
})
export class ListRestauranteComponent implements OnInit {
  displayedColumns: string[] = ['id','nombre','descripcion','cantidad','estrellas','fecha']
  dataSource = new MatTableDataSource<Restaurante>()

constructor(private restauranteService: RestauranteService){}

  ngOnInit(): void {
    this.getRestaurante()
  }

  getRestaurante(){
    this.restauranteService.getRestaurante().subscribe((data: Restaurante[]) =>{
      this.dataSource = new MatTableDataSource(data)
    })
  }

}

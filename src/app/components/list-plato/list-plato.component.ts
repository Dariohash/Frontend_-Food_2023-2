import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table'
import { Plato } from 'src/app/models/plato';
import { PlatoService } from 'src/app/services/plato.service';

@Component({
  selector: 'app-list-plato',
  templateUrl: './list-plato.component.html',
  styleUrls: ['./list-plato.component.css']
})
export class ListPlatoComponent implements OnInit {
  displayedColumns: string[] = ['id','nombre','descripcion','precio', 'acciones']
  dataSource = new MatTableDataSource<Plato>()

constructor(private platoService: PlatoService){}

  ngOnInit(): void {
    this.getPlato()
  }

  getPlato(){
    this.platoService.getPlato().subscribe((data: Plato[]) =>{
      this.dataSource = new MatTableDataSource(data)
    })
  }

edit(    id: number, nombre: string, descripcion: string, precio: number){

}

delete(id: any){

}

}

import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table'
import { Orden } from 'src/app/models/orden';
import { OrdenService } from 'src/app/services/orden.service';

@Component({
  selector: 'app-list-orden',
  templateUrl: './list-orden.component.html',
  styleUrls: ['./list-orden.component.css']
})
export class ListOrdenComponent implements OnInit {
  displayedColumns: string[] = ['id','fecha']
  dataSource = new MatTableDataSource<Orden>()

constructor(private ordenService: OrdenService){}

  ngOnInit(): void {
    this.getOrden()
  }

  getOrden(){
    this.ordenService.getOrden().subscribe((data: Orden[]) =>{
      this.dataSource = new MatTableDataSource(data)
    })
  }

}

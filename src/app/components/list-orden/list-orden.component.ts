import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table'
import { Router } from '@angular/router';
import { Orden } from 'src/app/models/orden';
import { OrdenService } from 'src/app/services/orden.service';

@Component({
  selector: 'app-list-orden',
  templateUrl: './list-orden.component.html',
  styleUrls: ['./list-orden.component.css']
})
export class ListOrdenComponent implements OnInit {
  [x: string]: any;
  displayedColumns: string[] = ['id','fecha','acciones']
  dataSource = new MatTableDataSource<Orden>()

constructor(private ordenService: OrdenService, private snackBar: MatSnackBar,
  private router: Router){}

  ngOnInit(): void {
    this.getOrden()
  }

  getOrden(){
    this.ordenService.getOrden().subscribe((data: Orden[]) =>{
      this.dataSource = new MatTableDataSource(data)
    })
  }

  edit(
    id: number,
    fecha: string
  ) {
    console.log('Editando ...')

  }

  
  delete(
    id: any
  ) {
    this.ordenService.deleteOrden(id).subscribe({
    next: (data) => {
      console.log("eliminando registro..." + id)
      this.snackBar.open('Orden eliminada correctamente', '', {
        duration: 3000
      })
      this.getOrden()
      this.router.navigate(['/listOrden'])

    },
    error: (err) => {
      console.log(err)
    },
  })}


}

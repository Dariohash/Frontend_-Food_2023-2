import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table'
import { Router } from '@angular/router';
import { Plato } from 'src/app/models/plato';
import { PlatoService } from 'src/app/services/plato.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-list-plato',
  templateUrl: './list-plato.component.html',
  styleUrls: ['./list-plato.component.css']
})
export class ListPlatoComponent implements OnInit {
  [x: string]: any;
  displayedColumns: string[] = ['nombre','descripcion','precio','imagen','acciones']
  dataSource = new MatTableDataSource<Plato>()
  @ViewChild(MatPaginator, {static: true}) paginator!:MatPaginator
constructor(private platoService: PlatoService, private snackBar: MatSnackBar,
  private router: Router, public dialog: MatDialog){}

  ngOnInit(): void {
    this.getPlato()
  }

  getPlato(){
    this.platoService.getPlato().subscribe((data: Plato[]) =>{
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator
    })
  }

  onPrecioInputChange(value: string) {
    const precio = value ? +value : null; 
    this.filterPlatoByPrecio(precio);
  }
  
  filterPlatoByPrecio(precio: number | null) {
    if (precio === null) {
      return this.getPlato();
    }
  
    this.platoService.getPlato().subscribe((resp: any) => {
      this.processPlatoResponse(resp, precio);
    });
  }
  
  processPlatoResponse(resp: any, precio: number | null) {
    const plato: Plato[] = [];
  
    let listPlato = resp;
  
    listPlato.forEach((element: Plato) => {
      if (element.precio === precio) {
        plato.push(element);
      }
    });
  
    this.dataSource = new MatTableDataSource<Plato>(plato);
    this.dataSource.paginator = this.paginator;
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

  getImagenUrl(plato: Plato): string {
    if (plato.nombre === 'Pollo a la Brasa') {
      return 'assets/img/platos/pollo.png';
    } else if (plato.nombre === 'Anticuchos') {
      return 'assets/img/platos/anticucho.jpg';
    } else if (plato.nombre === 'Lomo Saltado') {
      return 'assets/img/platos/lomo.jpg';
    } else if (plato.nombre === 'Aji de Gallina') {
      return 'assets/img/platos/aji.jpg';
    } else if (plato.nombre === 'Pastel de Papa') {
      return 'assets/img/platos/papa.jpg';
    } else if (plato.nombre === 'Arroz con Mariscos') {
      return 'assets/img/platos/mariscos.jpg';
    } else if (plato.nombre === 'Arroz con Pollo') {
      return 'assets/img/platos/arroz con pollo.jpg';
    } else if (plato.nombre === 'Ceviche Mixto') {
      return 'assets/img/platos/ceviche.jpg';
    } else if (plato.nombre === 'Arroz Chaufa Especial') {
      return 'assets/img/platos/chaufa.jpg';
    } else if (plato.nombre === 'Patasca') {
      return 'assets/img/platos/patasca.jpg';
    } else {
      return 'assets/img/platos/default.jpg';
    }
  }
  
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

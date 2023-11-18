import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table'
import { Router } from '@angular/router';
import { Restaurante } from 'src/app/models/restaurante';
import { RestauranteService } from 'src/app/services/restaurante.service';
import { MatPaginator } from '@angular/material/paginator';
import { Plato } from 'src/app/models/plato';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-list-restaurante',
  templateUrl: './list-restaurante.component.html',
  styleUrls: ['./list-restaurante.component.css']
})
export class ListRestauranteComponent implements OnInit {
  [x: string]: any;
  displayedColumns: string[] = ['restaurante','nombre','descripcion','estrellas','plato','acciones']
  dataSource = new MatTableDataSource<Restaurante>()
  @ViewChild(MatPaginator, {static: true}) paginator!:MatPaginator
constructor(private restauranteService: RestauranteService, private snackBar: MatSnackBar,
  private router: Router, public dialog: MatDialog){}

  ngOnInit(): void {
    this.getRestaurante()
  }

  getRestaurante(){
    this.restauranteService.getRestaurante().subscribe((data: Restaurante[]) =>{
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator
    })
  }

  onEstrellasInputChange(value: string) {
    const estrellas = value ? +value : null; 
    this.filterRestauranteByEstrellas(estrellas);
  }
  
  filterRestauranteByEstrellas(estrellas: number | null) {
    if (estrellas === null) {
      return this.getRestaurante();
    }
  
    this.restauranteService.getRestaurante().subscribe((resp: any) => {
      this.processRestauranteResponse(resp, estrellas);
    });
  }
  
  processRestauranteResponse(resp: any, estrellas: number | null) {
    const restaurante: Restaurante[] = [];
  
    let listRestaurante = resp;
  
    listRestaurante.forEach((element: Restaurante) => {
      if (element.estrellas === estrellas) {
        restaurante.push(element);
      }
    });
  
    this.dataSource = new MatTableDataSource<Restaurante>(restaurante);
    this.dataSource.paginator = this.paginator;
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

  getPlatoName(plato: Plato): string {
    return plato ? plato.nombre : '';
  }

  getImagenUrl(Restaurante: Restaurante): string {
    if (Restaurante.nombre === 'Puerto Azul') {
      return 'assets/img/componentes/puertoazul.png';
    } else if (Restaurante.nombre === 'Rinconcito Arequipeño') {
      return 'assets/img/componentes/rinconaqp.jpg';
    } else if (Restaurante.nombre === 'Chifa Delicasa') {
      return 'assets/img/componentes/chifadelicasa.jpg';
    } else if (Restaurante.nombre === 'Huancahuasi') {
      return 'assets/img/componentes/wanka.jpg';
    } else if (Restaurante.nombre === 'Villa Chicken') {
      return 'assets/img/componentes/villa.png';
    } else if (Restaurante.nombre === 'El Norteño') {
      return 'assets/img/componentes/norteño.jpg';
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


import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { Orden } from 'src/app/models/orden';
import { Plato } from 'src/app/models/plato';
import { Restaurante } from 'src/app/models/restaurante';
import { OrdenService } from 'src/app/services/orden.service';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-list-orden',
  templateUrl: './list-orden.component.html',
  styleUrls: ['./list-orden.component.css']
})
export class ListOrdenComponent implements OnInit {
  [x: string]: any;
  public today: Date = new Date();
  displayedColumns: string[] = ['fecha','cliente','restaurante','imagen','acciones']
  dataSource = new MatTableDataSource<Orden>()
  @ViewChild(MatPaginator, {static: true}) paginator!:MatPaginator

  constructor(
    private ordenService: OrdenService,
    private snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getOrden();
  }

  getOrden() {
    this.ordenService.getOrden().subscribe((data: Orden[]) => {
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator
       return this.ordenService.getOrden();
    });
  }


  delete(id: any) {
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
    })
  }

  getClienteName(cliente: Cliente): string {
    return cliente ? cliente.nombre : '';
  }

  getRestauranteName(restaurante: Restaurante): string {
    return restaurante ? restaurante.nombre : '';
  }

  getPlatoName(plato: Plato): string {
    return plato ? plato.nombre : '';
  }

  getImagenUrl(plato: Plato): string {
    if (plato.nombre === 'Lorenzo') {
      return 'assets/img/componentes/check.png';
    } else {
      return 'assets/img/componentes/check.png';
    }
  }



  getFormattedDate(): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false,
      timeZone: 'America/Lima' 
    };
    return this.today.toLocaleDateString('en-US', options);
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

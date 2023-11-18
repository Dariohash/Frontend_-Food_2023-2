import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Orden } from 'src/app/models/orden';
import { OrdenService } from 'src/app/services/orden.service';
import { Restaurante } from 'src/app/models/restaurante';
import { RestauranteService } from 'src/app/services/restaurante.service';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { Plato } from 'src/app/models/plato';
import { PlatoService } from 'src/app/services/plato.service';

@Component({
  selector: 'app-add-orden',
  templateUrl: './add-orden.component.html',
  styleUrls: ['./add-orden.component.css']
})
export class AddOrdenComponent implements OnInit  {
  public myForm!: FormGroup;
  public _id: number = 0
  public restaurante: Restaurante[] = [];
  public cliente: Cliente[] = [];
  public plato: Plato[] = [];

  constructor(
    private fb: FormBuilder,
    private ordenService: OrdenService,
    private restauranteService: RestauranteService,
    private clienteService: ClienteService,
    private platoService: PlatoService,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute
    
  ) {}

  ngOnInit(): void {
    this.reactiveForm();
    this.getRestaurantes();
    this.getClientes();
    this.getPlatos();
  }

  reactiveForm() {
    this.myForm = this.fb.group({
      id: [''],
      clienteId: [''],
      restauranteId: [''],
      platoId: ['']
    });

    this._id = this.activatedRoute.snapshot.params['id'];

    if (this._id != 0 && this._id != undefined) {
      this.ordenService.getOrdenById(this._id).subscribe((data: Orden) =>{
        this.myForm.get('restauranteId')!.setValue(data.restauranteId),
        this.myForm.get('clienteId')!.setValue(data.clienteId);
      });
  }}



  getRestaurantes() {
    this.restauranteService.getRestaurante().subscribe((restaurantes: Restaurante[]) => {
      this.restaurante = restaurantes;
    });
  }

  getClientes() {
    this.clienteService.getCliente().subscribe((clientes: Cliente[]) => {
      this.cliente = clientes;
    });
  }

  getPlatos() {
    this.platoService.getPlato().subscribe((platos: Plato[]) => {
      this.plato = platos;
    });
  }

  addOrden() {
    const orden: Orden = {
      id: 0,
      restauranteId: this.myForm.get('restauranteId')!.value,
      clienteId: this.myForm.get('clienteId')!.value,


    }
    if (this._id == 0 || this._id == undefined) {
      this.ordenService.saveOrden(orden).subscribe({
        next: (data) => {
          console.log("ingresando registro...")
          this.snackBar.open('Orden creada correctamente', '', {
            duration: 3000
          })
            this.router.navigate(['/listOrden'])
        },
        error: (err) => {
          console.log(err)
        },
      })
    } else
    {
      this.ordenService.updateOrden(orden, this._id).subscribe({
        next: (date) => {
          this.snackBar.open('Orden modificada correctamente', '', {
            duration: 3000
          })
          this.router.navigate(['/listOrden'])
        },
        error: (err) => {
          console.log(err)
        }
      })
    }

  }

}

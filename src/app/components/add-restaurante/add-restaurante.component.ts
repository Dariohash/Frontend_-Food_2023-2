import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Restaurante } from 'src/app/models/restaurante';
import { RestauranteService } from 'src/app/services/restaurante.service';

@Component({
  selector: 'app-add-restaurante',
  templateUrl: './add-restaurante.component.html',
  styleUrls: ['./add-restaurante.component.css']
})
export class AddRestauranteComponent implements OnInit  {
  public myForm!: FormGroup;
  public _id: number = 0

  constructor(
    private fb: FormBuilder,
    private restauranteService: RestauranteService,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.reactiveForm();
  }

  reactiveForm() {
    this.myForm = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      cantidad: ['', Validators.required],
      estrellas: ['', Validators.required],
      fecha: ['', Validators.required]
    })

    this._id = this.activatedRoute.snapshot.params['id']

    if (this._id != 0 && this._id != undefined) {
      this.restauranteService.getRestauranteById(this._id).subscribe((data: Restaurante) =>{
        this.myForm.get('nombre')!.setValue(data.nombre)
        this.myForm.get('descripcion')!.setValue(data.descripcion)
        this.myForm.get('cantidad')!.setValue(data.cantidad)
        this.myForm.get('estrellas')!.setValue(data.estrellas)
        this.myForm.get('fecha')!.setValue(data.fecha)
      } )
    }
  }

  addRestaurante() {
    const restaurante: Restaurante = {
      id: 0,
      nombre: this.myForm.get('nombre')!.value,
      descripcion: this.myForm.get('descripcion')!.value,
      cantidad: this.myForm.get('cantidad')!.value,
      estrellas: this.myForm.get('estrellas')!.value,
      fecha: this.myForm.get('fecha')!.value
    }
    if (this._id == 0 || this._id == undefined) {
      this.restauranteService.saveRestaurante(restaurante).subscribe({
        next: (data) => {
          console.log("ingresando registro...")
          this.snackBar.open('Restaurante creado correctamente', '', {
            duration: 3000
          })
            this.router.navigate(['/listRestaurante'])
        },
        error: (err) => {
          console.log(err)
        },
      })
    } else
    {
      this.restauranteService.updateRestaurante(restaurante, this._id).subscribe({
        next: (date) => {
          this.snackBar.open('Restaurante modificado correctamente', '', {
            duration: 3000
          })
          this.router.navigate(['/listRestaurante'])
        },
        error: (err) => {
          console.log(err)
        }
      })
    }

  }

}

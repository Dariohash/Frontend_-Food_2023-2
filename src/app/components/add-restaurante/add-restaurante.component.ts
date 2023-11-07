import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Restaurante } from 'src/app/models/restaurante';
import { RestauranteService } from 'src/app/services/restaurante.service';

@Component({
  selector: 'app-add-restaurante',
  templateUrl: './add-restaurante.component.html',
  styleUrls: ['./add-restaurante.component.css']
})
export class AddRestauranteComponent implements OnInit  {
  public myForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private restauranteService: RestauranteService,
    private snackBar: MatSnackBar,
    private router: Router
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
    });
  }

  addRestaurante() {
    const restaurante: Restaurante = {
      id: 0,
      nombre: this.myForm.get('nombre')!.value,
      descripcion: this.myForm.get('descripcion')!.value,
      cantidad: this.myForm.get('cantidad')!.value,
      estrellas: this.myForm.get('estrellas')!.value,
      fecha: this.myForm.get('fecha')!.value,
    }
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
  }

}

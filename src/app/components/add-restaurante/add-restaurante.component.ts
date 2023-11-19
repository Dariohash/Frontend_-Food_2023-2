import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Plato } from 'src/app/models/plato';
import { Restaurante } from 'src/app/models/restaurante';
import { RestauranteService } from 'src/app/services/restaurante.service';
import { PlatoService } from 'src/app/services/plato.service';

@Component({
  selector: 'app-add-restaurante',
  templateUrl: './add-restaurante.component.html',
  styleUrls: ['./add-restaurante.component.css']
})
export class AddRestauranteComponent implements OnInit  {
  public myForm!: FormGroup;
  public _id: number = 0
  public platos: Plato[] = [];

  constructor(
    private fb: FormBuilder,
    private restauranteService: RestauranteService,
    private platoService: PlatoService,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.reactiveForm();
    this.getPlatos();

  }

  reactiveForm() {
    this.myForm = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      estrellas: ['', Validators.required],
      platoId: ['']
    })

    this._id = this.activatedRoute.snapshot.params['id']

    if (this._id != 0 && this._id != undefined) {
      this.restauranteService.getRestauranteById(this._id).subscribe((data: Restaurante) =>{
        this.myForm.get('nombre')!.setValue(data.nombre)
        this.myForm.get('descripcion')!.setValue(data.descripcion)
        this.myForm.get('estrellas')!.setValue(data.estrellas)
        this.myForm.get('platoId')!.setValue(data.platoId)
      } )
    }
  }

  getPlatos() {
    this.platoService.getPlato().subscribe((platos: Plato[]) => {
      this.platos = platos;
    });
  }



addRestaurante() {
  const restaurante: Restaurante = {
    id: 0,
    nombre: this.myForm.get('nombre')!.value,
    descripcion: this.myForm.get('descripcion')!.value,
    estrellas: this.myForm.get('estrellas')!.value,
    platoId: this.myForm.get('platoId')!.value as Plato 
  };

  if (this._id == 0 || this._id == undefined) {
    this.restauranteService.saveRestaurante(restaurante).subscribe({
      next: (data) => {
        console.log("Ingresando registro...");
        this.snackBar.open('Restaurante creado correctamente', '', {
          duration: 3000
        });
        this.router.navigate(['/listRestaurante']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  } else {
    this.restauranteService.updateRestaurante(restaurante, this._id).subscribe({
      next: (date) => {
        this.snackBar.open('Restaurante modificado correctamente', '', {
          duration: 3000
        });
        this.router.navigate(['/listRestaurante']);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}


}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Plato } from 'src/app/models/plato';
import { PlatoService } from 'src/app/services/plato.service';
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-add-plato',
  templateUrl: './add-plato.component.html',
  styleUrls: ['./add-plato.component.css']
})
export class AddPlatoComponent implements OnInit {
  public myForm!: FormGroup

  constructor(
    private fb: FormBuilder,
    private platoService:PlatoService,
    private snackBar: MatSnackBar,
    private router: Router){}

  ngOnInit():void{
    this.reactiveForm()
  }

  reactiveForm() {
    this.myForm = this.fb.group({
      id : [''],
      nombre: ['',[Validators.required]],
      descripcion:['',[Validators.required]],
      precio: ['',[Validators.required]]

    })
  }

  addPlato(){
    const plato: Plato = {
      id:0,
      nombre: this.myForm.get('nombre')!.value,
      descripcion: this.myForm.get('descripcion')!.value,
      precio: this.myForm.get('precio')!.value
    }
    this.platoService.savePlato(plato).subscribe({
      next: (data) => {
        console.log("Se ha guardado el plato")
        this.snackBar.open('Plato Creado Correctamente','',{
          duration: 3000
        })
        this.router.navigate(['/listPlato'])
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}

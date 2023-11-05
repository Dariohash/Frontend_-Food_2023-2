import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router, ActivatedRoute } from '@angular/router';
import { Plato } from 'src/app/models/plato';
import { PlatoService } from 'src/app/services/plato.service';


@Component({
  selector: 'app-add-plato',
  templateUrl: './add-plato.component.html',
  styleUrls: ['./add-plato.component.css']
})
export class AddPlatoComponent implements OnInit {
  public myForm!: FormGroup
  public _id: number = 0

  constructor(
    private fb: FormBuilder,
    private platoService:PlatoService,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ){}

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

    this._id = this.activatedRoute.snapshot.params['id']

    if (this._id != 0 && this._id != undefined) {
      this.platoService.getPlatoById(this._id).subscribe((data: Plato) =>{
        this.myForm.get('nombre')!.setValue(data.nombre)
        this.myForm.get('descripcion')!.setValue(data.descripcion)
        this.myForm.get('precio')!.setValue(data.precio)
      } )
    }

  }

  addPlato(){
    const plato: Plato = {
      id:0,
      nombre: this.myForm.get('nombre')!.value,
      descripcion: this.myForm.get('descripcion')!.value,
      precio: this.myForm.get('precio')!.value
    }

    if(this._id == 0 || this._id == undefined){

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
    }else{
      this.platoService.updatePlato(plato, this._id).subscribe({
        next: (date) => {
          this.snackBar.open('Plato modificado correctamente', '', {
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
}

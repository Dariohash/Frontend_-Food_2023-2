import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Orden } from 'src/app/models/orden';
import { OrdenService } from 'src/app/services/orden.service';

@Component({
  selector: 'app-add-orden',
  templateUrl: './add-orden.component.html',
  styleUrls: ['./add-orden.component.css']
})
export class AddOrdenComponent implements OnInit  {
  public myForm!: FormGroup;
  public _id: number = 0

  constructor(
    private fb: FormBuilder,
    private ordenService: OrdenService,
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
      fecha: ['', Validators.required]
    })

    this._id = this.activatedRoute.snapshot.params['id']

    if (this._id != 0 && this._id != undefined) {
      this.ordenService.getOrdenById(this._id).subscribe((data: Orden) =>{
        this.myForm.get('fecha')!.setValue(data.fecha)

      } )
    }
  }

  addOrden() {
    const orden: Orden = {
      id: 0,
      fecha: this.myForm.get('fecha')!.value,

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

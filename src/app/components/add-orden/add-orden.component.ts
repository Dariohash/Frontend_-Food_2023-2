import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Orden } from 'src/app/models/orden';
import { OrdenService } from 'src/app/services/orden.service';

@Component({
  selector: 'app-add-orden',
  templateUrl: './add-orden.component.html',
  styleUrls: ['./add-orden.component.css']
})
export class AddOrdenComponent implements OnInit  {
  public myForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private ordenService: OrdenService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.reactiveForm();
  }

  reactiveForm() {
    this.myForm = this.fb.group({
      id: [''],
      fecha: ['', Validators.required]
    });
  }

  addOrden() {
    const orden: Orden = {
      id: 0,
      fecha: this.myForm.get('fecha')!.value
    }
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
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-add-cliente',
  templateUrl: './add-cliente.component.html',
  styleUrls: ['./add-cliente.component.css']
})
export class AddClienteComponent implements OnInit  {
  public myForm!: FormGroup;
  public _id: number = 0

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
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
      correo: ['', Validators.required],
      contrasena: ['', Validators.required],
      telefono: ['', Validators.required]
    })

    this._id = this.activatedRoute.snapshot.params['id']

    if (this._id != 0 && this._id != undefined) {
      this.clienteService.getClientesById(this._id).subscribe((data: Cliente) =>{
        this.myForm.get('nombre')!.setValue(data.nombre)
        this.myForm.get('correo')!.setValue(data.correo)
        this.myForm.get('contrasena')!.setValue(data.contrasena)
        this.myForm.get('telefono')!.setValue(data.telefono)
      } )
    }
  }
  


  addCliente() {
    const cliente: Cliente = {
      id: 0,
      nombre: this.myForm.get('nombre')!.value,
      correo: this.myForm.get('correo')!.value,
      contrasena: this.myForm.get('contrasena')!.value,
      telefono: this.myForm.get('telefono')!.value
    }
    if (this._id == 0 || this._id == undefined) {
      this.clienteService.saveCliente(cliente).subscribe({
        next: (data) => {
          console.log("ingresando registro...")
          this.snackBar.open('Cliente creado correctamente', '', {
            duration: 3000
          })
            this.router.navigate(['/listCliente'])
        },
        error: (err) => {
          console.log(err)
        },
      })
    } else
    {
      this.clienteService.updateCliente(cliente, this._id).subscribe({
        next: (date) => {
          this.snackBar.open('Cliente modificado correctamente', '', {
            duration: 3000
          })
          this.router.navigate(['/listCliente'])
        },
        error: (err) => {
          console.log(err)
        }
      })
    }

  }

}

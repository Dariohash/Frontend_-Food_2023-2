import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-add-cliente',
  templateUrl: './add-cliente.component.html',
  styleUrls: ['./add-cliente.component.css']
})
export class AddClienteComponent implements OnInit  {
  public myForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
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
      correo: ['', Validators.required],
      contrasena: ['', Validators.required],
      telefono: ['', Validators.required]
    });
  }

  addCliente() {
    const cliente: Cliente = {
      id: 0,
      nombre: this.myForm.get('nombre')!.value,
      correo: this.myForm.get('correo')!.value,
      contrasena: this.myForm.get('contrasena')!.value,
      telefono: this.myForm.get('telefono')!.value
    }
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
  }

}

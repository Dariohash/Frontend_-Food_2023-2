import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPlatoComponent } from './components/list-plato/list-plato.component';
import { AddPlatoComponent } from './components/add-plato/add-plato.component';
import { AddClienteComponent } from './components/add-cliente/add-cliente.component';
import { ListClienteComponent } from './components/list-cliente/list-cliente.component';

const routes: Routes = [
  {path: 'listPlato',component: ListPlatoComponent},
  {path: 'addPlato', component: AddPlatoComponent},
  {path: 'listCliente', component: ListClienteComponent},
  {path: 'addCliente', component: AddClienteComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPlatoComponent } from './components/list-plato/list-plato.component';
import { AddPlatoComponent } from './components/add-plato/add-plato.component';
import { AddClienteComponent } from './components/add-cliente/add-cliente.component';
import { ListClienteComponent } from './components/list-cliente/list-cliente.component';
import { ListRestauranteComponent } from './components/list-restaurante/list-restaurante.component';
import { AddRestauranteComponent } from './components/add-restaurante/add-restaurante.component';
import { AddOrdenComponent } from './components/add-orden/add-orden.component';
import { ListOrdenComponent } from './components/list-orden/list-orden.component';

const routes: Routes = [
  {path: 'listPlato',component: ListPlatoComponent},
  {path: 'addPlato', component: AddPlatoComponent},
  {path: 'listCliente', component: ListClienteComponent},
  {path: 'addCliente', component: AddClienteComponent},
  {path: 'listRestaurante',component: ListRestauranteComponent},
  {path: 'addRestaurante',component: AddRestauranteComponent},
  {path: 'listOrden',component: ListOrdenComponent},
  {path: 'addOrden',component: AddOrdenComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

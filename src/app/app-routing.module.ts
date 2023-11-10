import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPlatoComponent } from './components/list-plato/list-plato.component';
import { AddPlatoComponent } from './components/add-plato/add-plato.component';
import { LoginComponent } from './components/login/login.component';
import { IndexMostrarComponent } from './components/indexa/index-mostrar/index-mostrar.component';


const routes: Routes = [
  {path: 'listPlato',component: ListPlatoComponent},
  {path: 'addPlato', component: AddPlatoComponent},
  {path:'editPlato/:id', component: AddPlatoComponent},
  {path:'login', component: LoginComponent},
  {path:'index', component: IndexMostrarComponent}
  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

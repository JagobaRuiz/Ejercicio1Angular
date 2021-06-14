import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticulosComponent } from './articulos/articulos.component';
import { ModificarComponent } from './modificar/modificar.component';

const routes: Routes = [
  { path: '', redirectTo: '/articulo', pathMatch: 'full' },
  { path: 'modificar/:id', component: ModificarComponent },
  { path: 'articulo', component: ArticulosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

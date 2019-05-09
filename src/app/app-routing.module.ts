import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalculDitineraireComponent } from './calcul-ditineraire/calcul-ditineraire.component';

const routes: Routes = [
  {path:"calcul-ditineraire",component:CalculDitineraireComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

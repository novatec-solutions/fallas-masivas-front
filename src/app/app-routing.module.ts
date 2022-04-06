import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquiposListComponent } from './views/equipos-list/equipos-list.component';
import { ValidarPinComponent } from './views/validar-pin/validar-pin.component';
import { ValidarUserComponent } from './views/validar-user/validar-user.component';

const routes: Routes = [
  { path: '', component: ValidarUserComponent },
  { path: 'validar-user', component: ValidarUserComponent },
  { path: 'pin', component: ValidarPinComponent },
  { path: 'equipos', component: EquiposListComponent },
  { path: '**', pathMatch: 'full', redirectTo: '/validar-user' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

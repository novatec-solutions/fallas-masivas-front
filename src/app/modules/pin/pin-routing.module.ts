import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidatePinComponent } from './pages/validate-pin/validate-pin.component';

const routes: Routes = [
  {
    path: '',
    component: ValidatePinComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PinRoutingModule { }

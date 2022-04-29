import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivatePackageComponent } from './pages/activate-package/activate-package.component';
import { BillPaymentComponent } from './pages/bill-payment/bill-payment.component';

const routes: Routes = [
  {
    path: '',
    component: BillPaymentComponent,
  },
  {
    path: 'paquete',
    component: ActivatePackageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FailureSupportRoutingModule { }

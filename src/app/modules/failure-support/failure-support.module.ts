import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FailureSupportRoutingModule } from './failure-support-routing.module';
import { BillPaymentComponent } from './pages/bill-payment/bill-payment.component';
import { ActivatePackageComponent } from './pages/activate-package/activate-package.component';
import { CoreModule } from 'src/app/core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/core/material/material.module';

@NgModule({
  declarations: [
    BillPaymentComponent,
    ActivatePackageComponent
  ],
  imports: [
    CommonModule,
    FailureSupportRoutingModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class FailureSupportModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PinRoutingModule } from './pin-routing.module';
import { ValidatePinComponent } from './pages/validate-pin/validate-pin.component';
import { MaterialModule } from 'src/app/core/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
import { MaxLengthDirective } from './directive/max-length.directive';

@NgModule({
  declarations: [
    ValidatePinComponent,
    MaxLengthDirective
  ],
  imports: [
    CommonModule,
    PinRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule
  ]
})
export class PinModule { }

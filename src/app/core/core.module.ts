import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesComponent } from './organisms/messages/messages.component';
import { MaterialModule } from './material/material.module';
import { ButtonComponent } from './atoms/button/button.component';

@NgModule({
  declarations: [
    MessagesComponent,
    ButtonComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports:[
    ButtonComponent
  ]
})
export class CoreModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {  RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { IdComponent } from './view/id/id.component';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbPopoverModule } from 'mdb-angular-ui-kit/popover';
import { MdbRadioModule } from 'mdb-angular-ui-kit/radio';
import { MdbRangeModule } from 'mdb-angular-ui-kit/range';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbScrollspyModule } from 'mdb-angular-ui-kit/scrollspy';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { CodeComponent } from './view/code/code.component';
import { AddressComponent } from './view/address/address.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EquipmentComponent } from './view/equipment/equipment.component';
import { DocumentComponent } from './view/document/document.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalComponent } from './modal/modal.component';


@NgModule({
  declarations: [ DocumentComponent, AppComponent,  IdComponent,  CodeComponent,  AddressComponent, EquipmentComponent, ModalComponent,],
  imports: [BrowserModule,  AppRoutingModule, FormsModule, ReactiveFormsModule,RouterModule, MdbAccordionModule, MdbCarouselModule, MdbCheckboxModule, MdbCollapseModule, MdbDropdownModule, MdbFormsModule, MdbModalModule, MdbPopoverModule, MdbRadioModule, MdbRangeModule, MdbRippleModule, MdbScrollspyModule, MdbTabsModule, MdbTooltipModule, MdbValidationModule, BrowserAnimationsModule, ModalModule.forRoot()],
  exports: [
IdComponent
  ],
  providers: [
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

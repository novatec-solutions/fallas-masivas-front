// Modulos de Router
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule, Router  } from '@angular/router';
import { AddressComponent } from './view/address/address.component';
import { CodeComponent } from './view/code/code.component';
//Componentes
import { DocumentComponent } from './view/document/document.component';
import { EquipmentComponent } from './view/equipment/equipment.component';
import { IdComponent } from './view/id/id.component';



const routes: Routes = [
  { path: '', pathMatch:'full', redirectTo: '/init'  },
  { path: 'init', component: DocumentComponent},
  { path: 'validate', component: IdComponent},
  { path: 'code', component: CodeComponent},
  { path: 'address', component: AddressComponent},
  { path: 'equipment', component: EquipmentComponent},




  { path: '**', pathMatch:'full', redirectTo: '/init'  },


];

@NgModule({
  imports: [  BrowserModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{}

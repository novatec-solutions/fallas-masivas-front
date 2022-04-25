import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressListComponent } from './pages/address-list/address-list.component';
import { EquipmentListComponent } from './pages/equipment-list/equipment-list.component';

const routes: Routes = [
  {
    path: '',
    component: AddressListComponent,
  },
  {
    path: 'equipos',
    component: EquipmentListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }

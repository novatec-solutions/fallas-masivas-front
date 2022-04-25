import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: 'pin',
    loadChildren: () =>
      import('./modules/pin/pin.module').then((m) => m.PinModule),
  },
  {
    path: 'cuenta',
    loadChildren: () =>
      import('./modules/account/account.module').then((m) => m.AccountModule),
  },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

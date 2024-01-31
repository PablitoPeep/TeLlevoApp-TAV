import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViajespaPage } from './viajespa.page';

const routes: Routes = [
  {
    path: '',
    component: ViajespaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViajespaPageRoutingModule {}

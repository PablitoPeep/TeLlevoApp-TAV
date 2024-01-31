import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomepaPage } from './homepa.page';

const routes: Routes = [
  {
    path: '',
    component: HomepaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomepaPageRoutingModule {}

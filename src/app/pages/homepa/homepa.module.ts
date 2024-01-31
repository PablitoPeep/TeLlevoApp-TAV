import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomepaPageRoutingModule } from './homepa-routing.module';

import { HomepaPage } from './homepa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomepaPageRoutingModule
  ],
  declarations: [HomepaPage]
})
export class HomepaPageModule {}

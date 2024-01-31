import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViajespaPageRoutingModule } from './viajespa-routing.module';

import { ViajespaPage } from './viajespa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViajespaPageRoutingModule
  ],
  declarations: [ViajespaPage]
})
export class ViajespaPageModule {}

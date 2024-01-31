// modal-pasajero.component.ts
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-pasajero',
  templateUrl: './modal-pasajero.component.html',
  styleUrls: ['./modal-pasajero.component.scss'],
})
export class ModalPasajeroComponent implements OnInit {
  constructor(private modalController: ModalController) {}

  ngOnInit() {}
}

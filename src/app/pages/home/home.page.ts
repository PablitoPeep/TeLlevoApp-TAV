import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as L from 'leaflet';
import { AuthService } from '../../services/auth.service';

import { ModalChoferComponent } from '../../components/modal-chofer/modal-chofer.component';
import { ModalPasajeroComponent } from '../../components/modal-pasajero/modal-pasajero.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('modal') modal!: HTMLIonModalElement;

  isDriver: boolean = false;

  constructor(
    private modalController: ModalController,
    private authService: AuthService,
    private router:Router   

  ) {}

  ionViewWillLeave() {
    this.modalController.dismiss();
  }

  map: any;

  ngOnInit() {
    this.initializeMap();
    
    // Verifica el rol del usuario al iniciar la página
    this.checkUserRole();
  }

  checkUserRole() {
    // Obtén el objeto de usuario actual desde el servicio de autenticación
    const user = this.authService.getCurrentUserUid();
    
    if (user) {
      // Obtén el perfil del usuario y verifica su propiedad "isDriver"
      this.authService.getUserProfile(user.uid).then(profile => {
        this.isDriver = profile?.isDriver || false;
      });
    }
  }
  
  

  initializeMap() {
    // Configura el mapa con coordenadas centrales y nivel de zoom
    this.map = L.map('map').setView([51.505, -0.09], 13);

    // Añade el mapa de OpenStreetMap como capa base
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    // Añade un marcador en una ubicación específica
    L.marker([51.5, -0.09], {
      icon: L.icon({
        iconUrl: 'assets/img/marker-icon.png',
        shadowUrl: 'assets/img/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize: [41, 41],
      })
    }).addTo(this.map);
  }

  openDriverModal() {
    // Abre el modal de chofer
    const modal = this.modalController.create({
      component: ModalChoferComponent, // Reemplaza "TuModalDeChoferComponent" con el nombre real de tu componente de modal de chofer
      componentProps: { /* Puedes pasar propiedades si es necesario */ }
    });
    modal.then(m => m.present());
  }

  openPassengerModal() {
    // Abre el modal de pasajero
    const modal = this.modalController.create({
      component: ModalPasajeroComponent, // Reemplaza "TuModalDePasajeroComponent" con el nombre real de tu componente de modal de pasajero
      componentProps: { /* Puedes pasar propiedades si es necesario */ }
    });
    modal.then(m => m.present());
  }


  irViaje() {
    this.router.navigate(['/viajes']);
  }
}

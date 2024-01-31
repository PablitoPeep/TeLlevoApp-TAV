import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-map-common',
  templateUrl: './map-common.component.html',
  styleUrls: ['./map-common.component.scss'],
})
export class MapCommonComponent implements OnInit {
  MapCommonComponent: any;
  map: mapboxgl.Map | undefined;

  constructor() { }

  ngOnInit(): void {
    (mapboxgl as typeof mapboxgl).accessToken = 'pk.eyJ1IjoicGEtY2FzdGFuZWRhIiwiYSI6ImNsczE5MmY4dzA5YTQybm1rY3Zia2M5ajMifQ.Ogmd-Yye5ZED6oZwBnXOoA';
    const map = new mapboxgl.Map({
      container: 'map', // ID contenedor
      style: 'mapbox://styles/mapbox/streets-v12', // Estilo de URL
      center: [-70.57862346036994, -33.59815933485809], // Posición inicial (DUOC UC: Sede Puente Alto)
      zoom: 16 // Zoom inicial 
    });

    // Agregar controles de zoom y rotación al mapa
    if (this.map) {
      this.map.addControl(new mapboxgl.NavigationControl());
    }
}}

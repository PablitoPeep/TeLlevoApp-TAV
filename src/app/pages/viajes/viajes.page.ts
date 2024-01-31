import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Iviajes } from 'src/app/interfaces/iviajes';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.page.html',
  styleUrls: ['./viajes.page.scss'],
})
export class ViajesPage implements OnInit {

  listaViajes!: Iviajes[];

  constructor(
    private fireService:FirestoreService,
    private router:Router
  ) { }

  ngOnInit() {
    this.listar();
  }

  ionViewWillEnter() {
    this.listar();
  }

  listar() {
    this.fireService.getCollection("Viajes").subscribe((aux) => {
      this.listaViajes = aux;
    })
  }

  addViaje() {
    this.router.navigate(['/viajes/add']);
  }

}
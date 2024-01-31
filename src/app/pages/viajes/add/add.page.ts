import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Iviaje } from 'src/app/interfaces/iviaje';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  viaje: Iviaje = {
    direccion: '',
    hora: '',
    cupos: ''
  }

  constructor(
    private fireService:FirestoreService,
    private router:Router,
    private toast:ToastController    
    ) { }

  ngOnInit() {
  }

  async mensajeToast(msj:string) {
    const mensaje = await this.toast.create({
      message: msj,
      duration: 2000,
      position: 'bottom'
    });
    mensaje.present();
  }

  addViaje(){
    this.fireService.createDocument('Viajes', this.viaje);
    this.mensajeToast("Viaje agregado correctamente");
    this.router.navigate(['viajes']);
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, IonModal } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirestoreService } from '../../services/firestore.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-chofer',
  templateUrl: './modal-chofer.component.html',
  styleUrls: ['./modal-chofer.component.scss'],
})
export class ModalChoferComponent implements OnInit {
  @ViewChild('modal') modal!: IonModal;
  @ViewChild('modalTemplate') modalTemplate!: IonModal;

  viajeForm!: FormGroup;
  viajes: any[] = [];

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder ,
    private firestoreService: FirestoreService,
    private router:Router
  ) {}

  ngOnInit() {


    this.viajeForm = this.formBuilder.group({
      nombreViaje: ['', [Validators.required, Validators.minLength(4)]],
      latitudInicio: [null, Validators.required],
      longitudInicio: [null, Validators.required],
      latitudFinal: [null, Validators.required],
      longitudFinal: [null, Validators.required],
      localizacionInicio: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(150)]],
      localizacionFinal: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(150)]],
      tarifa: [null, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      tiempoEstimado: ['', Validators.required],
      estado: [true, Validators.required],
      asientosd: ['', [Validators.required, Validators.pattern(/^[0-12]*$/)]],
    });
  }

  async abrirModalCrearViaje() {
    await this.modalTemplate.present();
  }

  irAdd() {
    this.router.navigate(['viajes/add/']);
  }

  cerrarModalCrearViaje() {
    this.modalTemplate.dismiss();
  }

  guardarViaje() {
    // Check if the form is valid before saving
    if (this.viajeForm.valid) {
      const estadoSeleccionado = this.viajeForm.value.estado;

      const viaje = {
        nombre: this.viajeForm.value.nombreViaje,
        inicio: this.viajeForm.value.localizacionInicio,
        destino: this.viajeForm.value.localizacionFinal,
        tarifa: this.viajeForm.value.tarifa,
        tiempo: this.viajeForm.value.tiempoEstimado,
        estado: estadoSeleccionado === 'disponible' ? 'Disponible' : 'No disponible',
        asientos: this.viajeForm.value.asientosd, latitudInicio: this.viajeForm.value.latitudInicio,
        longitudInicio: this.viajeForm.value.longitudInicio,
        latitudFinal: this.viajeForm.value.latitudFinal,
        longitudFinal: this.viajeForm.value.longitudFinal,
        // Other form values...
      };

      this.firestoreService.guardarViaje(viaje)
        .then(() => {
          console.log('Viaje guardado exitosamente en Firestore');
          this.modalTemplate.dismiss();
        })
        .catch((error: any) => {
          console.error('Error al guardar el viaje en Firestore:', error);
        });
    } else {
      // Handle the case where the form is not valid
      console.error('Form is not valid');
    }
  }

  obtenerViajes() {
    this.firestoreService.obtenerViajes().subscribe(
      (viajes) => {
        this.viajes = viajes;
      },
      (error) => {
        console.error('Error al obtener los viajes:', error);
      }
    );
  }

}

  // Agrega funciones necesarias, por ejemplo, para cerrar el modal

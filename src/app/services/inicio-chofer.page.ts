import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { NavController, IonModal } from '@ionic/angular';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-inicio-chofer',
  templateUrl: './inicio-chofer.page.html',
  styleUrls: ['./inicio-chofer.page.scss'],
})
export class InicioChoferPage implements OnInit, AfterViewInit {
  @ViewChild('modal') modal: IonModal;
  @ViewChild('modalTemplate') modalTemplate: IonModal;
  @ViewChild('map') mapElement: ElementRef;

  viajeForm: FormGroup;
  viajes: any[] = [];
  mapch: L.Map;

  constructor(
    private navCtrl: NavController,
    private firestoreService: FirestoreService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    
    // Inicializar el FormGroup con validadores
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

  ngAfterViewInit(): void {
    setTimeout(() => {
      // Usar un retraso para asegurar que el elemento del mapa esté completamente inicializado
      if (this.mapElement && this.mapElement.nativeElement) {
        const mapContainer = this.mapElement.nativeElement;
        // Inicializar el mapa
        
        this.mapch = L.map(mapContainer).setView([51.505, -0.09], 13);
        this.setupMap(this.mapch);
        this.addRoutingControl(this.mapch);
        this.obtenerViajes();

      } else {
        console.error('Map element not available in ngAfterViewInit');
      }
    }, 0);
  }



  private setupMap(mapch: L.Map) {
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapch);
  }

  private addRoutingControl(mapch: L.Map) {
    this.viajes.forEach((viaje) => {
      L.Routing.control({
        waypoints: [
          L.latLng(viaje.latitudInicio, viaje.longitudInicio),
          L.latLng(viaje.latitudFinal, viaje.longitudFinal)
        ]
      }).addTo(mapch);
    });
  }

  async perfil() {
    await this.modal.dismiss();
    this.navCtrl.navigateForward('/perfil');
  }

  async configuraciones() {
    await this.modal.dismiss();
    this.navCtrl.navigateForward('/configuraciones');
  }

  async abrirModalCrearViaje() {
    await this.modalTemplate.present();
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
        asientos: this.viajeForm.value.asientosd,
        latitudInicio: this.viajeForm.value.latitudInicio,
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

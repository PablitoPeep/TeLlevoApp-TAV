// edit-profile-modal.component.ts

import { Component, Input } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-profile-modal',
  template: `
    <!-- Contenido del modal de edición, con campos editables y botones de guardar/cancelar -->
    <ion-content>
      <ion-list mode="ios">
        <ion-list-header> Información Personal </ion-list-header>

        <ion-item lines="full">
          <ion-label slot="start" class="title">
            <ion-icon name="at-outline"></ion-icon>
            Usuario
          </ion-label>
          <ion-label
            slot="end"
            class="ion-text-wrap userInfo"
            style="color: black"
            >{{ userProfile?.username }}</ion-label
          >
        </ion-item>
        <ion-item lines="full">
          <ion-label slot="start" class="title">
            <ion-icon name="person-outline"></ion-icon>
            Nombre
          </ion-label>
          <ion-label slot="end" class="userInfo">{{
            userProfile?.name
          }}</ion-label>
        </ion-item>

        <ion-item lines="full">
          <ion-label slot="start" class="title">
            <ion-icon name="person-outline"></ion-icon>
            Apellido
          </ion-label>
          <ion-label slot="end" class="userInfo">{{
            userProfile?.lastName
          }}</ion-label>
        </ion-item>

        <ion-item lines="full">
          <ion-label slot="start" class="title">
            <ion-icon name="mail-outline"></ion-icon>
            Email
          </ion-label>
          <ion-label slot="end" class="ion-text-wrap userInfo">{{
            userProfile?.email
          }}</ion-label>
        </ion-item>

        <ion-item lines="full">
          <ion-label slot="start" class="title">
            <ion-icon name="call-outline"></ion-icon>
            Telefono
          </ion-label>
          <ion-label slot="end" class="ion-text-wrap userInfo">{{
            userProfile?.phone
          }}</ion-label>
        </ion-item>
      </ion-list>

      <!-- Si el Usuario es Chofer -->
      <div class="esChofer" *ngIf="userProfile.isDriver">
        <ion-list mode="ios">
          <ion-list-header> Información de Chofer </ion-list-header>
          <ng-container *ngIf="userProfile?.isDriver">
            <!-- Mostrar información de chofer -->
            <ion-item lines="full">
              <ion-label slot="start" class="title">Vehículo</ion-label>
              <ion-label slot="end" class="ion-text-wrap userInfo">{{
                userProfile?.vehiculo
              }}</ion-label>
            </ion-item>
            <ion-item lines="full">
              <ion-label slot="start" class="title">Marca</ion-label>
              <ion-label slot="end" class="ion-text-wrap userInfo">{{
                userProfile?.carBrand
              }}</ion-label>
            </ion-item>
            <ion-item lines="full">
              <ion-label slot="start" class="title">Modelo</ion-label>
              <ion-label slot="end" class="ion-text-wrap userInfo">{{
                userProfile?.carModel
              }}</ion-label>
            </ion-item>
          </ng-container>
        </ion-list>
      </div>

      <!-- Botones de guardar y cancelar -->
      <div class="action-buttons ion-padding">
        <ion-button
          class="login-button"
          mode="ios"
          size="large"
          fill="outline "
          (click)="saveChanges()"
        >
          Guardar Cambios
        </ion-button>
        <ion-button
          class="signup-button"
          size="large"
          fill="outline"
          mode="ios"
          (click)="closeModal()"
        >
          Cancelar
        </ion-button>
      </div>
    </ion-content>
  `,
  styles: [''],
})
export class EditProfileModalComponent {
  @Input() userProfile: any;

  constructor(private modalController: ModalController) {}

  saveChanges() {
    // Puedes realizar validaciones u otras operaciones necesarias antes de cerrar el modal
    this.modalController.dismiss(this.userProfile);
  }

  closeModal() {
    this.modalController.dismiss();
  }
}

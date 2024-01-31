import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AlertController, IonModal } from '@ionic/angular';
import { Router } from '@angular/router';
import { EditProfileModalComponent } from '../../components/edit-profile-modal-component/edit-profile-modal-component.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage {
  userProfile: any = {};
  handlerMessage = '';

  constructor(
    private authService: AuthService,
    private alertCtrl: AlertController,
    private router: Router,
    private modalController: ModalController
  ) {}

  ionViewDidEnter() {
    this.loadUserProfile();
  }

  async loadUserProfile() {
    try {
      const uid = this.authService.getCurrentUserUid();
      if (uid) {
        const { exists, data } = await this.authService.getUserProfile(uid);
        if (exists) {
          this.userProfile = data;
        } else {
          console.error('Documento no encontrado para el usuario con UID:', uid);
        }
      }
    } catch (error) {
      console.error('Error cargando el perfil del usuario:', error);
    }
  }

  async openEditProfileModal() {
    const modal = await this.modalController.create({
      component: EditProfileModalComponent,
      componentProps: { userProfile: this.userProfile },
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data) {
      // Actualizar el perfil después de la edición
      this.userProfile = data;
      this.updateProfile();
    }
  }

  updateProfile() {
    const uid = this.authService.getCurrentUserUid();
    if (uid) {
      this.authService.updateUserProfile({ uid, ...this.userProfile });
    }
  }

  async logout() {
    const alert = await this.alertCtrl.create({
      header: 'Cerrar sesión',
      message: '¿Estás segura/o de querer cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.handlerMessage = 'Cerrar Sesión Cancelado';
          },
        },
        {
          text: 'Estoy segura/o',
          role: 'confirm',
          handler: async () => {
            this.router.navigateByUrl('/', { replaceUrl: true });
          },
        },
      ],
      mode: 'ios',
    });
    await alert.present();
  }
}

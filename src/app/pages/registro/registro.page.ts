// registro.page.ts
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  userDetails = {
    email: '',
    password: '',
    isDriver: false,
    name: '',
    lastName: '',
    username: '',
    phone: '',
    carBrand: '',
    carModel: '',
    vehiculo:'',
  };

  constructor(private authService: AuthService) {}

  async register() {
    try {
      const result = await this.authService.register(this.userDetails);
      if (result && result.user) {
        await this.authService.createUserProfile(result.user.uid, {
          email: this.userDetails.email,
          isDriver: this.userDetails.isDriver,
          name: this.userDetails.name,
          lastName: this.userDetails.lastName,
          username: this.userDetails.username,
          phone: this.userDetails.phone,
          carBrand: this.userDetails.carBrand,
          carModel: this.userDetails.carModel,
          vehiculo: this.userDetails.vehiculo,
        });
        // Redirige a la página principal o la que corresponda
      }
    } catch (error) {
      console.error(error);
      // Maneja errores
    }
  }
}

import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router:Router) {}

  async login() {
    try {
      const result = await this.authService.login(this.email, this.password);
      if (result && result.user) {
        // Obtener el perfil del usuario
        const userProfile = await this.authService.getUserProfile(result.user.uid);
  
        if (userProfile.exists) {
          // Acción adicional basada en el tipo de usuario
          if (userProfile.data.isDriver) {
            console.log('El usuario es un chofer.');
            // Haz algo específico para choferes
          } else {
            console.log('El usuario es un pasajero.');
            // Haz algo específico para pasajeros
          }
  
          // Redirige a la página principal o la que corresponda después del inicio de sesión
          this.navigateToHomePage();
        } else {
          // Si no se encuentra el perfil, manejar el escenario de usuario sin perfil
          console.log('Perfil de usuario no encontrado.');
          // Puedes mostrar un mensaje de error, redirigir a otra página, etc.
        }
      }
    } catch (error) {
      console.error(error);
      // Manejar errores
    }
  }
  
  navigateToHomePage() {
    // Agregar la lógica de validación antes de redirigir a la página principal
    // Por ejemplo, verificar si los campos obligatorios están llenos, etc.
    if (this.validateFields()) {
      // Redirigir solo si la validación es exitosa
      this.router.navigate(['/home']);
    } else {
      // Puedes mostrar un mensaje de error, deshabilitar el botón, etc.
      console.log('Campos inválidos o vacíos.');
    }
  }
  
  validateFields(): boolean {
    // Agregar lógica de validación según tus requisitos
    // Por ejemplo, verificar si los campos de email y contraseña están llenos
    return !!this.email && !!this.password;
  }
  
}

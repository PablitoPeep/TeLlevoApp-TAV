import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: any;
  isDriver!: boolean;

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {
    this.afAuth.authState.subscribe((user) => {
      this.user = user;
    });
  }

  async register(userDetails: {
    email: string;
    password: string;
    isDriver: boolean; // Nueva propiedad para indicar si el usuario es un chofer
    name: string;
    lastName: string;
    username: string;
    phone: string;
    carBrand: string;
    carModel: string;
    vehiculo: string;
  }) {
    const result = await this.afAuth.createUserWithEmailAndPassword(
      userDetails.email,
      userDetails.password
    );

    // Almacena la información de chofer/pasajero en la propiedad isDriver del servicio
    this.isDriver = userDetails.isDriver;

    return result;
  }

  async login(email: string, password: string): Promise<any> {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(email, password);
      if (result && result.user) {
        // Obtener información del usuario directamente desde la base de datos
        const userProfile = await this.getUserProfile(result.user.uid);

        if (userProfile) {
          // Ahora puedes acceder a la información del usuario, por ejemplo, userProfile.isDriver
          this.user.isDriver = userProfile.isDriver;
          if (userProfile.isDriver) {
            console.log('El usuario es un chofer.');
            // Redirige a la página específica para chofer
          } else {
            console.log('El usuario es un pasajero.');
            // Redirige a la página principal para pasajero
          }
        }
      }
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  logout(): Promise<any> {
    return this.afAuth.signOut();
  }

  async createUserProfile(
    uid: string,
    userDetails: {
      email: string;
      isDriver: boolean;
      name: string;
      lastName: string;
      username: string;
      phone: string;
      carBrand: string;
      carModel: string;
      vehiculo: string;
    }
  ) {
    return this.firestore.collection('users').doc(uid).set({
      email: userDetails.email,
      isDriver: userDetails.isDriver,
      name: userDetails.name,
      lastName: userDetails.lastName,
      username: userDetails.username,
      phone: userDetails.phone,
      carBrand: userDetails.carBrand,
      carModel: userDetails.carModel,
      vehiculo: userDetails.vehiculo,
    });
  }

  getCurrentUserUid(): { uid: string } | null {
    return this.user ? { uid: this.user.uid } : null;
  }

  getUserProfile(uid: string | { uid: string }): Promise<any> {
    const userId = typeof uid === 'string' ? uid : uid.uid;
    return this.firestore
      .collection('users')
      .doc(userId)
      .get()
      .toPromise()
      .then((doc) => {
        if (doc?.exists) {
          return { exists: true, data: doc.data(), uid: userId };
        } else {
          return { exists: false, data: null, uid: userId };
        }
      });
  }

  updateUserProfile(userData: {
    uid: string;
    [key: string]: any;
  }): Promise<void> {
    const { uid, ...data } = userData;
    return this.firestore.collection('users').doc(uid).update(data);
  }
}

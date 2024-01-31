import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Iviaje } from '../interfaces/iviaje';
import { Iviajes } from '../interfaces/iviajes';
import { Ides } from '../interfaces/ides';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private firestore: AngularFirestore) {}


  getCollection(collectionName:string){
    return this.firestore.collection<Iviaje>(collectionName).valueChanges({ idField: 'id'});
  }

  guardarViajes(collectionName:string, data:Iviaje){
    return this.firestore.collection<Iviaje>(collectionName).add(data);
  }

  createDocument(collectionName:string, data:Iviaje){
    return this.firestore.collection<Iviaje>(collectionName).add(data);
  }

  getViajeById(collectionName:string, documentId:string) {
    return this.firestore.collection<Iviajes>(collectionName).doc(documentId).valueChanges();
  }

  getDesById(collectionName:string, documentId:string) {
    return this.firestore.collection<Ides>(collectionName).doc(documentId).valueChanges();
  }

  deleteDocument(collectionName:string, documentId:string) {
    return this.firestore.collection<Iviajes>(collectionName).doc(documentId).delete();
  }









  guardarViaje(viaje: any): Promise<any> {
    return this.firestore.collection('viajes').add(viaje);
  }

  obtenerViajes(): Observable<any[]> {
    return this.firestore.collection('viajes').valueChanges({ idField: 'id' });
  }

  guardarUser(user: any): Promise<any> {
    return this.firestore.collection('users').add(user);
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ides } from 'src/app/interfaces/ides';
import { Iviajes } from 'src/app/interfaces/iviajes';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  viaje!: Iviajes | undefined;
  listaDes! : Ides[];

  constructor(
    private fire:FirestoreService,
    private router:Router,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit() {
    const auxID = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(auxID);
  }

  ionViewWillEnter() {
    this.getViaje(this.getId());
  }

  getId() {
    let url = this.router.url 
    let aux = url.split("/",4)
    let id = aux[3]
    return id
  }

  getViaje(id: string) {
    const auxID = this.activatedRoute.snapshot.paramMap.get('id');
    if (auxID) {
      this.fire.getViajeById('Viajes',auxID).subscribe((viaje) => {
        console.log(viaje);
        this.viaje = viaje || {} as Iviajes;
        if (this.viaje.hora) {
          this.fire.getDesById('Hora',this.viaje.hora).subscribe((hora) => {
            if (hora) {
              this.listaDes = [hora];
              console.log(this.listaDes);
            }
          })
        }
      });
    }
  }

  eliminar() {
    const auxID = this.activatedRoute.snapshot.paramMap.get('id');
    if (auxID) {
      this.fire.deleteDocument('Viajes',auxID);
      this.router.navigate(['/viajes']);
    }
  }
}
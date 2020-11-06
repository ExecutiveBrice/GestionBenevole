
import { Component, OnInit } from '@angular/core';
import { CreneauService,EvenementService, TransmissionService } from '../../services';
import { DomSanitizer } from '@angular/platform-browser';
import { Creneau, Evenement } from '../../models';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-gestionMajCreneaux',
  templateUrl: './gestionMajCreneaux.component.html',
  styleUrls: ['./gestionMajCreneaux.component.css']
})

export class GestionMajCreneauxComponent implements OnInit {
  creneaux: Creneau[];
  newCreneau: Creneau = new Creneau();
  choix: string;
  organumber:number;

  constructor(
    public route: ActivatedRoute,
    public evenementService: EvenementService,
    public transmissionService: TransmissionService,
    public router: Router,
    public creneauService: CreneauService,
    public sanitizer: DomSanitizer) {

  }

  ngOnInit() {
    this.organumber = parseInt(this.route.snapshot.paramMap.get('id'));

    console.log(this.organumber)
    if (!this.organumber || isNaN(this.organumber) || this.organumber < 1) {
      this.router.navigate(['/error']);
    }

    this.creneaux = [];

    this.choix = "";
    this.getAll();
    this.getEvenement();


  }


  getEvenement() {
    this.evenementService.getById(this.organumber).subscribe(data => {
      console.log(data);
      data.eventName = "Gestion des Créneaux - " + data.eventName
      this.transmissionService.dataTransmission(data);
  }, err => {
      console.log(err);
      this.router.navigate(['error']);
  })
}

  getAll(): void {
    console.log("getAll")
    this.creneauService.getAll(this.organumber).subscribe(data => {
      console.log(data)

      this.creneaux = data;
    },
      error => {
        console.log('😢 Oh no!', error);
      });
  }


  update(creneau): void {
    console.log("update")
    this.creneauService.update(creneau).subscribe(data => {
      console.log(data)

      this.getAll();
    },
      error => {
        console.log('😢 Oh no!', error);
      });
  }

  ajout(creneau:Creneau): void {
    console.log("ajout")

    creneau.evenement = new Evenement();
    creneau.evenement.id = this.organumber
    creneau.chevauchement = []
    this.creneauService.ajout(creneau).subscribe(data => {
      console.log(data)
     
      this.getAll();
    },
      error => {
        console.log('😢 Oh no!', error);
      });
  }



  choisir(creneau:Creneau, creneauChevauche:Creneau): void {
    console.log("choisir")
    let existe = false;
    creneau.chevauchement.forEach(element => {
        if(creneauChevauche.id == element){
        existe = true;
      }
    });

    if(existe){
      creneau.chevauchement.splice( creneau.chevauchement.indexOf(creneauChevauche.id), 1 );
      console.log("retrait")
    }else{
      creneau.chevauchement.push(creneauChevauche.id)
      console.log("ajout")
    }
  
    this.update(creneau)
  }

  delete(creneau): void {
    console.log("delete")
    this.creneauService.delete(creneau).subscribe(data => {
      console.log(data)

      this.getAll();
    },
      error => {
        console.log('😢 Oh no!', error);
      });
  }
}
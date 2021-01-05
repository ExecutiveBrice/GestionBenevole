
import { Component, OnInit } from '@angular/core';
import { ValidationService, CreneauService,EvenementService, TransmissionService } from '../../services';
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
    public validationService: ValidationService,
    public sanitizer: DomSanitizer) {

  }

  ngOnInit() {
    this.organumber = parseInt(this.route.snapshot.paramMap.get('id'));
    this.validationService.testGestion(this.organumber)

    this.creneaux = [];

    this.choix = "";
    this.getAll();

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

    creneau.chevauchement = []
    this.creneauService.ajout(creneau, this.organumber).subscribe(data => {
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
      creneauChevauche.chevauchement.splice( creneauChevauche.chevauchement.indexOf(creneau.id), 1 );
      console.log("retrait")
    }else{
      creneau.chevauchement.push(creneauChevauche.id)
      creneauChevauche.chevauchement.push(creneau.id)
      console.log("ajout")
    }
  
    this.update(creneau)
    this.update(creneauChevauche)
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
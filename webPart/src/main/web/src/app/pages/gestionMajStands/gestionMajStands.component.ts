
import { Component, OnInit } from '@angular/core';
import { ValidationService, CroisementService, StandService, CreneauService, EvenementService, TransmissionService } from '../../services';
import { DomSanitizer } from '@angular/platform-browser';
import { Croisement, Stand, Creneau, Evenement } from '../../models';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-gestionMajStands',
  templateUrl: './gestionMajStands.component.html',
  styleUrls: ['./gestionMajStands.component.css']
})

export class GestionMajStandsComponent implements OnInit {
  stands: Stand[];
  creneaux: Creneau[] = [];
  newStand: Stand = new Stand();
  choix: string;
  ajouterCroisement: number = 0;
  organumber: number;
  modifTypeStand: number = 0;


  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public evenementService: EvenementService,
    public transmissionService: TransmissionService,
    public creneauService: CreneauService,
    public croisementService: CroisementService,
    public standService: StandService,
    public validationService: ValidationService,
    public sanitizer: DomSanitizer) {

  }

  ngOnInit() {
    this.organumber = parseInt(this.route.snapshot.paramMap.get('id'));
    this.validationService.testGestion(this.organumber)

    this.choix = "";
    this.getAllStands();
    this.getAllCreneaux();
  }



  existInCroisements(croisements: Croisement[], id: number): Croisement {

    var croi = null;
    if(croisements != null && croisements.length > 0){
    croisements.forEach(croisement => {
      if (croisement.creneau.id == id) {
        croi = croisement;
      }
    });
  }
    return croi;
  }

  getAllStands(): void {
    console.log("getAllStands")
    this.standService.getAll(this.organumber).subscribe(stands => {
      console.log(stands)
      if(stands != null){
      this.stands = stands
      
      stands.forEach(stand => {
        stand.croisements = []
        this.croisementService.getByStand(stand.id).subscribe(croisements => {
          console.log(croisements)
          stand.croisements = croisements
        },
          error => {
            console.log('😢 Oh no!', error);
          });

      });
    }else{
      this.stands = []
    }

    },
      error => {
        console.log('😢 Oh no!', error);
      });
    console.log(this.stands)
  }


  getAllCreneaux(): void {
    console.log("getAllCreneaux")
    this.creneauService.getAll(this.organumber).subscribe(creneaux => {
      console.log(creneaux)

      this.creneaux = creneaux;
    },
      error => {
        console.log('😢 Oh no!', error);
      });
  }

  update(stand): void {
    console.log(stand)
    this.standService.update(stand).subscribe(data => {
      console.log(data)
      this.getAllStands()
    },
      error => {
        console.log('😢 Oh no!', error);
      });
  }




  updateCroisement(croisement: Croisement, stand: Stand): void {
    console.log(croisement)

    croisement.stand = stand
    this.croisementService.update(croisement).subscribe(data => {
      console.log(data)
      this.getAllStands()
    },
      error => {
        console.log('😢 Oh no!', error);
      });
  }




  ajoutCroisement(stand: Stand, creneau: Creneau): void {
    console.log("ajoutCroisement")

    console.log(stand)
    console.log(creneau)

    let croisement = new Croisement()
    croisement.stand = new Stand();
    croisement.stand.id = stand.id
    croisement.creneau = creneau
    croisement.besoin = false;
    croisement.selected = false;
    croisement.limite = 0;


    console.log(croisement)
    this.croisementService.ajout(croisement).subscribe(data => {
      console.log(data)
      this.getAllStands()
    },
      error => {
        console.log('😢 Oh no!', error);
      });
  }


  deleteCroisement(croisement: Croisement): void {
    console.log("deleteCroisement")

    this.croisementService.delete(croisement).subscribe(data => {
      console.log(data)
      this.getAllStands()
    },
      error => {
        console.log('😢 Oh no!', error);
      });
  }


  ajout(stand: Stand): void {
    console.log("ajout")

    stand.type = 0
    this.standService.ajout(stand, this.organumber).subscribe(data => {
      console.log(data)
      this.getAllStands()
    },
      error => {
        console.log('😢 Oh no!', error);
      });
  }


  delete(stand): void {
    console.log("delete")
    this.standService.delete(stand).subscribe(data => {
      console.log(data)
      this.getAllStands()
    },
      error => {
        console.log('😢 Oh no!', error);
      });
  }


}

import { Component, OnInit } from '@angular/core';
import { CroisementService, StandService, CreneauService, EvenementService, TransmissionService } from '../../services';
import { DomSanitizer } from '@angular/platform-browser';
import { Croisement, Stand, Creneau, Evenement } from '../../models';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-gestionMajStands',
  templateUrl: './gestionMajStands.component.html',
  styleUrls: ['./gestionMajStands.component.css']
})

export class GestionMajStandsComponent implements OnInit {
  stands: Stand[];
  creneaux: Creneau[];
  newStand: Stand = new Stand();
  choix: string;
  ajouterCroisement: number = 0;
  organumber:number;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public evenementService: EvenementService,
    public transmissionService: TransmissionService,
    public creneauService: CreneauService,
    public croisementService: CroisementService,
    public standService: StandService,
    public sanitizer: DomSanitizer) {

  }

  ngOnInit() {
    this.organumber = parseInt(this.route.snapshot.paramMap.get('id'));

    console.log(this.organumber)
    if (!this.organumber || isNaN(this.organumber) || this.organumber < 1) {
      this.router.navigate(['/error']);
    }

    this.stands = [];
    this.creneaux = [];
    this.choix = "";
    this.getAllStands();
    this.getAllCreneaux();
    this.getEvenement();


  }


  getEvenement() {
    this.evenementService.getById(this.organumber).subscribe(data => {
      console.log(data);
      data.eventName = "Gestion des Stands - " + data.eventName
      this.transmissionService.dataTransmission(data);
  }, err => {
      console.log(err);
      this.router.navigate(['error']);
  })
}

  existInCroisements(croisements: Croisement[], id: number): boolean {
    let existe = false;
    croisements.forEach(croisement => {
      if (croisement.creneau.id == id) {
        existe = true;
      }
    });

    return existe;
  }

  getAllStands(): void {
    console.log("find")
    this.standService.getAll(this.organumber).subscribe(data => {
      console.log(data)
      this.stands = data;
    },
      error => {
        console.log('😢 Oh no!', error);
      });
  }

  getAllCreneaux(): void {
    console.log("getAllCreneaux")
    this.creneauService.getAll(this.organumber).subscribe(data => {
      console.log(data)

      this.creneaux = data;
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


  

  updateCroisement(croisement:Croisement): void {
    console.log(croisement)
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
    let croisement = new Croisement()
    croisement.stand = stand
    croisement.creneau = creneau
    croisement.besoin = false;
    croisement.selected = false;
    croisement.limite = 0;
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
    stand.croisements = []

    stand.evenement = new Evenement();
    stand.evenement.id = this.organumber

    stand.etat = 0
    this.standService.ajout(stand).subscribe(data => {
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
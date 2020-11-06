
import { Component, OnInit } from '@angular/core';
import { BenevoleService, EvenementService, TransmissionService } from '../../services';
import { CroisementService, StandService, MailService, ConfigService } from '../../services';
import { DomSanitizer } from '@angular/platform-browser';
import { Benevole, Croisement, Stand, Email, Evenement } from '../../models';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})

export class InscriptionComponent implements OnInit {

  organumber: number;
  new: boolean;
  validation: boolean;
  nouveau: boolean;
  exist: boolean;
  choix: String;
  creneaux: Croisement[];
  stands: Stand[];
  chevauchement: boolean;
  chorale: boolean;
  besoins: Croisement[];
  preparatifs: Croisement[];
  croisements: Croisement[];
  benevole: Benevole;
  email: Email = {
    to: "",
    subject: "",
    text: ""
  }
  plein: boolean;
  emailText1: string;
  emailText2: string;
  choixStand: string;


  constructor(public benevoleService: BenevoleService,
    public evenementService: EvenementService,
    public route: ActivatedRoute,
    public transmissionService: TransmissionService,
    public router: Router,
    public configService: ConfigService,
    public croisementService: CroisementService,
    public standService: StandService,
    public mailService: MailService,
    public sanitizer: DomSanitizer) {


  }

  ngOnInit() {
    this.organumber = parseInt(this.route.snapshot.paramMap.get('id'));
    console.log(this.organumber)
    if (!this.organumber || isNaN(this.organumber) || this.organumber < 1) {
      this.router.navigate(['/error']);
    }

    
    if (localStorage.getItem('user')) {
      this.benevole = JSON.parse(localStorage.getItem('user'));
    } else {
      this.router.navigate(['/connexion/'+ this.organumber ]);
    }


    this.plein = false;
    this.preparatifs = [];

    this.stands = [];
    this.besoins = [];
    this.creneaux = [];
    this.validation = false;
    this.exist = false;
    this.chevauchement = false;
    this.chorale = false;
    this.getCreneaux();
    this.getStand();
    this.getPreparatifs();

    this.bloquage();
    this.getTexts()

    this.getEvenement();


  }


  getEvenement() {
    this.evenementService.getById(this.organumber).subscribe(data => {
        console.log(data);
        this.transmissionService.dataTransmission(data);
    }, err => {
        console.log(err);
        this.router.navigate(['error']);
    });
}


  bloquage() {
    this.configService.getParam('lock', this.organumber)
      .subscribe(data => {
        console.log("lock");
        console.log(data);
        if (data.value == "true") {
          this.router.navigate(['/404']);
        }
      }, err => {
        console.log(err);
      });
  }


  getCreneaux(): void {
    this.croisementService.getByGroup(1, this.organumber).subscribe(data => {
      this.creneaux = data['croisements']
    },
      error => {
        console.log('😢 Oh no!', error);
      });
  }


  getPreparatifs(): void {
    console.log("getPreparatifs")
    this.croisementService.getByGroup(5, this.organumber).subscribe(data => {
      console.log(data)
      this.preparatifs = data['croisements']
    },
      error => {
        console.log('😢 Oh no!', error);
      });
  }


  updateListe(benevole: Benevole): void {
    console.log("updateListe")
    console.log(benevole)
    this.updateCroisementListe(this.preparatifs)
    this.updateCroisementListe(this.creneaux)
    this.stands.forEach(stand => {
      this.updateCroisementListe(stand.croisements)
    });
    this.getBesoin();
    this.calculChevauchement(benevole)
  }


  getBesoin(): void {
    this.creneaux.forEach(croisement => {
      if (croisement.besoin == true) {
        this.besoins.push(croisement);
      }
    })
    this.stands.forEach(stand => {
      stand.croisements.forEach(croisement => {
        if (croisement.besoin == true) {
          this.besoins.push(croisement);
        }
      })
    });
  }


  getStand(): void {
    this.standService.getAll(this.organumber).subscribe(data => {
      data.forEach(stand => {
        if (stand.etat == 2 || stand.etat == 3) {
          this.croisementService.getByStand(stand.id).subscribe(data => {
            stand.croisements = data
            this.stands.push(stand)
          },
            error => {
              console.log('😢 Oh no!', error);
            });
          console.log("stands")
          console.log(this.stands)
        }
      })
    },
      error => {
        console.log('😢 Oh no!', error);
      });
  }


  updateCroisementListe(croisements: Croisement[]): void {
    console.log("updateCroisementListe")
    console.log(croisements)
    for (let index = 0; index < croisements.length; index++) {
      for (let indexb = 0; indexb < croisements[index].benevoles.length; indexb++) {
        if (croisements[index].benevoles[indexb].id == this.benevole.id) {
          croisements[index].selected = true;
          this.benevole.croisements.push(croisements[index]);
          break;
        } else {
          croisements[index].selected = false;
        }
      }
    }
  }


  addCroisements(benevole: Benevole): void {
    console.log("addCroisements")
    console.log(benevole)
    benevole.croisements.forEach(croisement => {
      croisement.benevoles = []
    });
    benevole.email = benevole.email.toLowerCase();
    this.benevoleService.addCroisements(benevole).subscribe(data => {
      console.log(data)
      this.exist = true;
    },
      error => {
        this.exist = false;
        this.new = false;
        console.log('😢 Oh no!', error);
      });
  }


  choisir(croisement: Croisement): void {
    this.chevauchement = false;
    let added = false;
    for (let index = 0; index < this.benevole.croisements.length; index++) {
      if (croisement.id == this.benevole.croisements[index].id) {
        for (let indexBenevole = 0; indexBenevole < croisement.benevoles.length; indexBenevole++) {
          if (this.benevole.id == croisement.benevoles[indexBenevole].id) {
            croisement.benevoles.splice(indexBenevole, 1);
            console.log("retrait du benevole " + indexBenevole)
          }
        }
        croisement.selected = false;
        this.benevole.croisements.splice(index, 1);
        added = true;
        break;
      }
    }

    if (croisement.benevoles.length < croisement.limite) {
      console.log("croisement.Benevoles.length < croisement.limite")
      this.plein = false;
      if (!added) {
        croisement.selected = true;
        this.benevole.croisements.push(croisement);
        croisement.benevoles.push(this.benevole);
        if (croisement.benevoles.length > croisement.limite) {
          console.log("croisement.Benevoles.length < croisement.limite")
          this.plein = true;
        }
      }
    } else {
      console.log("croisement.Benevoles.length > croisement.limite")
      this.plein = true;
    }
    this.calculChevauchement(this.benevole)

  }


  calculChevauchement(benevole: Benevole) {
    this.chevauchement = false;

    let listePlages = []
    for (let index = 0; index < benevole.croisements.length; index++) {
      if (listePlages.indexOf(benevole.croisements[index].creneau.id) >= 0) {
        this.chevauchement = true;
        break;
      } else {
        listePlages.push(benevole.croisements[index].creneau.id)
        listePlages = listePlages.concat(benevole.croisements[index].creneau.chevauchement)
        console.log(listePlages)
      }
    };
  }


  validate(): void {
    this.validation = true;
    this.addCroisements(this.benevole);
    this.benevoleService.update(this.benevole).subscribe(data => {
      console.log(data)
      this.exist = true;


      this.email.to = this.benevole.email
      this.email.subject = "Validation de participation"
      this.email.text = this.emailText1;
      this.benevole.croisements.sort((a, b) => (a.creneau.ordre > b.creneau.ordre) ? 1 : ((b.creneau.ordre > a.creneau.ordre) ? -1 : 0));
      this.benevole.croisements.forEach(croisement => {
        this.email.text = this.email.text + (croisement.stand.nom == "tous" ? "N'importe quel stand" : croisement.stand.nom) + " - " + croisement.creneau.plage + "<br>"
      });

      if (this.benevole.gateaux) {
        this.email.text = this.email.text + "\nVous avez également proposé d'apporter :<br>"
        this.email.text = this.email.text + this.benevole.gateaux + "<br>"
      }
      this.email.text = this.email.text + this.emailText2;
      this.envoiMail(this.email)
    },
      error => {
        this.exist = false;
        this.new = false;
        console.log('😢 Oh no!', error);
      });
  }


  envoiMail(email: Email) {
    this.mailService.sendMail(email)
      .subscribe(res => {
        console.log("this.api.sendMail");
        console.log(res);
      }, err => {
        console.log(err);
      });
  }


  getTexts() {
    this.configService.getParam("validation1", this.organumber).subscribe(data => {
      console.log(data.value);
      this.emailText1 = data.value;
    }, err => {
      console.log(err);
    });
    this.configService.getParam("validation2", this.organumber).subscribe(data => {
      console.log(data.value);
      this.emailText2 = data.value;
    }, err => {
      console.log(err);
    });
  }


}
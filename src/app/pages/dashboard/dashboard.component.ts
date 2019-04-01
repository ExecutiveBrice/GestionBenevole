
import { Component, OnInit, Input, OnChanges, SimpleChange } from '@angular/core';
import { BenevoleService } from '../../services';
import { CroisementService, StandService, MailService, ConfigService } from '../../services';
import { DomSanitizer } from '@angular/platform-browser';
import { Benevole, Croisement, Stand, Email } from '../../models';
import { Router, ActivatedRoute, NavigationEnd, Event } from '@angular/router';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnChanges {
  new: boolean;
  validation: boolean;
  nouveau: boolean;
  exist: boolean;
  choix: String;
  creneaux: Croisement[];
  stands: Stand[];
  chevauchement: boolean;
  besoins: Croisement[];
  vendredi: Croisement;
  croisements: Croisement[];
  benevole: Benevole;
  email: Email = {
    to: "",
    subject: "",
    text: ""
  }











  constructor(public benevoleService: BenevoleService,
    
    public router: Router,
    public configService:ConfigService,
    public croisementService: CroisementService,
    public standService: StandService,
    public mailService: MailService,
    public sanitizer: DomSanitizer) {


    this.vendredi = new Croisement();
    this.benevole = new Benevole();
    this.stands = [];
    this.besoins = [];
    this.creneaux = [];
    this.validation = false;
    this.exist = false;
    this.chevauchement = false;
    this.nouveau = false;
    this.new = true;
    this.getCreneaux();
    this.getStand();
    this.getVendredi();

    this.bloquage();

  }

  ngOnChanges() {

  }

  bloquage() {
    this.configService.getParam('lock')
      .subscribe(res => {
        console.log("lock");
        console.log(res['param'].value);
        if(res['param'].value == "true"){
          this.router.navigate(['/404']);
        }
      }, err => {
        console.log(err);
      });
  }

  find(): void {
    console.log("find")
    console.log(this.benevole)
    this.benevole.email = this.benevole.email.toLowerCase();
    this.benevoleService.getByMail(this.benevole.email).subscribe(data => {
      console.log("data")
      console.log(data)
      this.exist = true
      this.benevole = data['benevoles'][0];
      this.updateListe(this.benevole)

    },
      error => {
        this.exist = false
        this.new = false;
        console.log('😢 Oh no!', error);
      });
  }


  subscribe(): void {
    console.log("subscribe")
    this.benevole.email = this.benevole.email.toLowerCase();
    this.benevoleService.add(this.benevole).subscribe(data => {
      console.log("data")
      console.log(data)
      this.benevole.id = data['benevole'];
      this.benevole.Croisements = [];
      this.exist = true;
      this.updateListe(this.benevole)
    },
      error => {
        this.exist = false;
        this.new = false;
        console.log('😢 Oh no!', error);
      });
  }


  update(): void {
    console.log("update")
    console.log(this.benevole)
    this.benevole.email = this.benevole.email.toLowerCase();
    this.benevoleService.update(this.benevole).subscribe(data => {
      console.log("data")
      console.log(data)
      this.exist = true;

    },
      error => {
        this.exist = false;
        this.new = false;
        console.log('😢 Oh no!', error);
      });
  }


  error(benevole: Benevole): void {
    this.email.to = "bryce.morel@gmail.com"
    this.email.subject = "Problème d'inscription"
    this.email.text = "Bonjour,\n l'utilisateur " + benevole.email + "n'arrive pas à se connecter"
    this.envoiMail(this.email)
  }


  getCreneaux(): void {
    this.croisementService.getByStand(1).subscribe(data => {
      this.creneaux = data['croisements']
    },
      error => {
        console.log('😢 Oh no!', error);
      });
  }
  getVendredi(): void {
    console.log("getVendredi")
    this.croisementService.getByStand(9).subscribe(data => {
      console.log(data)
      this.vendredi = data['croisements'][0]
    },
      error => {
        console.log('😢 Oh no!', error);
      });
  }


  updateListe(benevole: Benevole): void {
    this.updateCroisementListe(this.creneaux, benevole.Croisements)
    this.stands.forEach(stand => {
      this.updateCroisementListe(stand.croisements, benevole.Croisements)
    });
    this.getBesoin();
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
    this.standService.getAll().subscribe(data => {
      data['stands'].forEach(stand => {
        if (stand.nom != 'tous') {
          this.croisementService.getByStand(stand.id).subscribe(data => {
            stand.croisements = data['croisements']
            this.stands.push(stand)
            console.log("stand")
            console.log(stand)
            console.log("stands")
            console.log(this.stands)
          },
            error => {
              console.log('😢 Oh no!', error);
            });
        }
      })
    },
      error => {
        console.log('😢 Oh no!', error);
      });
  }






  updateCroisementListe(croisements: Croisement[], croisementsbenevole: Croisement[]): void {
    croisements.forEach(croisement => {
      croisementsbenevole.forEach(croisementbenevole => {
        if (croisement.id == croisementbenevole.id) {
          croisement.selected = true;
        } else {
          croisement.selected = false;
        }
      })
    });
  }




  addCroisements(benevole:Benevole): void {
    console.log("addCroisements")
    console.log(this.benevole)
    this.benevole.email = this.benevole.email.toLowerCase();
    this.benevoleService.addCroisements(this.benevole).subscribe(data => {
      console.log("data")
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
    for (let index = 0; index < this.benevole.Croisements.length; index++) {
      if (croisement.id == this.benevole.Croisements[index].id) {
        croisement.selected = false;
        this.benevole.Croisements.splice(index, 1);
        added = true;
        break;
      }
    }

    if (!added) {
      croisement.selected = true;
      this.benevole.Croisements.push(croisement);

    }

    let listePlages = []
    for (let index = 0; index < this.benevole.Croisements.length; index++) {
      if (listePlages.indexOf(this.benevole.Croisements[index].Creneau.plage) >= 0) {
        this.chevauchement = true;
        break;
      } else {
        listePlages.push(this.benevole.Croisements[index].Creneau.plage)
      }
    };
  }


  validate(benevole:Benevole): void {
    this.addCroisements(benevole);
    this.benevoleService.update(benevole).subscribe(data => {
      console.log(data)
      benevole.id = data['benevoles'];
      this.exist = true;

      this.validation = true;
      this.email.to = benevole.email
      this.email.subject = "Validation de participation"
      this.email.text = "Bonjour,\n Votre participation à bien été prise en compte \n";
      benevole.Croisements.forEach(croisement => {
        this.email.text = this.email.text + croisement.Stand.nom + " - " + croisement.Creneau.plage + "\n"
      });
      this.email.text = this.email.text + "Vous pouvez revenir à tout moment pour modifier vos choix en vous connectant à l'aide de votre adresse e-mail."

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


}
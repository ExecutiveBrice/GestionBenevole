
import { Component, OnInit } from '@angular/core';
import { ValidationService, BenevoleService, EvenementService, TransmissionService } from '../../services';
import { CroisementService, StandService, MailService } from '../../services';
import { DomSanitizer } from '@angular/platform-browser';
import { Benevole, Croisement, Stand, Email, Evenement } from '../../models';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})

export class InscriptionComponent implements OnInit {

  organumber: number;
  validation: boolean;
  choix: String;
  sansChoix: Croisement[];
  stands: Stand[];
  chevauchement: boolean;
  besoins: Croisement[];
  preparatifs: Stand[];
  postparatifs: Stand[];
  croisements: Croisement[];
  benevole: Benevole;
  plein: boolean;
  emailText1: string;
  emailText2: string;
  choixStand: string;
  evenement: Evenement;
  subscription = new Subscription()
  params: Map<string, string>
  using_address: string;


  constructor(
    public benevoleService: BenevoleService,
    public evenementService: EvenementService,
    public route: ActivatedRoute,
    public transmissionService: TransmissionService,
    public router: Router,
    public croisementService: CroisementService,
    public standService: StandService,
    public mailService: MailService,
    public validationService: ValidationService,
    public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.params = JSON.parse(localStorage.getItem('allParams'));

    this.organumber = parseInt(this.route.snapshot.paramMap.get('id'));
    this.validationService.testCommun(this.organumber)

    this.subscription = this.transmissionService.dataStream.subscribe(
      data => {
        console.log(data)
        this.evenement = data
        this.using_address = this.params['url'] + "/connexion/" + this.evenement.id
      });

    if (localStorage.getItem('user')) {
      this.benevole = JSON.parse(localStorage.getItem('user'));
      console.log(this.benevole)
      this.actualiseBenevole()
    } else {
      this.router.navigate(['/connexion/' + this.organumber]);
    }

    this.plein = false;

    this.validation = false;
    this.chevauchement = false;


    this.getStand();
  }




  actualiseBenevole(): void {
    this.benevoleService.getByMail(this.benevole.email, this.organumber).subscribe(benevole => {
      console.log(benevole)
      benevole.croisements = []
      this.benevole = benevole;

      this.croisementService.getByBenevole(benevole.id).subscribe(croisements => {
        console.log(croisements)
        if(croisements == null){
          this.benevole.croisements = []
        }else{
          this.benevole.croisements = croisements;
        }
      },
        error => {
          console.log('😢 Oh no!', error);
        });
    },
      error => {
        console.log('😢 Oh no!', error);
      });
  }





  updateListe(benevole: Benevole): void {
    console.log("updateListe")
    console.log(benevole)


    this.postparatifs.forEach(stand => {
      this.updateCroisementListe(stand.croisements)
    });

    this.preparatifs.forEach(stand => {
      this.updateCroisementListe(stand.croisements)
    });

    this.updateCroisementListe(this.sansChoix)
    this.stands.forEach(stand => {
      this.updateCroisementListe(stand.croisements)
    });

    this.calculChevauchement(benevole)
  }



  getStand(): void {
    this.besoins = []
    this.sansChoix = []
    this.preparatifs = []
    this.postparatifs = []
    this.stands = []
    this.standService.getAll(this.organumber).subscribe(stands => {
      console.log(stands)
      stands.forEach(stand => {


        stand.croisements = []
        this.croisementService.getByStand(stand.id).subscribe(croisements => {
          console.log(croisements)

          if (croisements != null) {
            stand.croisements = croisements



            if (stand.type == 2 || stand.type == 3) {


              stand.croisements.forEach(croisement => {
                if (croisement.besoin == true) {

                  this.besoins.push(croisement);
                }
                croisement.stand = stand
              })


              this.stands.push(stand)
              console.log("stands")
              console.log(this.stands)

            } else if (stand.type == 1) {
              stand.croisements.forEach(croisement => {
                if (croisement.besoin == true) {
                  this.besoins.push(croisement);
                }
                croisement.stand = stand
                this.sansChoix.push(croisement)
              })

              console.log("sansChoix")
              console.log(this.sansChoix)

            } else if (stand.type == 5) {
              stand.croisements.forEach(croisement => {
                if (croisement.besoin == true) {
                  this.besoins.push(croisement);
                }
                croisement.stand = stand
                this.preparatifs.push(stand)
              })

              console.log("preparatifs")
              console.log(this.preparatifs)

            } else if (stand.type == 6) {
              stand.croisements.forEach(croisement => {
                if (croisement.besoin == true) {
                  this.besoins.push(croisement);
                }
                croisement.stand = stand
                this.postparatifs.push(stand)
              })

              console.log("postparatifs")
              console.log(this.postparatifs)
            }

          }

        },
          error => {
            console.log('😢 Oh no!', error);
          });






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
    let croisementsList = []
    benevole.croisements.forEach(croisement => {
      croisementsList.push(croisement.id)
    });
    benevole.email = benevole.email.toLowerCase();
    this.benevoleService.addCroisements(benevole.id, croisementsList).subscribe(data => {
      console.log(data)
    },
      error => {
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
      console.log("croisement.benevoles.length < croisement.limite")
      this.plein = false;
      if (!added) {
        croisement.selected = true;
        this.benevole.croisements.push(croisement);
        croisement.benevoles.push(this.benevole);
        if (croisement.benevoles.length > croisement.limite) {
          console.log("croisement.Benevoles.length > croisement.limite")
          this.plein = true;
        }
      }
    } else {
      console.log("! croisement.benevoles.length < croisement.limite")
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


  updateBenevoleAttributes(benevole: Benevole) {

    this.benevoleService.update(benevole).subscribe(data => {
      console.log(data)
    },
      error => {
        console.log('😢 Oh no!', error);
      });
  }

  validate(): void {
    this.validation = true;
    this.addCroisements(this.benevole);
    this.updateBenevoleAttributes(this.benevole);
    var email = new Email();
    email.to = this.benevole.email
    email.subject = "Validation de participation pour l'evenement : "+this.evenement.eventName
    email.text = "Bonjour,<br />"+this.evenement.validation + "<br />";

    console.log(this.benevole.croisements)
    this.benevole.croisements.sort((a, b) => (a.creneau.ordre > b.creneau.ordre) ? 1 : ((b.creneau.ordre > a.creneau.ordre) ? -1 : 0));
    this.benevole.croisements.forEach(croisement => {
      email.text = email.text + (croisement.stand.nom == "tous" ? "N'importe quel stand" : croisement.stand.nom) + " - " + croisement.creneau.plage + "<br />"
    });
    email.text = email.text +"<br />"
    email.text = email.text + this.evenement.retour;
    email.text = email.text +"<br />"
    email.text = email.text + this.evenement.signature;

    email.text = this.completeTemplate(email.text)
    this.envoiMail(email)

  }

  completeTemplate(text: string): string {


    while (text.match("<event_name>")) {
      text = text.replace("<event_name>", this.evenement.eventName)
    }

    while (text.match("<using_address>")) {
      text = text.replace("<using_address>", this.using_address)
    }

    return text
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
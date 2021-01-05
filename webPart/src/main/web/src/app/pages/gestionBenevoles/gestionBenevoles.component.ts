
import { Component, OnInit } from '@angular/core';
import { BenevoleService } from '../../services';
import { ConfigService, ValidationService, TransmissionService, EvenementService, CroisementService, StandService, MailService, ExcelService } from '../../services';
import { DomSanitizer } from '@angular/platform-browser';
import { Benevole, Croisement, Email, Evenement } from '../../models';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-gestionBenevoles',
  templateUrl: './gestionBenevoles.component.html',
  styleUrls: ['./gestionBenevoles.component.css']
})

export class GestionBenevolesComponent implements OnInit {
  organumber: number;
  croisements: Croisement[];
  benevoles: Benevole[];
  choix: string;
  params: Map<string, string>
  evenement: Evenement;
  subscription = new Subscription()


  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public configService: ConfigService,
    public evenementService: EvenementService,
    public transmissionService: TransmissionService,
    public benevoleService: BenevoleService,
    public croisementService: CroisementService,
    public standService: StandService,
    public mailService: MailService,
    public excelService: ExcelService,
    public validationService: ValidationService,
    public sanitizer: DomSanitizer) {

  }

  ngOnInit() {
    this.params = JSON.parse(localStorage.getItem('allParams'));

    this.organumber = parseInt(this.route.snapshot.paramMap.get('id'));
    this.validationService.testGestion(this.organumber)

    this.subscription = this.transmissionService.dataStream.subscribe(
      data => {
        console.log(data)
        this.evenement = data
      });

    this.benevoles = [];
    this.croisements = [];
    this.choix = "";
    this.find();
    this.getCroisement();

  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.benevoles, 'sample');
  }

  find(): void {
    this.benevoleService.getByEvenementId(this.organumber).subscribe(benevoles => {
      console.log(benevoles)
      this.benevoles = benevoles;

      benevoles.forEach(benevole => {
        benevole.croisements = []
        this.croisementService.getByBenevole(benevole.id).subscribe(croisements => {
          console.log(croisements)
          benevole.croisements = croisements
        },
          error => {
            console.log('😢 Oh no!', error);
          });
      });
    },
      error => {
        console.log('😢 Oh no!', error);
      });
  }

  choixBenevole(email: string) {
    if (this.choix != email) {
      this.choix = email
    } else {
      this.choix = null
    }

  }



  choisir(benevole: Benevole, benecroisement: Croisement, croisement: Croisement): void {
    if (benecroisement != null) {
      if (benecroisement.id) {
        for (let index = 0; index < benevole.croisements.length; index++) {
          if (benecroisement.id == benevole.croisements[index].id) {
            benevole.croisements.splice(index, 1);
            break;
          }
        }
      }
    }
    if (benevole.croisements == null) {
      benevole.croisements = []
    }
    if (croisement != null) {
      benevole.croisements.push(croisement);
    }

    this.addCroisements(benevole);
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


  getCroisement(): void {
    this.croisementService.getAll(this.organumber).subscribe(data => {
      console.log(data)
      this.croisements = data
    },
      error => {
        console.log('😢 Oh no!', error);
      });
  }

  send(benevole: Benevole) {
    this.benevoleService.update(benevole).subscribe(data => {
      console.log(data)
      var email = new Email();
      email.to = benevole.email


      email.subject = "Réponse au commentaire de l'évenement " + this.evenement.eventName;
      email.text = "Vous nous aviez communiqué que :<br>";

      email.text = email.text + benevole.commentaire + "<br>"

      email.text = email.text + "<br>Notre réponse :<br>"

      email.text = email.text + benevole.reponse + "<br>"

      email.text = email.text + "<br>Vous pourrez bien entendu retrouver cette réponse sur <a href=" + this.params['url'] + "/connexion/" + this.evenement.id + ">le site d'inscription</a><br>Cordialement,<br>L'équipe d'animation"
      this.envoiMail(email)
    },
      error => {
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
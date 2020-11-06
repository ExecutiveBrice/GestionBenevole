
import { Component, OnInit } from '@angular/core';
import { BenevoleService } from '../../services';
import { TransmissionService, EvenementService, CroisementService, StandService, MailService, ExcelService } from '../../services';
import { DomSanitizer } from '@angular/platform-browser';
import { Benevole, Croisement, Email } from '../../models';
import { Router, ActivatedRoute } from '@angular/router';



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
  email: Email = {
    to: "",
    subject: "",
    text: ""
  }


  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public evenementService: EvenementService,
    public transmissionService: TransmissionService,
    public benevoleService: BenevoleService,
    public croisementService: CroisementService,
    public standService: StandService,
    public mailService: MailService,
    public excelService: ExcelService,
    public sanitizer: DomSanitizer) {

    }

  ngOnInit() {
    this.organumber = parseInt(this.route.snapshot.paramMap.get('id'));

    console.log(this.organumber)
    if (!this.organumber || isNaN(this.organumber) || this.organumber < 1) {
      this.router.navigate(['/error']);
    }


    this.benevoles = [];
    this.croisements = [];
    this.choix = "";
    this.find();
    this.getCroisement();

    this.getEvenement();


  }


  getEvenement() {
    this.evenementService.getById(this.organumber).subscribe(data => {
      console.log(data);
      data.eventName = "Gestion par Bénévole - " + data.eventName
      this.transmissionService.dataTransmission(data);
  }, err => {
      console.log(err);
      this.router.navigate(['error']);
  })
}

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.benevoles, 'sample');
  }

  find(): void {
    console.log("find")
    this.benevoleService.getAll(this.organumber).subscribe(data => {
      console.log(data)
      this.benevoles = data;
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



  addCroisements(benevole): void {
    console.log("addCroisements")
    this.benevoleService.addCroisements(benevole).subscribe(data => {
      console.log(data)
    },
      error => {
        console.log('😢 Oh no!', error);
      });
  }


  getCroisement(): void {
    this.croisementService.getAll().subscribe(data => {
      this.croisements = data['croisements']
    },
      error => {
        console.log('😢 Oh no!', error);
      });
  }

  send(benevole: Benevole) {
    this.benevoleService.updateReponse(benevole).subscribe(data => {
      console.log(data)

      this.email.to = benevole.email
      this.email.subject = "Réponse au commentaire de la fête de l'école"
      this.email.text = "Vous nous aviez communiqué que :<br>";

      this.email.text = this.email.text + benevole.commentaire + "<br>"

      this.email.text = this.email.text + "<br>Notre réponse :<br>"

      this.email.text = this.email.text + benevole.reponse + "<br>"

      this.email.text = this.email.text + "<br>Vous pourrez bien entendu retrouver cette réponse sur <a href='https://ouchedinier.herokuapp.com'>le site d'inscription</a><br>Cordialement,<br>L'équipe d'animation"
      this.envoiMail(this.email)
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
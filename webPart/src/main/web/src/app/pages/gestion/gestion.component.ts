
import { Component, OnInit } from '@angular/core';
import { CroisementService, EvenementService, StandService, MailService, ConfigService, ExcelService, BenevoleService } from '../../services';
import { DomSanitizer } from '@angular/platform-browser';
import { Benevole, Email, Config } from '../../models';
import { Router, ActivatedRoute } from '@angular/router';
import { TransmissionService } from 'src/app/services/transmission.service';



@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.css']
})

export class GestionComponent implements OnInit {
  rappel;
  bloque: string;
  benevoles: Benevole[];
  benevolesWithChoice: Benevole[];
  benevolesWithoutChoice: Benevole[];
  benevolesToChange: Benevole[];
  dateRappel: string;
  mail: boolean;
  theCheckbox: any
  selectedDeviceObj: any
  emailInfo: Email = {
    to: "",
    subject: "",
    text: "Bla bla"
  }

  mailingList: Benevole[];
  mailingLists = [{
    id: '1',
    name: 'Tout les inscrits',
  },
  {
    id: '2',
    name: 'Les inscrits AVEC au moins un choix',
  },
  {
    id: '3',
    name: 'Les inscrits SANS choix',
  }]

  organumber: number;


  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public evenementService: EvenementService,
    public transmissionService: TransmissionService,
    public benevoleService: BenevoleService,
    public configService: ConfigService,
    public croisementService: CroisementService,
    public standService: StandService,
    public excelService: ExcelService,
    public mailService: MailService,
    public sanitizer: DomSanitizer) {

  }

  ngOnInit() {
    this.organumber = parseInt(this.route.snapshot.paramMap.get('id'));

    console.log(this.organumber)
    if (!this.organumber || isNaN(this.organumber) || this.organumber < 1) {
      this.router.navigate(['/error']);
    }



    this.rappel = false;
    this.mail = false;
    this.mailingList = [];
    this.benevoles = [];
    this.benevolesWithChoice = [];
    this.benevolesWithoutChoice = [];
    this.benevolesToChange = [];
    this.getBlocage();
    this.getText();
    this.getDateRappel();
    this.getBenevoles();
    this.getEvenement();


  }


  getEvenement() {
    this.evenementService.getById(this.organumber).subscribe(data => {
      console.log(data);
      this.transmissionService.dataTransmission(data);
    }, err => {
      console.log(err);
      this.router.navigate(['error']);
    })
  }

  exportAsXLSX(): void {

    this.standService.getAll(this.organumber).subscribe(data => {
      console.log(data)

      let stands = new Array;
      data.forEach(stand => {
        let standLite = {
          nom: "",
          creneaux: []
        };
        standLite.nom = stand.nom;
        standLite.creneaux = [];

        for (let indexR = 0; indexR < 100; indexR++) {
          let creneau = {};

          stand.croisements.sort(function (a, b) { return a.creneau.ordre - b.creneau.ordre; })
          for (let index = 0; index < stand.croisements.length; index++) {
            const croisement = stand.croisements[index];
            creneau[croisement.creneau.plage] = "";
            if (croisement.benevoles[indexR]) {
              creneau[croisement.creneau.plage] = croisement.benevoles[indexR].nom + " " + croisement.benevoles[indexR].prenom;
            }
          }
          standLite.creneaux.push(creneau);
        }
        stands.push(standLite)
      });

      console.log(stands)

      this.excelService.multiExportAsExcelFile(stands, 'Stands');

    },
      error => {
        console.log('😢 Oh no!', error);
      });

  }

  getDateRappel() {
    this.configService.getParam("dateRappel", this.organumber).subscribe(data => {
      this.dateRappel = data.value;
    }, err => {
      console.log(err);
    });
  }

  updateDateRappel() {
    let date = new Date();
    this.dateRappel = date.getUTCDate() + "/" + date.getUTCMonth() + "/" + date.getFullYear() + " à " + date.getHours() + ":" + date.getMinutes()
    console.log(this.dateRappel)
    let config = new Config();
    config.param = 'dateRappel'
    config.value = this.dateRappel
    this.configService.updateParam(config)
      .subscribe(res => {
        console.log(res);
      }, err => {
        console.log(err);
      });
  }

  getBlocage() {
    this.configService.getParam("lock", this.organumber).subscribe(data => {
      console.log(data);
      this.bloque = data.value;
    }, err => {
      console.log(err);
    });
  }

  updateBlocage(bloque) {
    if (bloque == "true") {
      bloque = "false";
    } else {
      bloque = "true";
    }

    this.bloque = bloque;
    let config = new Config();
    config.param = 'lock'
    config.value = bloque
    this.configService.updateParam(config)
      .subscribe(res => {
        console.log(res);
      }, err => {
        console.log(err);
      });

  }

  getMailingList(option): void {
    console.log("getMailingList")
    console.log(option);
    if (option.id == 1) {
      this.mailingList = this.benevoles
    } else if (option.id == 2) {
      this.mailingList = this.benevolesWithChoice
    } else if (option.id == 3) {
      this.mailingList = this.benevolesWithoutChoice
    }
  }



  getBenevoles(): void {
    console.log("getBenevoles")

    this.benevoleService.getAll(this.organumber).subscribe(data => {
      console.log(data)
      this.benevoles = data;
      this.getBenevolesWithChoice(this.benevoles);
      this.getBenevolesWithoutChoice(this.benevoles);
      this.getBenevolesToChange(this.benevoles);
    },
      error => {
        console.log('😢 Oh no!', error);
      });
  }

  getBenevolesWithChoice(benevoles: Benevole[]) {

    benevoles.forEach(benevole => {
      if (benevole.croisements.length > 0) {
        this.benevolesWithChoice.push(benevole);
      }
    });

  }
  getBenevolesWithoutChoice(benevoles: Benevole[]) {
    benevoles.forEach(benevole => {
      if (benevole.croisements.length == 0) {
        this.benevolesWithoutChoice.push(benevole);
      }
    });

  }
  getBenevolesToChange(benevoles: Benevole[]) {
    benevoles.forEach(benevole => {
      if (benevole.croisements) {
        benevole.croisements.forEach(croisement => {
          if (croisement.stand.etat == 1 || croisement.stand.etat == 3) {
            this.benevolesToChange.push(benevole);
          }
        });
      }
    });

  }

  getText() {
    this.emailInfo.subject = 'Infos pratique';

    this.configService.getParam("rappel1", this.organumber).subscribe(data => {

      this.emailInfo.text = data.value;

      this.configService.getParam("rappel2", this.organumber).subscribe(res => {

        this.emailInfo.text = this.emailInfo.text + data.value;
      }, err => {
        console.log(err);
      });

    }, err => {
      console.log(err);
    });


  }


  envoiMail(email: Email) {
    this.mail = false;
    console.log(email.text)
    email.text = email.text.replace(/\n/g, "<br>");
    console.log(email.text)

    console.log(this.rappel)

    this.mailingList.forEach(benevole => {
      let emailCopy = JSON.parse(JSON.stringify(email))
      console.log(benevole)
      emailCopy.to = benevole.email
      if (this.rappel) {
        emailCopy.text = emailCopy.text + "<br><br>N'oubliez pas que vous vous êtes inscrit en tant que bénévole pour:<br>";
        benevole.croisements.sort((a, b) => (a.creneau.ordre > b.creneau.ordre) ? 1 : ((b.creneau.ordre > a.creneau.ordre) ? -1 : 0));
        benevole.croisements.forEach(croisement => {
          emailCopy.text = emailCopy.text + (croisement.stand.nom == "tous" ? "N'importe quel stand" : croisement.stand.nom) + " - " + croisement.creneau.plage + "<br>"
        })
        if (benevole.gateaux) {
          emailCopy.text = emailCopy.text + "<br>Vous avez également proposé d'apporter :<br>"
          emailCopy.text = emailCopy.text + benevole.gateaux + "<br>"
        }
      }

      this.mailService.sendMail(emailCopy)
        .subscribe(res => {
          console.log("this.api.sendMail");
          console.log(res);
        }, err => {
          console.log(err);
        });
    })
    this.rappel = false;
    this.getText();
    this.mailingList = [];
    this.updateDateRappel()
  }


  toggleVisibility(e) {
    this.rappel = e.target.checked;
  }

}
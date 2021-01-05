
import { Component, OnInit } from '@angular/core';
import { ValidationService, TransmissionService, CroisementService, EvenementService, StandService, MailService, ExcelService, BenevoleService } from '../../services';
import { DomSanitizer } from '@angular/platform-browser';
import { Benevole, Email, Evenement } from '../../models';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import QRCode from 'qrcode'




@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.css']
})

export class GestionComponent implements OnInit {
  rappel;
  benevoles: Benevole[] = [];
  benevolesWithChoice: Benevole[] = [];
  benevolesWithoutChoice: Benevole[] = [];
  benevolesToChange: Benevole[] = [];
  dateRappel: string;
  mail: boolean;
  theCheckbox: any
  selectedDeviceObj: any
  evenement: Evenement
  params: Map<string, string>

  emailInfo: Email = {
    to: "",
    subject: "",
    text: "Bla bla"
  }
  qrcode: Blob
  using_address: String;
  mailingList: Benevole[] = [];
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
  subscription = new Subscription();

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public evenementService: EvenementService,
    public transmissionService: TransmissionService,
    public benevoleService: BenevoleService,
    public croisementService: CroisementService,
    public standService: StandService,
    public excelService: ExcelService,
    public mailService: MailService,
    public validationService: ValidationService,
    public sanitizer: DomSanitizer) {

  }

  ngOnInit() {
    this.params = JSON.parse(localStorage.getItem('allParams'));
    this.evenement = new Evenement();
    this.organumber = parseInt(this.route.snapshot.paramMap.get('id'));
    this.validationService.testGestion(this.organumber)


    this.subscription = this.transmissionService.dataStream.subscribe(
      data => {
        console.log(data)
        this.evenement = data


        this.using_address = this.params['url'] + "/connexion/" + this.evenement.id
        // With promises
        QRCode.toDataURL(this.using_address)
          .then(url => {
            this.qrcode = url
            console.log(url)
          })
          .catch(err => {
            console.error(err)
          })
      });
    this.rappel = false;
    this.mail = false;

    this.getBenevoles();
  }




  async exportAsXLSX() {
    var promises = []
    var standsLite = []

    this.standService.getAll(this.organumber).subscribe(stands => {

  






      stands.forEach(stand => {
        stand.croisements = []
        promises.push(new Promise((resolve, reject) => {
          this.croisementService.getByStand(stand.id).subscribe(croisements => {

              stand.croisements = croisements


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

              standsLite.push(standLite)
              resolve("Completed "+standLite.nom)
            },
              error => {
                console.log('😢 Oh no!', error);
                reject()
              })
        }))

      });









      Promise.all(promises)
        .then(data => {
          console.log("Initial data", data);
          console.log(standsLite)
          this.excelService.multiExportAsExcelFile(standsLite, 'Stands');
        });










    },
      error => {
        console.log('😢 Oh no!', error);
      });




  }



  update(evenement: Evenement): void {
    console.log(evenement)
    this.evenementService.update(evenement).subscribe(data => {
      console.log(data)
    },
      error => {
        console.log('😢 Oh no!', error);
      });
  }


  updateDateRappel() {
    this.evenement.rappelDate = new Date()
    this.update(this.evenement)
  }


  updateBlocage() {
    this.evenement.lock = !this.evenement.lock
    this.update(this.evenement)
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

    this.benevoleService.getByEvenementId(this.organumber).subscribe(benevoles => {
      console.log(benevoles)
      if (benevoles) {
        this.benevoles = benevoles;

        benevoles.forEach(benevole => {
          benevole.croisements = []
          this.croisementService.getByBenevole(benevole.id).subscribe(croisements => {
            console.log(croisements)

            benevole.croisements = croisements

            if (benevole.croisements.length > 0) {
              this.benevolesWithChoice.push(benevole);
            }
            if (benevole.croisements.length == 0) {
              this.benevolesWithoutChoice.push(benevole);
            }
            if (benevole.croisements) {
              benevole.croisements.forEach(croisement => {
                if (croisement.stand.type == 1 || croisement.stand.type == 3) {
                  this.benevolesToChange.push(benevole);
                }
              });
            }


          },
            error => {
              console.log('😢 Oh no!', error);
            });
        });
      }
    },
      error => {
        console.log('😢 Oh no!', error);
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
    this.mailingList = [];
    this.updateDateRappel()
  }


  toggleVisibility(e) {
    this.rappel = e.target.checked;
  }

}
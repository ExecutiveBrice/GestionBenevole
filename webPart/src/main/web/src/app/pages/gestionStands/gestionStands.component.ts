
import { Component, OnInit } from '@angular/core';
import { BenevoleService } from '../../services';
import { ValidationService, TransmissionService, CroisementService, StandService, MailService, EvenementService } from '../../services';
import { DomSanitizer } from '@angular/platform-browser';
import { Stand } from '../../models';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-gestionStands',
  templateUrl: './gestionStands.component.html',
  styleUrls: ['./gestionStands.component.css']
})

export class GestionStandsComponent implements OnInit {
  stands: Stand[];
  organumber: number;
  choix: string;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public evenementService: EvenementService,
    public benevoleService: BenevoleService,
    public croisementService: CroisementService,
    public transmissionService: TransmissionService,
    public standService: StandService,
    public mailService: MailService,
    public validationService: ValidationService,
    public sanitizer: DomSanitizer) {

  }


  ngOnInit() {
    this.organumber = parseInt(this.route.snapshot.paramMap.get('id'));
    this.validationService.testGestion(this.organumber)



    this.stands = [];

    this.choix = "";
    this.getAll();

  }


  getAll(): void {
    console.log("find")
    this.standService.getAll(this.organumber).subscribe(stands => {
      console.log(stands)

      this.stands = stands;

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
    },
      error => {
        console.log('😢 Oh no!', error);
      });
  }



  choixstand(nom: string) {
    if (this.choix != nom) {
      this.choix = nom
    } else {
      this.choix = null
    }
  }

}
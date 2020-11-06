
import { Component, OnInit } from '@angular/core';
import { BenevoleService } from '../../services';
import { TransmissionService, CroisementService, StandService, MailService, EvenementService } from '../../services';
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
  organumber:number;
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
    public sanitizer: DomSanitizer) {

  }


  ngOnInit() {
    this.organumber = parseInt(this.route.snapshot.paramMap.get('id'));

    console.log(this.organumber)
    if (!this.organumber || isNaN(this.organumber) || this.organumber < 1) {
      this.router.navigate(['/error']);
    }


    this.stands = [];

    this.choix = "";
    this.getAll();

    this.getEvenement();


  }


  getEvenement() {
    this.evenementService.getById(this.organumber).subscribe(data => {
      console.log(data);
      data.eventName = "Gestion par Stand - " + data.eventName
      this.transmissionService.dataTransmission(data);
  }, err => {
      console.log(err);
      this.router.navigate(['error']);
    });
}


  getAll(): void {
    console.log("find")
    this.standService.getAll(this.organumber).subscribe(data => {
      console.log(data)

      this.stands = data;
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
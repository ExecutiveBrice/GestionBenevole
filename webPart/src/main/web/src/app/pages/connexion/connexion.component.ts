
import { Component, OnInit } from '@angular/core';
import { BenevoleService, EvenementService } from '../../services';
import { CroisementService, StandService, MailService, ConfigService } from '../../services';
import { DomSanitizer } from '@angular/platform-browser';
import { Benevole, Evenement } from '../../models';
import { Router, ActivatedRoute } from '@angular/router';
import { TransmissionService } from 'src/app/services/transmission.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})

export class ConnexionComponent implements OnInit {

  organumber: number;
  new: boolean;
  validation: boolean;
  nouveau: boolean;
  exist: boolean;
  benevole: Benevole;
  evenement: Evenement

  constructor(public benevoleService: BenevoleService,
    public evenementService: EvenementService,
    public route: ActivatedRoute,
    public transmissionService: TransmissionService,
    public router: Router,
    public configService: ConfigService,
    public croisementService: CroisementService,
    public standService: StandService,
    public mailService: MailService,
    public sanitizer: DomSanitizer) { }


  ngOnInit() {
    this.organumber = parseInt(this.route.snapshot.paramMap.get('id'));
    console.log(this.organumber)
    if (!this.organumber || isNaN(this.organumber) || this.organumber < 1) {
      this.router.navigate(['error']);
    }

    this.benevole = new Benevole();
    this.validation = false;
    this.exist = false;
    this.nouveau = false;
    this.new = true;
    this.bloquage();
    this.getEvenement();


  }


  getEvenement() {
    this.evenementService.getById(this.organumber).subscribe(data => {
        console.log(data);
        this.evenement = data;
        this.transmissionService.dataTransmission(this.evenement);
    }, err => {
        console.log(err);
        this.router.navigate(['error']);
    });
}


  bloquage() {
    this.configService.getParam('lock', this.organumber)
      .subscribe(data => {
        console.log("lock");
        console.log(data.value);
        if (data.value == "true") {
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
    this.benevoleService.getByMail(this.benevole.email, this.organumber).subscribe(data => {
      console.log("data")
      console.log(data)
      if (data == null) {
        this.exist = false
        this.new = false;
      } else {
        localStorage.setItem('user', JSON.stringify(data));
        this.router.navigate(['/inscription/'+ this.organumber ]);
      }

    },
      error => {

        console.log('😢 Oh no!', error);
      });
  }


  subscribe(): void {
    this.nouveau = false;
    console.log("subscribe")
    this.benevole.evenement = this.evenement;
    this.benevole.email = this.benevole.email.toLowerCase();
    this.benevoleService.add(this.benevole).subscribe(data => {
      console.log("data")
      console.log(data)
      localStorage.setItem('user', JSON.stringify(data))
      this.router.navigate(['/inscription/'+ this.organumber ]);

    },
      error => {
        this.exist = false;
        this.new = false;
        console.log('😢 Oh no!', error);
      });
  }


}
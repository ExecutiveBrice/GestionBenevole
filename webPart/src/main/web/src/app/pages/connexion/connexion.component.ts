
import { Component, OnInit } from '@angular/core';
import { ValidationService, BenevoleService, EvenementService } from '../../services';
import { CroisementService, StandService, MailService } from '../../services';
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

  constructor(public benevoleService: BenevoleService,
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
    this.organumber = parseInt(this.route.snapshot.paramMap.get('id'));
    this.validationService.testCommun(this.organumber)

    this.benevole = new Benevole();
    this.validation = false;
    this.exist = false;
    this.nouveau = false;
    this.new = true;
  }




  find(): void {
    console.log("find")
    console.log(this.benevole)
    this.benevole.email = this.benevole.email.toLowerCase();
    this.benevoleService.getByMail(this.benevole.email, this.organumber).subscribe(benevole => {
      console.log("benevole")
      console.log(benevole)
      if (benevole == null) {
        this.exist = false
        this.new = false;
      } else {
        localStorage.setItem('user', JSON.stringify(benevole));
        this.router.navigate(['/inscription/' + this.organumber]);
      }

    },
      error => {

        console.log('😢 Oh no!', error);
      });
  }


  subscribe(): void {
    this.nouveau = false;
    console.log("subscribe")
    this.benevole.email = this.benevole.email.toLowerCase();
    this.benevoleService.add(this.benevole, this.organumber).subscribe(data => {
      console.log("data")
      console.log(data)
      localStorage.setItem('user', JSON.stringify(data))
      this.router.navigate(['/inscription/' + this.organumber]);
    },
      error => {
        this.exist = false;
        this.new = false;
        console.log('😢 Oh no!', error);
      });
  }


}
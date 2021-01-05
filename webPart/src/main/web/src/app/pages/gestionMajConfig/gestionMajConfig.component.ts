
import { Component, OnInit } from '@angular/core';
import { ValidationService, TransmissionService, EvenementService } from '../../services';
import { DomSanitizer } from '@angular/platform-browser';
import { Evenement } from '../../models';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-gestionMajConfig',
  templateUrl: './gestionMajConfig.component.html',
  styleUrls: ['./gestionMajConfig.component.css']
})

export class GestionMajConfigComponent implements OnInit {

  organumber: number;
  evenement: Evenement;
  subscription = new Subscription();

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public transmissionService: TransmissionService,
    public evenementService: EvenementService,
    public validationService: ValidationService,
    public sanitizer: DomSanitizer) {

  }

  ngOnInit() {
    this.organumber = parseInt(this.route.snapshot.paramMap.get('id'));
    this.validationService.testGestion(this.organumber)

    this.subscription = this.transmissionService.dataStream.subscribe(
      data => {
        console.log(data)
        this.evenement = data
      });
  }


  update(evenement: Evenement): void {
    console.log("update")
    this.evenementService.update(evenement).subscribe(data => {
      console.log(data)
      this.evenement = data;
    },
      error => {
        console.log('😢 Oh no!', error);
      });
  }

}
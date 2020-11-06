
import { Component, OnInit } from '@angular/core';
import { TransmissionService, EvenementService, ConfigService } from '../../services';
import { DomSanitizer } from '@angular/platform-browser';
import { Config } from '../../models';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-gestionMajConfig',
  templateUrl: './gestionMajConfig.component.html',
  styleUrls: ['./gestionMajConfig.component.css']
})

export class GestionMajConfigComponent implements OnInit {
 
  organumber:number;

  configs: Config[];

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public transmissionService: TransmissionService,
    public evenementService: EvenementService,
    public configService: ConfigService,
    public sanitizer: DomSanitizer) {

  }

  ngOnInit() {
    this.organumber = parseInt(this.route.snapshot.paramMap.get('id'));

    console.log(this.organumber)
    if (!this.organumber || isNaN(this.organumber) || this.organumber < 1) {
      this.router.navigate(['/error']);
    }


    this.getAll();
    this.getEvenement();


  }


  getEvenement() {
    this.evenementService.getById(this.organumber).subscribe(data => {
      console.log(data);
      data.eventName = "Gestion des configs - " + data.eventName
      this.transmissionService.dataTransmission(data);
  }, err => {
      console.log(err);
      this.router.navigate(['error']);
  })
}

  getAll(): void {
    console.log("getAll")
    this.configService.getAll(this.organumber).subscribe(data => {
      console.log(data)
      this.configs = data;
    },
      error => {
        console.log('😢 Oh no!', error);
      });
  }


  update(config:Config): void {
    console.log("update")
    this.configService.updateParam(config).subscribe(data => {
      console.log(data)
      this.getAll();
    },
      error => {
        console.log('😢 Oh no!', error);
      });
  }

}
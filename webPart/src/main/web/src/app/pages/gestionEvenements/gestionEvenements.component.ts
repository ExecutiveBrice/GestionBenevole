
import { Component, OnInit } from '@angular/core';
import { ValidationService, TransmissionService, EvenementService, ConfigService } from '../../services';
import { DomSanitizer } from '@angular/platform-browser';
import { Evenement } from '../../models';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-gestionEvenements',
  templateUrl: './gestionEvenements.component.html',
  styleUrls: ['./gestionEvenements.component.css']
})

export class GestionEvenementsComponent implements OnInit {
  organumber: number;
  evenements: Evenement[];
  choix:number;
  params: Map<string,string>


  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public evenementService: EvenementService,
    public transmissionService: TransmissionService,
    public configService:ConfigService,
    public validationService: ValidationService,
    public sanitizer: DomSanitizer) {

    }

  ngOnInit() {
    this.params = JSON.parse(localStorage.getItem('allParams'));
    this.validationService.testGestion(0)

    this.evenements = [];
    this.getAllEvenements();



  }


  goToGestion(evenement:Evenement){


    this.router.navigate(['/gestion/' + evenement.id]);

  }




  choixEvenement(id: number) {
    if (this.choix != id) {
      this.choix = id
    } else {
      this.choix = null
    }

  }



  update(evenement: Evenement): void {
    console.log(evenement)
    this.evenementService.update(evenement).subscribe(data => {
      console.log(data)
      this.getAllEvenements()
    },
      error => {
        console.log('😢 Oh no!', error);
      });
  }


  

  delete(evenement: Evenement): void {
    console.log(evenement)
    this.evenementService.delete(evenement).subscribe(data => {
      console.log(data)
      this.getAllEvenements()
    },
      error => {
        console.log('😢 Oh no!', error);
      });
  }




  getAllEvenements(): void {
    this.evenementService.getAll().subscribe(data => {
      console.log(data)

      this.evenements = data
    },
      error => {
        console.log('😢 Oh no!', error);
      });
  }

  
}
import { Component } from '@angular/core';
import { EvenementService, MailService, ConfigService } from './services';
import { Router, ActivatedRoute } from '@angular/router';
import { Email, Evenement } from './models';
import { Subscription } from 'rxjs';
import { TransmissionService } from './services/transmission.service';

@Component({
    selector: 'app',
    templateUrl: 'app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent {
    subscription = new Subscription()
    evenement : Evenement;
    retour: boolean = false;
    email: Email = {
        to: "",
        subject: "",
        text: ""
    }
    mail: boolean;
    titleText:string;
    titleDate:string;
    planing:boolean;
    organumber: number;


    constructor(
        public configService:ConfigService,
        public transmissionService: TransmissionService,
        public mailService: MailService,
        public evenementService: EvenementService,
        public router: Router,
        public route: ActivatedRoute) {
    
    }

    ngOnInit() {
        this.evenement = new Evenement();
        this.mail = false;
        this.planing = false;
        this.getTexts();
        console.log('AppComponent')
        this.organumber = isNaN(parseInt(this.route.snapshot.paramMap.get('id')))?0:parseInt(this.route.snapshot.paramMap.get('id'));
        console.log("AppComponent "+this.organumber)

        this.subscription = this.transmissionService.dataStream.subscribe(
            data => {
                console.log(data)
                this.evenement = data
            });
    }



    envoiMail(email: Email) {

            email.subject = "problème"
            email.to = this.evenement.contactEmail

            this.mailService.sendMail(email)
                .subscribe(res => {
                    console.log("this.api.sendMail");
                    console.log(res);
                }, err => {
                    console.log(err);
                });
        this.mail = false;
    }

    



    getTexts() {
        this.configService.getParam("titleText", this.organumber).subscribe(data => {
          console.log(data);
          this.titleText = data.value;
        }, err => {
          console.log(err);
        });
        this.configService.getParam("titleDate", this.organumber).subscribe(data => {
          console.log(data);
          this.titleDate = data.value;
        }, err => {
          console.log(err);
        });
      }
}
import { Component } from '@angular/core';
import { EvenementService, MailService,ConfigService } from './services';
import { Router, ActivatedRoute } from '@angular/router';
import { Benevole, Email, Evenement } from './models';
import { Subscription } from 'rxjs';
import { TransmissionService } from './services/transmission.service';

@Component({
    selector: 'app',
    templateUrl: 'app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent {
    subscription = new Subscription()
    evenement: Evenement;
    retour: boolean = false;

    mail: boolean;
    titleText: string;
    titleDate: string;
    planing: boolean;
    organumber: number;
    isGestion: boolean
    canSendAlerte:boolean
    benevole:Benevole
    params: Map<string,string>

    constructor(
        public transmissionService: TransmissionService,
        public mailService: MailService,
        public evenementService: EvenementService,
        public configService:ConfigService,
        public router: Router,
        public route: ActivatedRoute) {


    }

    ngOnInit() {
        this.getParams()
        this.evenement = new Evenement();
        this.mail = false;
        this.planing = false;
        console.log('AppComponent')

        console.log(this.router.url);
        this.router.events.subscribe((url: any) => {
            if (url.routerEvent) {
                console.log(url.routerEvent.url)
                if (url.routerEvent.url.indexOf("inscription") > -1) {
                    this.canSendAlerte = true
                } else {
                    this.canSendAlerte = false
                }
            }
        }

        );




        this.organumber = isNaN(parseInt(this.route.snapshot.paramMap.get('id'))) ? 0 : parseInt(this.route.snapshot.paramMap.get('id'));
        console.log("AppComponent " + this.organumber)

        this.subscription = this.transmissionService.dataStream.subscribe(
            data => {
                console.log(data)
                this.evenement = data
                this.isGestion = JSON.parse(localStorage.getItem('isGestion'));
                this.benevole = JSON.parse(localStorage.getItem('user'));
            });
    }

    getParams() {
        this.configService.getParams().subscribe(allParams => {
          console.log(allParams);
          this.params = allParams
          localStorage.setItem('allParams', JSON.stringify(allParams))
        }, err => {
          console.log(err);
          this.router.navigate(['error']);
        })
      }


    envoiMail(text: string) {
        var email: Email = {
            to: "",
            subject: "",
            text: ""
        }

        var managing_address = this.params['url']+"/gestion/" + this.evenement.id
        email.subject = "problème"
        email.to = this.evenement.contactEmail
        email.text = text + "<br /><br />Message venant de "+this.benevole.prenom+" "+this.benevole.nom
        email.text = email.text + "<br />Message venant de "+this.benevole.email

        email.text = email.text + "<br /><br />"+managing_address
        

        this.mailService.sendMail(email)
            .subscribe(res => {
                console.log("this.api.sendMail");
                console.log(res);
            }, err => {
                console.log(err);
            });
        this.mail = false;

        text = ""
    }


}
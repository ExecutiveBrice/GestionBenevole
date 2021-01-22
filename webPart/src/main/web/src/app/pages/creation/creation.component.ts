import { Component, OnInit } from '@angular/core';
import { ConfigService, EvenementService, TransmissionService, MailService } from '../../services';
import { DomSanitizer } from '@angular/platform-browser';
import { Evenement, Email } from '../../models';
import QRCode from 'qrcode'

@Component({
  selector: 'app-creation',
  templateUrl: './creation.component.html',
  styleUrls: ['./creation.component.css']
})

export class CreationComponent implements OnInit {

  qrcode: Blob
  header: string
  using: string
  managing: string

  evenement: Evenement = new Evenement();
  new: boolean;
  ok: boolean;
  params: Map<string, string>
  error: boolean


  constructor(
    public mailService: MailService,
    public configService: ConfigService,
    public evenementService: EvenementService,
    public transmissionService: TransmissionService,
    public sanitizer: DomSanitizer) { }


  ngOnInit() {
    this.params = JSON.parse(localStorage.getItem('allParams'));
    console.log(this.params)
    this.new = true;
    this.ok = true;
  }

  oneEmpty(evenement: Evenement): boolean {

    var keyArray = ["contact", "eventName", "contactEmail", "startDate", "endDate", "password"]
    for (let index = 0; index < keyArray.length; index++) {
      if (evenement[keyArray[index]] == undefined || evenement[keyArray[index]] == null || evenement[keyArray[index]].length < 4) {
        console.log(keyArray[index] + " is " + evenement[keyArray[index]])
        return true
      }
    }
    return false
  }

  create(evenement: Evenement): void {

    if (this.oneEmpty(evenement)) {
      this.error = true
    } else {
      this.error = false
      this.evenementService.ajout(evenement).subscribe(data => {
        console.log(data)
        console.log(evenement)
        this.new = false
        this.ok = true

        var using_address = this.params['url'] + "/connexion/" + data.id
        var managing_address = this.params['url'] + "/gestion/" + data.id

        this.header = this.configService.completeTemplate(this.params['header'], evenement.eventName, using_address, managing_address)
        this.using = this.configService.completeTemplate(this.params['using'], evenement.eventName, using_address, managing_address)
        this.managing = this.configService.completeTemplate(this.params['managing'], evenement.eventName, using_address, managing_address)


        // With promises
        QRCode.toDataURL(using_address)
          .then(url => {
            this.qrcode = url
            console.log(url)
          })
          .catch(err => {
            console.error(err)
          })


        let email = new Email()
        email.to = evenement.contactEmail
        email.subject = this.configService.completeTemplate(this.params['title'], evenement.eventName, using_address, managing_address)

        email.text = "Bonjour <br />";
        email.text = email.text + this.header;
        email.text = email.text + this.using;
        email.text = email.text + "<br><br><a href=\"" + using_address + "\"><img src=\"" + this.qrcode + "\" /></a>";
        email.text = email.text + "<br><br>"+this.managing;
        email.text = email.text + this.params['signature']
        console.log(email);



        this.mailService.sendMail(email)
          .subscribe(res => {
            console.log("email sent to " + evenement.contactEmail);
          }, err => {
            console.log(err);
          });
      },
        error => {
          console.log('😢 Oh no!', error);
        });


    }
  }


}
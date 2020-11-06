
import { Component } from '@angular/core';
import { SMSService } from '../../services';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-gestionSMS',
  templateUrl: './gestionSMS.component.html',
  styleUrls: ['./gestionSMS.component.css']
})

export class GestionSMSComponent {

  sms = {
    numeros: "",
    message: ""
  }
  smsList = []

  constructor(
    public smsService: SMSService,
    public sanitizer: DomSanitizer) {

  }



  send(sms): void {
    console.log(sms);
    this.smsList = [];
    let numeros = sms.numeros.split(";")

    numeros.forEach(num => {


      this.smsService.send(num, sms.message).subscribe(data => {
        console.log(data)
        this.smsList.push({numero : num,resultat : "OK"})
        console.log(this.smsList)
      },
        error => {
          this.smsList.push({numero : num,resultat : "ERREUR"})
          console.log('😢 Oh no!', error);
        });

    });


  }


}
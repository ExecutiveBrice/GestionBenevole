import { Component, OnInit } from '@angular/core';
import { ConfigService, EvenementService, TransmissionService } from '../../services';
import { DomSanitizer } from '@angular/platform-browser';
import { Evenement } from '../../models';
import QRCode from 'qrcode'

@Component({
  selector: 'app-creation',
  templateUrl: './creation.component.html',
  styleUrls: ['./creation.component.css']
})

export class CreationComponent implements OnInit {

  qrcode: Blob
  using_address
  managing_address
  evenement: Evenement = {
    contactEmail: "machin@truncate.com",
    contact: "Truc BIDUL",
    contactTel: "06 00 00 00",
    endDate: new Date(),
    eventName: "Ma fête à moi",
    id: null,
    password: "facil",
    startDate: new Date()
  };
  new: boolean;
  ok: boolean;

  constructor(
    public configService: ConfigService,
    public evenementService: EvenementService,
    public transmissionService: TransmissionService,
    public sanitizer: DomSanitizer) { }


  ngOnInit() {

    this.new = true;
    this.ok = true;
    this.getEvenement();


  }


  getEvenement() {
    this.evenementService.getById(0).subscribe(data => {
        console.log(data);
        this.evenement = data;
        this.transmissionService.dataTransmission(this.evenement);
    }, err => {
        console.log(err);
    });
}



  create(evenement: Evenement): void {


    this.evenementService.ajout(evenement).subscribe(data => {
      console.log(data)

      this.new = false
      this.ok = true

      this.using_address = "https://www.alod.fr/connexion/" + data.id
      this.managing_address = "https://www.alod.fr/gestion/" + data.id
      // With promises
      QRCode.toDataURL(this.using_address)
        .then(url => {
          this.qrcode = url
          console.log(url)
        })
        .catch(err => {
          console.error(err)
        })
    },
      error => {
        console.log('😢 Oh no!', error);
      });
  }

}
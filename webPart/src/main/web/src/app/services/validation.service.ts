import { Injectable } from '@angular/core';
import { Evenement } from '../models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalContent } from '../pages';
import { Router, ActivatedRoute } from '@angular/router';
import { TransmissionService, EvenementService, ConfigService } from '.';

@Injectable()
export class ValidationService {

  constructor(
    private ngbModal: NgbModal,
    public route: ActivatedRoute,
    public configService: ConfigService,
    public evenementService: EvenementService,
    public transmissionService: TransmissionService,
    public router: Router
  ) { }





  testCommun(organumber: number) {

    localStorage.setItem('isGestion', JSON.stringify(false))
    console.log(organumber)
    if (!organumber || isNaN(organumber) || organumber < 1) {
      this.router.navigate(['error']);
    }

    this.evenementService.getById(organumber).subscribe(evenement => {
      console.log(evenement);
      if (evenement.lock) {
        this.router.navigate(['error']);
      } else {
        this.transmissionService.dataTransmission(evenement);
      }
    }, err => {
      console.log(err);
      this.router.navigate(['error']);
    })
  }


  testGestion(organumber: number) {

    localStorage.setItem('isGestion', JSON.stringify(true))
    if (organumber != 0) {

      console.log(organumber)
      if (!organumber || isNaN(organumber) || organumber < 1) {
        this.router.navigate(['error']);
      }
      this.evenementService.getById(organumber).subscribe(evenement => {
        console.log(evenement);
        this.transmissionService.dataTransmission(evenement);

        let localEvent: Evenement = JSON.parse(localStorage.getItem('isValidAccessForEvent'));
        console.log(localEvent)
        if (localEvent == null || localEvent.id != organumber) {

          const modalRef = this.ngbModal.open(ModalContent);
          modalRef.componentInstance.name = evenement.eventName;
          modalRef.result.then((code) => {
            console.log(code)
            if (code != evenement.password) {
              localStorage.removeItem('isValidAccessForEvent');
              this.router.navigate(['error']);
            } else {
              localStorage.setItem('isValidAccessForEvent', JSON.stringify(evenement));
            }
          }, (reason) => {
            console.log(reason)
            localStorage.removeItem('isValidAccessForEvent');
            this.router.navigate(['error']);
          });

        }
      }, err => {
        console.log(err);
        localStorage.removeItem('isValidAccessForEvent');
        this.router.navigate(['error']);
      })
    } else {
      localStorage.removeItem('isValidAccessForEvent');
      const modalRef = this.ngbModal.open(ModalContent);
      modalRef.componentInstance.name = "Général";
      modalRef.result.then((code) => {
        console.log(code)
        if (code != "super") {
          this.router.navigate(['error']);
        }
      }, (reason) => {
        console.log(reason)
        this.router.navigate(['error']);
      });

    }




  }

}

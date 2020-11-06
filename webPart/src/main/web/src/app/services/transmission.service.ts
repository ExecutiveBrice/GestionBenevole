import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Evenement } from '../models';


@Injectable()
export class TransmissionService {

  // Observable string sources
  private dataSource = new Subject<Evenement>();


  // Observable string streams
  dataStream = this.dataSource.asObservable();

  // Service message commands
  dataTransmission(event: Evenement) {
    this.dataSource.next(event);
  }

}
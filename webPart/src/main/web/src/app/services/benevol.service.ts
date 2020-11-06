import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Benevole } from '../models';

@Injectable()
export class BenevoleService {
  apiUrl = 'benevole';

  constructor(
    private http: HttpClient
  ) { }

  getAll(eventId: number) {
    let params = new HttpParams().set('eventId', ''+eventId+'');
    return this.http.get<Benevole[]>(this.apiUrl + '/getAll', {params, responseType: 'json' });
  }

  getWithChoice(eventId: number) {
    let params = new HttpParams().set('eventId', ''+eventId+'');
    return this.http.get<Benevole[]>(this.apiUrl + '/getWithChoice', {params, responseType: 'json' });
  }

  getWithOutChoice(eventId: number) {
    let params = new HttpParams().set('eventId', ''+eventId+'');
    return this.http.get<Benevole[]>(this.apiUrl + '/getWithOutChoice', {params, responseType: 'json' });
  }


  getByMail(email: String, eventId: number) {
    let params = new HttpParams().set('email', '' + email + '').set('eventId', ''+eventId+'');
    return this.http.get<Benevole[]>(this.apiUrl + '/byMail', { params, responseType: 'json' });
  }

  add(benevole: Benevole) {
    return this.http.post<Benevole>(this.apiUrl + '/', benevole, { responseType: 'json' });
  }

  update(benevole: Benevole) {
    return this.http.put(this.apiUrl + '/', benevole, { responseType: 'json' });
  }

  addCroisements(benevole: Benevole) {
    return this.http.put(this.apiUrl + '/addCroisements', benevole, { responseType: 'json' });
  }

  updateReponse(benevole: Benevole) {
    return this.http.put(this.apiUrl + '/updateReponse', benevole, { responseType: 'json' });
  }

  error(benevole: Benevole) {
    return this.http.post(this.apiUrl + '/error', benevole, { responseType: 'json' });
  }
}

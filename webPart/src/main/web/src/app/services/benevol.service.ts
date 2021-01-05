import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Benevole } from '../models';

@Injectable()
export class BenevoleService {
  apiUrl = 'benevole';

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    return this.http.get<Benevole[]>(this.apiUrl + '/getAll', { responseType: 'json' });
  }

  getByEvenementId(eventId: number) {
    let params = new HttpParams().set('eventId', '' + eventId + '');
    return this.http.get<Benevole[]>(this.apiUrl + '/getByEvenementId', { params, responseType: 'json' });
  }

  getWithChoice(eventId: number) {
    let params = new HttpParams().set('eventId', '' + eventId + '');
    return this.http.get<Benevole[]>(this.apiUrl + '/getWithChoice', { params, responseType: 'json' });
  }

  getWithOutChoice(eventId: number) {
    let params = new HttpParams().set('eventId', '' + eventId + '');
    return this.http.get<Benevole[]>(this.apiUrl + '/getWithOutChoice', { params, responseType: 'json' });
  }


  getByMail(email: String, eventId: number) {
    let params = new HttpParams().set('email', '' + email + '').set('eventId', '' + eventId + '');
    return this.http.get<Benevole>(this.apiUrl + '/byMail', { params, responseType: 'json' });
  }

  add(benevole: Benevole, eventId: number) {
    let params = new HttpParams().set('eventId', '' + eventId + '');
    return this.http.post<Benevole>(this.apiUrl + '/', benevole, {params, responseType: 'json' });
  }

  update(benevole: Benevole) {
    let lBenevole = new Benevole();
    lBenevole.id = benevole.id
    lBenevole.commentaire = benevole.commentaire
    lBenevole.email = benevole.email
    lBenevole.nom = benevole.nom 
    lBenevole.prenom = benevole.prenom
    lBenevole.reponse = benevole.reponse
    return this.http.put(this.apiUrl + '/', lBenevole, { responseType: 'json' });
  }

  addCroisements(benevoleId: number, croisementListId: number[]) {
    let params = new HttpParams().set('benevoleId', '' + benevoleId + '');
    return this.http.put(this.apiUrl + '/addCroisements', croisementListId, { params, responseType: 'json' });
  }


  error(benevole: Benevole) {
    return this.http.post(this.apiUrl + '/error', benevole, { responseType: 'json' });
  }
}

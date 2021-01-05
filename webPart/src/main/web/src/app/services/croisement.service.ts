import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Croisement, Stand } from '../models';

@Injectable()
export class CroisementService {
  apiUrl = 'croisement';

  constructor(
    private http: HttpClient
  ) { }


  getAll(eventId: number) {
    let params = new HttpParams().set('eventId', ''+eventId+'');
    return this.http.get<Croisement[]>(this.apiUrl + '/getAll', {params, responseType: 'json'});
  }

  getById(croisementId:number) {
    let params = new HttpParams().set('croisementId', ''+croisementId+'');
    return this.http.get<Croisement>(this.apiUrl + '/getById', {params, responseType: 'json'});
  }

  getByStand(standId:number) {
    let params = new HttpParams().set('standId', ''+standId+'');
    return this.http.get<Croisement[]>(this.apiUrl + '/getByStand', {params, responseType: 'json'});
  }

  getByBenevole(benevoleId:number) {
    let params = new HttpParams().set('benevoleId', ''+benevoleId+'');
    return this.http.get<Croisement[]>(this.apiUrl + '/getByBenevole', {params, responseType: 'json'});
  }

  getByCreneau(creneauId:number) {
    let params = new HttpParams().set('creneauId', ''+creneauId+'');
    return this.http.get<Croisement[]>(this.apiUrl + '/getByCreneau', {params, responseType: 'json'});
  }
    
  getByType(type:number, eventId:number) {
    let params = new HttpParams().set('type', ''+type+'').set('eventId', ''+eventId+'');
    return this.http.get<Croisement[]>(this.apiUrl + '/getByType', {params, responseType: 'json'});
  }

  ajout(croisement:Croisement) {
    return this.http.post(this.apiUrl + '/', croisement, {responseType: 'json'});
  }

  update(croisement:Croisement) {
    return this.http.put(this.apiUrl + '/', croisement, {responseType: 'json'});
  }

  delete(croisement:Croisement) {
    let params = new HttpParams().set('croisementId', ''+croisement.id+'');
    return this.http.delete(this.apiUrl + '/', {params, responseType: 'json'});
  }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Croisement } from '../models';

@Injectable()
export class CroisementService {
  apiUrl = 'croisement';

  constructor(
    private http: HttpClient
  ) { }


  getAll() {
    return this.http.get<Croisement[]>(this.apiUrl + '/getAll', {responseType: 'json'});
  }

  getById(id:number) {
    let params = new HttpParams().set('id', ''+id+'');
    return this.http.get(this.apiUrl + '/getById', {params, responseType: 'json'});
  }

  getByStand(id:number) {
    let params = new HttpParams().set('id', ''+id+'');
    return this.http.get<Croisement[]>(this.apiUrl + '/getByStand', {params, responseType: 'json'});
  }

  getByCreneau(id:String) {
    let params = new HttpParams().set('id', ''+id+'');
    return this.http.get<Croisement[]>(this.apiUrl + '/getByCreneau', {params, responseType: 'json'});
  }
    
  getByGroup(group:number, eventId:number) {
    let params = new HttpParams().set('group', ''+group+'').set('eventId', ''+eventId+'');
    return this.http.get<Croisement[]>(this.apiUrl + '/getByGroup', {params, responseType: 'json'});
  }
  ajout(croisement:Croisement) {
    return this.http.post(this.apiUrl + '/', croisement, {responseType: 'json'});
  }
  update(croisement:Croisement) {
    return this.http.put(this.apiUrl + '/', croisement, {responseType: 'json'});
  }
  delete(croisement:Croisement) {
    let params = new HttpParams().set('id', ''+croisement.id+'');
    return this.http.delete(this.apiUrl + '/', {params, responseType: 'json'});
  }
}

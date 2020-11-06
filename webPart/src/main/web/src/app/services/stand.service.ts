import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Stand } from '../models';

@Injectable()
export class StandService {
  apiUrl = 'stand';

  constructor(
    private http: HttpClient
  ) { }


  getAll(eventId: number) {
    let params = new HttpParams().set('eventId', ''+eventId+'');
    return this.http.get<Stand[]>(this.apiUrl + '/getAll', {params, responseType: 'json'});
  }
  getById(id:number, eventId: number) {
    let params = new HttpParams().set('id', ''+id+'').set('eventId', ''+eventId+'');
    return this.http.get(this.apiUrl + '/getById', {params, responseType: 'json'});
  }
  ajout(stand:Stand) {
    return this.http.post(this.apiUrl + '/', stand, {responseType: 'json'});
  }
  update(stand:Stand) {
    return this.http.put(this.apiUrl + '/', stand, {responseType: 'json'});
  }
  delete(stand:Stand) {
    let params = new HttpParams().set('id', ''+stand.id+'');
    return this.http.delete(this.apiUrl + '/', {params, responseType: 'json'});
  }
  
}

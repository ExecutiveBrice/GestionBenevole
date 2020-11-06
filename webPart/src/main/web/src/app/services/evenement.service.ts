import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Evenement } from '../models';

@Injectable()
export class EvenementService {
  apiUrl = 'evenement';

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    return this.http.get<Evenement[]>(this.apiUrl + '/getAll', {responseType: 'json'});
  }
  getById(id:number) {
    let params = new HttpParams().set('id', ''+id+'');
    return this.http.get<Evenement>(this.apiUrl + '/getById', {params, responseType: 'json'});
  }
  ajout(creneau:Evenement) {
    return this.http.post<Evenement>(this.apiUrl + '/', creneau, {responseType: 'json'});
  }
  update(creneau:Evenement) {
    return this.http.put<Evenement>(this.apiUrl + '/', creneau, {responseType: 'json'});
  }
  delete(creneau:Evenement) {
    let params = new HttpParams().set('id', ''+creneau.id+'');
    return this.http.delete(this.apiUrl + '/', {params, responseType: 'json'});
  }
  
}

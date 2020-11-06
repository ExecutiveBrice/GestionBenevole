import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Config, Evenement } from '../models';

@Injectable()
export class ConfigService {
  apiUrl = 'config';

  constructor(
    private http: HttpClient
  ) { }

  getAll(eventId: number) {
    let params = new HttpParams().set('eventId', ''+eventId+'');
    return this.http.get<Config[]>(this.apiUrl + '/getAll', {params, responseType: 'json'});
  }

  create(event:Evenement) {
    return this.http.post<number>(this.apiUrl + '/', event, {responseType: 'json'});
  }

  getParam(param:string, eventId:number) {
    let params = new HttpParams().set('param', ''+param+'').set('eventId', ''+0+'');
    return this.http.get<Config>(this.apiUrl + "/", {params, responseType: 'json' });
  }

  updateParam(config:Config) {
    let params = new HttpParams().set('param', ''+config.param+'').set('value', ''+config.value+'');
    
    return this.http.put(this.apiUrl + "/", params, { responseType: 'json' })
  }
}

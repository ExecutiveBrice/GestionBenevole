import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";


@Injectable()
export class ConfigService {
  apiUrl = 'config';

  constructor(
    private http: HttpClient
  ) { }

  getParams() {
    return this.http.get<Map<string, string>>(this.apiUrl + '/getParams', { responseType: 'json'});
  }


  completeTemplate(text:string, event_name:string, using_address:string, managing_address:string):string {
    while(text.match("<event_name>")){
      text= text.replace("<event_name>",event_name)
    }

    while(text.match("<using_address>")){
      text= text.replace("<using_address>",using_address)
      console.log(text.match("<using_address>"))
    }

    while(text.match("<managing_address>")){
      text= text.replace("<managing_address>",managing_address)
    }

    return text
  }




}

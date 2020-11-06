import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Email } from '../models';
@Injectable()
export class MailService {
  apiUrl = 'email';

  constructor(
    private http: HttpClient
  ) { }

  rappel(email: Email) {
    return this.http.post(this.apiUrl + "/rappel", email, { responseType: 'json' })
  }

  sendMail(email: Email) {
    return this.http.post(this.apiUrl + "/", email, { responseType: 'json' })
  }
}

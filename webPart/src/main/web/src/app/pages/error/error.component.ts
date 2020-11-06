
import { Component } from '@angular/core';
import { ConfigService } from '../../services';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})

export class ErrorComponent {
  text:string

  constructor(    public configService: ConfigService,
    public sanitizer: DomSanitizer) {
    this.getText()
  }


 

  getText() {
    this.configService.getParam("erreur1", 0).subscribe(data => {
      console.log(data.value);
      this.text = data.value;
    }, err => {
      console.log(err);
    });
  }
}
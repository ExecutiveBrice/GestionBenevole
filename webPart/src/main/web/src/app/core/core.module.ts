import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule} from "../app-routing.module";
import { FormsModule} from "@angular/forms";
import { OrderByPipe} from "../sort.pipe";
import { TransmissionService, CroisementService, EvenementService, BenevoleService, StandService, MailService, ConfigService, ExcelService, CreneauService, SMSService} from "../services";

import { ErrorComponent, InscriptionComponent, ConnexionComponent, GestionComponent, CreationComponent, GestionStandsComponent, GestionMajStandsComponent, GestionMajConfigComponent, GestionBenevolesComponent, GestionMajCreneauxComponent, GestionSMSComponent} from "../pages";


import { Ng2ImgMaxModule } from 'ng2-img-max';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    Ng2ImgMaxModule
  ],
  exports: [
    AppRoutingModule
  ],
  providers: [
    CroisementService,
    BenevoleService,
    StandService,
    MailService,
    ConfigService,
    ExcelService,
    CreneauService,
    SMSService,
    EvenementService,
    TransmissionService
  ],
  declarations: [
    CreationComponent,
    InscriptionComponent, ConnexionComponent,
    GestionComponent,
    GestionStandsComponent,
    GestionSMSComponent,
    GestionMajStandsComponent,
    GestionBenevolesComponent,
    GestionMajCreneauxComponent,
    GestionMajConfigComponent,
    ErrorComponent,
    OrderByPipe
  ]
})
export class CoreModule { }

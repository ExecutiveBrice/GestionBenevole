import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent, InscriptionComponent, ConnexionComponent, GestionComponent, CreationComponent, GestionStandsComponent, GestionMajStandsComponent, GestionMajConfigComponent, GestionBenevolesComponent, GestionMajCreneauxComponent, GestionSMSComponent, GestionEvenementsComponent} from "./pages";

const appRoutes: Routes = [
// { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'creation', component: CreationComponent},
  { path: 'connexion/:id', component: ConnexionComponent},
  { path: 'inscription/:id', component: InscriptionComponent},
  { path: 'gestion/:id', component: GestionComponent},
  { path: 'gestionmajconfig/:id', component: GestionMajConfigComponent},
  { path: 'gestionmajstands/:id', component: GestionMajStandsComponent},
  { path: 'gestionmajcreneaux/:id', component: GestionMajCreneauxComponent},
  { path: 'gestionstands/:id', component: GestionStandsComponent},
  { path: 'gestionsms/:id', component: GestionSMSComponent},  
  { path: 'gestionbenevoles/:id', component: GestionBenevolesComponent},
  { path: 'gestionevenements', component: GestionEvenementsComponent},
  { path: 'error', component: ErrorComponent},
//  { path: '**', redirectTo: 'error'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes,  { useHash: true })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
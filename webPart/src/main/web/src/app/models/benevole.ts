import { Croisement } from "./croisement";
import { Evenement } from './event';



export class Benevole {
  id: number;
  prenom: string;
  nom: string;
  classe: string;
  email: string;
  telephone: string;
  limite: number;
  croisements: Croisement[];
  commentaire: string;
  reponse: string;
  gateaux: string;
  evenement:Evenement;

  constructor(){
    this.croisements = []
  }
}
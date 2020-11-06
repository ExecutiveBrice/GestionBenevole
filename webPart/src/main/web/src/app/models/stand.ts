import { Croisement } from "./croisement";
import { Evenement } from './event';




export class Stand {
  id:number;
  nom: string;
  description:string;
  bulle:string;
  ordre:number;
  etat:number;
  croisements: Croisement[];
  evenement:Evenement;
}
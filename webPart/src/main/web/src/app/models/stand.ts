import { Croisement } from "./croisement";
import { Evenement } from './evenement';




export class Stand {
  id:number;
  nom: string;
  description:string;
  bulle:string;
  ordre:number;
  type:number;
  croisements: Croisement[];
  evenement:Evenement;
}
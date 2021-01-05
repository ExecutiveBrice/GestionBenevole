import { Creneau } from "./creneau";
import { Stand } from "./stand";
import { Benevole } from "./benevole";
import { Evenement } from './evenement';

export class Croisement {
  id:number;
  creneau: Creneau;
  stand: Stand;
  benevoles: Benevole[];
  selected:boolean;
  besoin:boolean;
  limite:number;
  evenement:Evenement;


}
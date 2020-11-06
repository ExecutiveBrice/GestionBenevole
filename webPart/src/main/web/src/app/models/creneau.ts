import { Evenement } from './event';



export class Creneau {
  id: number;
  plage: string;
  ordre:number;
  chevauchement:number[];
  evenement:Evenement;
  
}
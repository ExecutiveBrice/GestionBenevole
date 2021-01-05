import { Evenement } from './evenement';



export class Creneau {
  id: number;
  plage: string;
  ordre:number;
  chevauchement:number[];
  evenement:Evenement;
  
}
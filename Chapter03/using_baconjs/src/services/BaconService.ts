import {Service} from "typedi";
import * as Bacon from 'baconjs';

@Service()
export class BaconService{
    
    private productMap:any={
        1:"Mobile",
        2:"Telivision",
        3:"Book",
        4:"Tablet"
    }

    baconService(productId:number){
        return Bacon.constant(this.productMap[productId])
    }

}
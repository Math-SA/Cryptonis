export default class Coin {
    id: string;
    name: string;
    symbol: string;
    

    constructor (id: string, name:string=id, symbol:string=id){
        this.id = id;
        this.name = name;
        this.symbol = symbol;
    }

    public clone(){
        let clone = new Coin(this.id, this.name);
        clone.symbol = this.symbol;
        return clone;
    }

}
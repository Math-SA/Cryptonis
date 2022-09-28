export default class Coin {
    id: string;
    name: string;

    constructor (id: string, name:string=id){
        this.id = id;
        this.name = name;
    }

}
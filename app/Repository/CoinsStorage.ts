import Coin from "App/Model/Coin";

export default class CoinsStorage {

    private static storage: Array<Coin> = new Array<Coin>();
    private static updatedAt: number = 0;
    private static CACHE_DURATION = 3600*1000;//1hour = 3600 seconds = 3 600 000 millis

    public static store(currencies : Array<Coin>){
        CoinsStorage.storage = currencies;
        CoinsStorage.updatedAt = Date.now();
    }

    public static list() : Array<Coin>{
        return CoinsStorage.storage;
    }

    public static getExpirationDate(){
        return CoinsStorage.updatedAt + CoinsStorage.CACHE_DURATION;
    }
    
}
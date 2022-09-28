import Coin from "App/Model/Coin";
import CoinInfo from "App/Model/CoinInfo";



export default class CoinInfoStorage {

    private static storage: Map<string, CoinInfo> = new Map<string, CoinInfo>();
    private static CACHE_DURATION = 300;//5 minutes = 300 seconds 

    public store(coinInfo : CoinInfo){
        CoinInfoStorage.storage.set(coinInfo.coin.id, coinInfo);
    }

    public get(coinId : string) : CoinInfo| null{
        let info = CoinInfoStorage.storage.get(coinId)??null;
        return info;
    }

    
    // public list() : Array<CoinInfo>{
    //     return Array.from(CoinInfoStorage.storage.values());
    // }
    
    public getExpirationDate(coinId: string) : number {
        let coinInfo = CoinInfoStorage.storage.get(coinId);
        let expires = 0;
        if (coinInfo != null){
            expires = coinInfo.updatedAt + CoinInfoStorage.CACHE_DURATION;
        }
        return expires;
    }
    
}
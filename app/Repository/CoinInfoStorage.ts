import CoinInfo from "App/Model/CoinInfo";



export default class CoinInfoStorage {

    private static storage: Map<string, CoinInfo> = new Map<string, CoinInfo>();
    private static CACHE_DURATION = 300;//5 minutes = 300 seconds 

    public static store(coinInfo : CoinInfo){
        CoinInfoStorage.storage.set(coinInfo.coin.id, coinInfo.clone());
    }

    public static get(coinId : string) : CoinInfo| null{
        let info = CoinInfoStorage.storage.get(coinId)?.clone()??null;
        return info;
    }

        
    public static getExpirationDate(coinId: string) : number {
        let coinInfo = CoinInfoStorage.storage.get(coinId);
        let expires = 0;
        if (coinInfo != null){
            expires = coinInfo.updatedAt + CoinInfoStorage.CACHE_DURATION;
        }
        return expires;
    }
    
}
import Coin from "./Coin";
import CoinPrice from "./CoinPrice";

export default class CoinInfo {
    coin: Coin;
    prices: Array<CoinPrice>;
    updatedAt: number;


    constructor (coin: Coin, prices: Array<CoinPrice>, updatedAt: number){
            this.coin = coin;
            this.prices = prices;
            this.updatedAt = updatedAt;
    }

    public toJSON(){
        let prices = new Array<string>();
        this.prices.forEach((price)=>{
            prices.push(`"${price.currency}":${price.value}`);
        });
        return `{"coin":"${this.coin.id}", "current_price":{${prices.join(',')}}, "last_updated":${this.updatedAt} }`;
    }
    
    public clone(){
        let clone = new CoinInfo(this.coin.clone(), new Array<CoinPrice>(), this.updatedAt);
        this.prices.forEach((price)=>{
            clone.prices.push(price.clone());
        });
        
        return clone;
    }

}
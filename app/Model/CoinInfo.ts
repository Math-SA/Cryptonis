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
        let prices = new Array<any>();
        this.prices.forEach((price)=>{
            prices.push(`${price.currency}:${price.value}`);
        });
        return `{coin:"${this.coin.id}", current_price:{${prices.join(',')}}, last_updated:${this.updatedAt} }`;
    }
    

}
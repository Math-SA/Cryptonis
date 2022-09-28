export default class CoinPrice {
    coinId: string;
    currency: string;
    value: number;

    constructor (coin: string, currency: string, value: number){
        this.coinId = coin;
        this.currency = currency;
        this.value = value;
    }

}
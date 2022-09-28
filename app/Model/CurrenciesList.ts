export default class CurrenciesList {
    currencies: Array<string>;
    updatedAt: number;

    constructor (currencies: Array<string>, updatedAt: number){
        this.currencies = currencies;
        this.updatedAt = updatedAt;
    }

}
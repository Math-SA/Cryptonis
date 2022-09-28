import CoinGeckoCurrenciesService from "../CoinGeckoCurrenciesService";

export default class CurrencyValidator {
    public static async isValid(currencies: string) : Promise<boolean>{
        let selectedCurrencies = currencies.split(',');
        let validCurrencies = (await(CoinGeckoCurrenciesService.listCurrencies()))?.currencies;
        return selectedCurrencies.reduce((valid, currency)=>{
            return valid && (validCurrencies)?validCurrencies.includes(currency):false;
        },true);
    }
}
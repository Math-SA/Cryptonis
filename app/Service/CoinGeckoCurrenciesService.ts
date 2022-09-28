import CurrenciesList from "App/Model/CurrenciesList";
import CurrenciesStorage from "App/Repository/CurrenciesStorage";

const axios = require('Axios');

export default class CoinGeckoCurrenciesService {
    
    public async listCurrencies() : Promise<CurrenciesList | null>{
        let storage = new CurrenciesStorage();
        let currencies: CurrenciesList | null = null;
        if (Date.now() > storage.getExpirationDate()){
            let list = await this.retrieveCurrenciesList();
            if (list != null) {
                currencies = list;
                storage.store(currencies);
            }
        }
        if (currencies == null){
            currencies = storage.list();
        }
        return currencies;

    }

    private async retrieveCurrenciesList() : Promise<CurrenciesList | null>{
        let data = [];
        let success = true;
        try {
            console.log('retrieving remote data.');
            const res = await axios.get("https://api.coingecko.com/api/v3/simple/supported_vs_currencies");
            if (res.status = 200){
                data = res.data;
            }
        } catch (e) {
            success = false;
        }
        if (success){
            return new CurrenciesList(data, Date.now());
        }
        return null;
    }
}
import CurrenciesList from "App/Model/CurrenciesList";
import CurrenciesStorage from "App/Repository/CurrenciesStorage";
import Axios from 'axios';

export default class CoinGeckoCurrenciesService {
    
    public static async listCurrencies() : Promise<CurrenciesList | null>{
        let currencies: CurrenciesList | null = null;
        if (Date.now() > CurrenciesStorage.getExpirationDate()){
            let list = await CoinGeckoCurrenciesService.retrieveCurrenciesList();
            if (list != null) {
                currencies = list;
                CurrenciesStorage.store(currencies);
            }
        }
        if (currencies == null){
            currencies = CurrenciesStorage.list();
        }
        return currencies;

    }

    private static async retrieveCurrenciesList() : Promise<CurrenciesList | null>{
        let data = [];
        let success = true;
        let content : CurrenciesList | null = null;
        try {
            const res = await Axios.get("https://api.coingecko.com/api/v3/simple/supported_vs_currencies");
            if (res.status = 200){
                data = res.data;
            }
        } catch (e) {
            success = false;
        }
        if (success){
            content = new CurrenciesList(data, Date.now());
        }
        return content;
    }
}
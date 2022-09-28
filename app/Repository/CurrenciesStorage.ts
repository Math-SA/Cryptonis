import CurrenciesList from "App/Model/CurrenciesList";

export default class CurrenciesStorage {

    private static storage = new CurrenciesList([], 0);
    private static CACHE_DURATION = 300*1000;//5 minutes = 300 seconds = 300 000 millis

    public store(currencies : CurrenciesList){
        CurrenciesStorage.storage = currencies;
    }

    public list() : CurrenciesList{
        return CurrenciesStorage.storage;
    }

    public getExpirationDate(){
        return CurrenciesStorage.storage.updatedAt + CurrenciesStorage.CACHE_DURATION;
    }
    
}
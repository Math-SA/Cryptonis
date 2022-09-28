import Coin from "App/Model/Coin";
import CoinInfo from "App/Model/CoinInfo";
import CoinPrice from "App/Model/CoinPrice";
import CoinInfoStorage from "App/Repository/CoinInfoStorage";
import CoinGeckoCurrenciesService from "./CoinGeckoCurrenciesService";


const axios = require('Axios');

export default class CoinGeckoPriceService {

    public async getCoinFullInfo(coinId: string) : Promise<CoinInfo | null>{
        let coinInfo : CoinInfo|null = null;        
        if (Date.now()/1000 > CoinInfoStorage.getExpirationDate(coinId)){//!CoinGecko sends date info as time in seconds instead of millis
            
            coinInfo = await this.retrieveCoinInfo(coinId);
            if (coinInfo != null) {
                CoinInfoStorage.store(coinInfo);
            }
        }
        if (coinInfo == null){
            coinInfo = CoinInfoStorage.get(coinId);
        }
        return coinInfo;
    }

    private async retrieveCoinInfo(coinId:string) : Promise<CoinInfo| null>{
        let data = [];
        let success = true;
        try {
            let currencies = 'usd';
            let availableCurrencies = await CoinGeckoCurrenciesService.listCurrencies();
            if (availableCurrencies != null){
                currencies = availableCurrencies.currencies.join(',');
            }
            const res = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=${currencies}&include_last_updated_at=true`);
            if (res.status = 200){
                data = res.data;
            }
        } catch (e) {
            success = false;
        }

        if (success){
            return this.createCoinInfoFromResponse(data);
        }
        return null;

    }

    private createCoinInfoFromResponse(data) : CoinInfo | null{
        //data sample:
        // {
        //     "bitcoin": {
        //       "brl": 102880,
        //       "btc": 1,
        //       "last_updated_at": 1664327054
        //     }
        //   }

        let info : CoinInfo | null = null;
        let prices = new Array<CoinPrice>();
        let updatedAt = 0;
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                let coin = new Coin(key);      
                for (let currency in data[key]){
                    if (currency == 'last_updated_at'){
                        updatedAt = data[key][currency];
                    }
                    else {
                        prices.push(new CoinPrice(key, currency, data[key][currency]));
                    }
                }  
                info = new CoinInfo(coin, prices, updatedAt);//CoinGecko's response lists time in seconds instead of millis.
                break; //currently only handling one coin per request.
            }    
            
        }
        return info;
    }

}
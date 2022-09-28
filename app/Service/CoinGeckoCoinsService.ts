import Coin from "App/Model/Coin";
import CoinsStorage from "App/Repository/CoinsStorage";

    
const axios = require('Axios');

export default class CoinGeckoCoinsService {


    
    public static async listCoins() : Promise<Array<Coin> | null>{
        let coins: Array<Coin> | null = null;
        if (Date.now() > CoinsStorage.getExpirationDate()){
            let list = await CoinGeckoCoinsService.retrieveCoinsList();
            if (list != null) {
                CoinsStorage.store(list);
            }
        }else{
            console.log('listCoins: Using local source as it has not expired.');
        }
        if (coins == null){
            coins = CoinsStorage.list();
        }
        return coins;

    }

    private static async retrieveCoinsList() : Promise<Array<Coin> | null>{
        let data = [];
        let success = true;
        let content : Array<Coin> | null = null;
        try {
            console.log('updading coins list from external source')
            const res = await axios.get("https://api.coingecko.com/api/v3/coins/list");
            if (res.status = 200){
                data = res.data;
            }
        } catch (e) {
            success = false;
        }
        if (success){
            let coins = new Array<Coin>();
            for (let coin of data){
                coins.push(new Coin(coin['id'], coin['name'], coin['symbol']));
            }
            content = coins;
        }
        return content;
    }

}
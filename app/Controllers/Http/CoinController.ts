import CoinGeckoCoinsService from "App/Service/CoinGeckoCoinsService";

export default class CoinController {
    public async getValidCoins(){
        let coins = await CoinGeckoCoinsService.listCoins();
        let validCoins = new Array<string>();
        coins?.forEach((coin)=>{
            validCoins.push(coin.id);
        });
        return validCoins;
    }
}
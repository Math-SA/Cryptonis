import CoinGeckoCoinsService from "App/Service/CoinGeckoCoinsService";
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class CoinController {
    public async getValidCoins(ctx: HttpContextContract){
        let coins = await CoinGeckoCoinsService.listCoins();
        let validCoins = new Array<string>();
        coins?.forEach((coin)=>{
            validCoins.push(coin.id);
        });
        return validCoins;
    }
}
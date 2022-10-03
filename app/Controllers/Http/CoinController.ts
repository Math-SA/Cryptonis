import { HttpContext } from "@adonisjs/core/build/standalone";
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

    public async filterCoins(ctx: HttpContext){
        let part = ctx.params.part;
        let coins = await CoinGeckoCoinsService.listCoins();
        let result = coins?.filter(coin=>coin.id.includes(part) || coin.name.includes(part) || coin.symbol.includes(part));
        return result;
    }
}
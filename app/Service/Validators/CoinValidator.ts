import CoinGeckoCoinsService from "../CoinGeckoCoinsService";


export default class CoinValidator {
    public static async isValid(coins: string) : Promise<boolean>{
        let selectedCoins = coins.split(',');
        let validCoins = (await(CoinGeckoCoinsService.listCoins()));
        return selectedCoins.reduce((valid, currency)=>{
            return valid && (validCoins)?validCoins.map(coin=> coin.id).includes(currency):false;
        },true);
    }
}
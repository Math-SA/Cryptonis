import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CoinGeckoCurrenciesService from 'App/Service/CoinGeckoCurrenciesService'
import CoinGeckoPriceService from 'App/Service/CoinGeckoPriceService'

export default class PriceController {
    public async index(ctx: HttpContextContract) {
        let coinInfo : string | undefined = '';
        //return new CoinGeckoCurrenciesService().listCurrencies();
        console.log(ctx.params);
        let coin = ctx.params.coin;
        let currencies = ctx.params.currencies;
        if (coin){
            //get prices for this coin
            console.log(`Price controller - getting price for ${coin}`)
            if (currencies){
                console.log(`Price controller - currency filter set to ${currencies}`)
            }else{
                console.log('Price controller - no currency filter. Listing all.');
            }
            coinInfo = (await new CoinGeckoPriceService().getCoinFullInfo(coin))?.toJSON();
        }else{
            // get prices for bitcoin
            console.log(`Price controller - No coin has been selected... getting price for ${coin}`)
            if (currencies){
                console.log(`Price controller - currency filter set to ${currencies}`)
            }else{
                console.log('Price controller - no currency filter. Listing all.');
            }
            coinInfo = (await new CoinGeckoPriceService().getBitCoinInfo())?.toJSON();
        }

        
        return coinInfo;
        
    }
}
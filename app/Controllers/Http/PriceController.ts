import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CoinGeckoPriceService from 'App/Service/CoinGeckoPriceService'
import CoinInfo from 'App/Model/CoinInfo';
import CurrencyValidator from 'App/Service/Validators/CurrencyValidator';
import CoinValidator from 'App/Service/Validators/CoinValidator';

export default class PriceController {

    public async getPrices(ctx: HttpContextContract) {
        let content = '{}';
        let coinInfo : CoinInfo | null = null;

        let coin = ctx.params.coin;
        if (!coin){
            coin = 'bitcoin';
        }
        let currencies = ctx.params.currencies;
        if (!(await CoinValidator.isValid(coin))){
            ctx.response.status(400);
            content = `{"error":"${coin} data is not available"}`;
        }else if (currencies && !(await CurrencyValidator.isValid(currencies))){
            ctx.response.status(400);
            content = `{"error":"currencies data for ${currencies} is not available"}`;
        }else{
            coinInfo = (await new CoinGeckoPriceService().getCoinFullInfo(coin));
            if (currencies){
                if (coinInfo != null){
                    let selectedCurrencies = currencies.split(',');
                    coinInfo.prices = coinInfo.prices.filter((price)=>{
                        return selectedCurrencies.includes(price.currency);
                    });
                }
            }
            if (coinInfo==null){
                ctx.response.status(400);
                content = `{"error":"unable to find info for ${coin}" }`;
            }else{
                ctx.response.status(200);
                content = coinInfo?.toJSON();
            }
        }
        
        return content;
    }
}
Devplay Challenge - AdonisJS based API consuming CoinGecko's API for simple Bitcoin information


Data provided by CoinGecko.


## Live deploy
https://devplay-cryptonis.onrender.com

### Examples
<a href="https://devplay-cryptonis.onrender.com/price/bitcoin/">https://devplay-cryptonis.onrender.com/price/bitcoin/ <= Bitcoin info </a>
<a href="https://devplay-cryptonis.onrender.com/price/bitcoin/usd,eth">https://devplay-cryptonis.onrender.com/price/bitcoin/usd,eth <= Bitcoin price in USD and ETH</a>

## Endpoints usage instructions
[GET] /coins <= Returns a list of all tracked coins

[GET] /price/<coin> <= Returns data for a given coin 

[GET] /price/<coin>/<currencies> <== filters data for a given coin to only show the selected currencies (comma separated)

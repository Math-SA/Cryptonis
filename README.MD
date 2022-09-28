Devplay Challenge - AdonisJS based API consuming CoinGecko's API for simple Bitcoin information<br/>


Data provided by CoinGecko.<br/>


## Live deploy<br/>
https://devplay-cryptonis.onrender.com <br/>

### Examples<br/>
<a href="https://devplay-cryptonis.onrender.com/price/bitcoin/">https://devplay-cryptonis.onrender.com/price/bitcoin/ <= Bitcoin info </a><br/>
<a href="https://devplay-cryptonis.onrender.com/price/ethereum/usd,btc">https://devplay-cryptonis.onrender.com/price/ethereum/usd,btc <= Ethereum price in USD and BTC</a><br/>

## Endpoints usage instructions<br/>
[GET] /coins <= Returns a list of all tracked coins<br/>

[GET] /price/$coin <= Returns data for a given coin <br/>

[GET] /price/$coin/$currencies <== filters data for a given coin to only show the selected currencies (comma separated)<br/>

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.on('/').redirect('price.show', {coin:'bitcoin'});

Route.get('/price/:coin?/:currencies?', 'PriceController.getPrices').as('price.show');

Route.get('/coins/', 'CoinController.getValidCoins').as('coins.list');

Route.get('/coins/:part', 'CoinController.filterCoins');

Route.get('/ping', (ctx)=>{
    ctx.response.status(200);
    ctx.response.send('pong');
});
/**
 * Copyright (c) 2021
 *
 * @summary Script that runs crypto bot
 * @author Louis Nguyen
 *
 * Created at     : 2021-08-08 11:04:56
 */

require('dotenv').config();

const fs = require('fs');
const lib = require('./lib');

const key = process.env.API_KEY;
const secret = process.env.SECRET_API_KEY;
const passphrase = process.env.PASSPHRASE;

const sandBoxUSDACC = process.env.SANDBOX_USD;
const keySandbox = process.env.API_KEY_SANDBOX;
const secretSandBox = process.env.SECRET_API_KEY_SANDBOX;
const passphraseSandbox = process.env.PASSPHRASE_SANDBOX;
const apiURI = 'https://api.pro.coinbase.com';
const sandboxURI = 'https://api-public.sandbox.pro.coinbase.com';

const CoinbasePro = require('coinbase-pro');
const websocket = new CoinbasePro.WebsocketClient(
  ['BTC-USD'],
  'wss://ws-feed-public.sandbox.pro.coinbase.com',
  {
    key: keySandbox,
    secret: secretSandBox,
    passphrase: passphraseSandbox,
  },
  { channels: ['ticker'] }
);

// const authedClient = new CoinbasePro.AuthenticatedClient(
//   key,
//   secret,
//   passphrase,
//   apiURI
// );

const sandBoxClient = new CoinbasePro.AuthenticatedClient(
  keySandbox,
  secretSandBox,
  passphraseSandbox,
  sandboxURI
);
let currentFillPrice = (async () => {
  let arr = await retrieveFills();
  return arr;
})();

websocket.on('message', (data) => {
  if ('price' in data) {
    (async () => {
      let myFillPrice = (await currentFillPrice)[0];
      //console.log(lib.getPercentageChange(myFillPrice.price, data.price));
      if (lib.getPercentageChange(myFillPrice.price, data.price) >= 10) {
        let toSell = myFillPrice.size * 0.1;
        sandBoxClient.sell(lib.buySellParam(toSell, 'BTC'), lib.logData);
        lib.writeToSell(toSell);
        currentFillPrice = data.price;
      } else if (
        lib.getPercentageChange(myFillPrice.price, data.price) <= -10
      ) {
        let toBuy = myFillPrice.size * 0.1;
        sandBoxClient.buy(lib.buySellParam(toBuy, 'BTC'), lib.logData);
        lib.writeToBuy(toBuy);
        currentFillPrice = data.price;
      }
    })();
  }
});

async function retrieveFills() {
  const toReturn = await sandBoxClient.getFills(lib.productID('BTC-USD'));
  return toReturn;
}

function sandBoxCashInjection() {
  const depositParamsUSD = {
    amount: '100000.00',
    currency: 'USD',
    coinbase_account_id: sandBoxUSDACC, // USD Coinbase Account ID
  };
  for (let index = 0; index < 10; index++) {
    sandBoxClient.deposit(depositParamsUSD, lib.logData());
  }
}

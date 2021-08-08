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

websocket.on('message', (data) => {
  console.log(data);
  let jsonData = JSON.stringify(data, null, 4);
  fs.appendFile('./orderLogs/log.txt', jsonData, function (err) {
    if (err) {
      console.log(err);
    }
  });
});
lib.retrieveCoinBaseAccount(sandBoxClient, 'BTC');

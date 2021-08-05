require('dotenv').config();

const CoinbasePro = require('coinbase-pro');
const key = process.env.API_KEY;
const secret = process.env.SECRET_API_KEY;
const passphrase = process.env.PASSPHRASE;

const keySandbox = process.env.API_KEY_SANDBOX;
const secretSandBox = process.env.SECRET_API_KEY_SANDBOX;
const passphraseSandbox = process.env.PASSPHRASE_SANDBOX;

const apiURI = 'https://api.pro.coinbase.com';
const sandboxURI = 'https://api-public.sandbox.pro.coinbase.com';

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

function retrieveAccount(client, currency) {
  client.getAccounts((error, response, data) => {
    if (error) {
      console.log(error);
    } else {
      data.forEach((element) => {
        if (element.currency === currency) {
          console.log(element);
        }
      });
    }
  });
}

function retrieveCoinBaseAccount(client, currency) {
  client.getCoinbaseAccounts((error, response, data) => {
    if (error) {
      console.log(error);
    } else {
      data.forEach((element) => {
        if (element.currency === currency) {
          console.log(element);
        }
      });
    }
  });
}

const convertParams = {
  from: 'USD',
  to: 'USDC',
  amount: '5',
};

const params = {
  size: '4',
  price: '39330',
  side: 'buy',
  product_id: 'BTC-USD',
};

const buyParams = {
  price: '100.00', // USD
  size: '1', // BTC
  product_id: 'BTC-USD',
};

const depositParamsUSD = {
  amount: '100000.00',
  currency: 'USD',
  coinbase_account_id: 'bcdd4c40-df40-5d76-810c-74aab722b223', // USD Coinbase Account ID
};

// for (let index = 0; index < 50; index++) {
//     sandBoxClient.deposit(depositParamsUSD, (error, response, data) => {
//       if (error) {
//         console.log(error);
//       } else {
//         console.log(data);
//       }
//     });
// }

// sandBoxClient.placeOrder(params, (error, response, data) => {
//   if (error) console.log(error);
//   else {
//     console.log(data);
//   }
// });

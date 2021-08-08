/**
 * Copyright (c) 2021
 *
 * @summary Script that runs crypto bot
 * @author Louis Nguyen
 *
 * Created at     : 2021-08-08 11:04:56
 */

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

function buyParam(price, size, product_id) {
  return { price, size, product_id };
}

function depositParam(amount, currency, coinbase_account_id) {
  return { amount, currency, coinbase_account_id };
}

function convertParam(from, to, amount) {
  return { from, to, amount };
}

function getPercentageChange(a, b) {
  let percent;
  if (b !== 0) {
    if (a !== 0) {
      percent = ((b - a) / a) * 100;
    } else {
      percent = b * 100;
    }
  } else {
    percent = -a * 100;
  }
  return Math.floor(percent);
}

function logData() {
  return (error, response, data) => {
    if (error) console.log(error);
    else {
      console.log(data);
    }
  };
}

/*const convertParams = {
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


*/

module.exports = {
  retrieveAccount,
  retrieveCoinBaseAccount,
  depositParam,
  buyParam,
  convertParam,
  getPercentageChange,
  logData,
};

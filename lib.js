/**
 * Copyright (c) 2021
 *
 * @summary Tools to help crypto bot
 * @author Louis Nguyen
 *
 * Created at     : 2021-08-08 11:04:56
 */
require('dotenv').config();

const fs = require('fs');

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

function buySellParam(size, product_id) {
  return { size, product_id, type: 'market' };
}

function depositParam(amount, currency, coinbase_account_id) {
  return { amount, currency, coinbase_account_id };
}

function convertParam(from, to, amount) {
  return { from, to, amount };
}

function productID(product_id) {
  return { product_id };
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
function writeToBuy(amount, bal, currency) {
  if (!fs.existsSync('./orderLogs')) {
    fs.mkdirSync('./orderLogs', { recursive: true });
    fs.writeFileSync('./orderLogs/buyLog.txt', '');
  }
  let toAdd = { amount, date: new Date(), bal, currency };
  let jsonData = JSON.stringify(toAdd, null, 4);
  fs.appendFile('./orderLogs/buyLog.txt', jsonData, function (err) {
    if (err) {
      console.log(err);
    }
  });
}

function writeToSell(amount, bal, currency) {
  if (!fs.existsSync('./orderLogs')) {
    fs.mkdirSync('./orderLogs', { recursive: true });
    fs.writeFileSync('./orderLogs/sellLog.txt', '');
  }
  let toAdd = { amount, date: new Date(), bal, currency };
  let jsonData = JSON.stringify(toAdd, null, 4);
  fs.appendFile('./orderLogs/sellLog.txt', jsonData, function (err) {
    if (err) {
      console.log(err);
    }
  });
}

module.exports = {
  retrieveAccount,
  retrieveCoinBaseAccount,
  depositParam,
  buySellParam,
  convertParam,
  getPercentageChange,
  logData,
  productID,
  writeToBuy,
  writeToSell,
};

require('dotenv').config();

const CoinbasePro = require('coinbase-pro');
const key = process.env.API_KEY;
const secret = process.env.SECRET_API_KEY;
const passphrase = process.env.PASSPHRASE;

const apiURI = 'https://api.pro.coinbase.com';
const sandboxURI = 'https://api-public.sandbox.pro.coinbase.com';

const authedClient = new CoinbasePro.AuthenticatedClient(
  key,
  secret,
  passphrase,
  apiURI
);

function retrieveAccount(currency) {
  authedClient.getAccounts((error, response, data) => {
    if (error) {
      console.log(error);
    } else {
      data.forEach((element)=>{
        if(element.currency===currency){
            console.log(element);
        }
      })
    }
  });
}

retrieveAccount('ADA')

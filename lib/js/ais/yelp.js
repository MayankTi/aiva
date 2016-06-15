//Yelp apis

// dependencies
var _ = require('lomath');
var Promise = require('bluebird');
var Yelp = require('node-yelp');

//create client
/*
TO-USE:
Consumer API key for yelp: BXbZ1VtzozoDdbghwq1vRA
Token: Jeh3hM0h0EZ07rmgl4DtRJKm0Cyk9k61
Token Secret: GeeNOqR0Uw6ESHUdKVp_i0zIx_A
-----------------------------------------------------------------
Consumer Key :  
hPuDVHitavCppNsK_gNBmA
Consumer Secret     
l3t8ooF7I_AmhWvo0z9QtidQyPs
            Token	jDKYcOaokqGreS0VCHxFFa8c5QHxnULM
Token Secret
dCVNzx4NpF7jkOuem-v-Jj0H-5I
*/
var client = Yelp.createClient({
  oauth: {
    "consumer_key": "hPuDVHitavCppNsK_gNBmA",
    "consumer_secret": "l3t8ooF7I_AmhWvo0z9QtidQyPs",
    "token": "jDKYcOaokqGreS0VCHxFFa8c5QHxnULM",
    "token_secret": "dCVNzx4NpF7jkOuem-v-Jj0H-5I"
  },
  
  // Optional settings: 
  httpClient: {
    maxSockets: 25  // ~> Default is 10 
  }
});

//expose the yelp cleint
var yelpClient = client;
Promise.promisifyAll(yelpClient);

var yelp = {
	yelpClient: yelpClient
}

module.exports = yelp;
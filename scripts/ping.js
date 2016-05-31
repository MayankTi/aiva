// dependencies
// Module to ping the robot and get basic info
var _ = require('lomath')
var fs = require('fs')
var pp_prods = require('./pp_prods')
var slackAtt = require('../lib/js/slack_att')
var cnet = require('../lib/js/ais/conceptnet')

// quick test scripts
module.exports = function(robot) {
  // ensure bot name
  robot.respond(/who\s*are\s*you/i, function(res) {
    res.send(robot.name)
  })

  // check res object for dev and debug
  robot.respond(/my\s*id/i, function(res) {
    res.send(JSON.stringify(_.omit(res, 'robot'), null, 2))
  })

  // check the current NODE_ENV mode: development or production
  robot.respond(/node\s*env/i, function(res) {
    res.send('This is in ' + process.env.NODE_ENV + ' mode.')
  })

  // write the runtime brain to output
  robot.respond(/write brain/i, function(res) {
    fs.writeFile(__dirname + '/../brain.json', JSON.stringify(robot.brain.data))
    res.send("Brain written to output.")
  })

  //Response to hi
  robot.respond(/hi\s*/i, function(res) {
    res.send(getResponseHi());
  })

  //Response for paypal products
  robot.respond(/(...paypal|...products|...all products|...all product|...paypal products|...products paypal|paypal products|products paypal|all paypal products|all products|all paypal|paypal all)[a-zA-Z]*/i,
    function(res) {
      var att = slackAtt.gen(res, getAllPPProducts(), false)
      robot.adapter.customMessage(att)
    })

  robot.respond(/c\/en\/[a-zA-Z ]*/i, function (res) {
    var word = res.match[0].split(" ")[1].trim()
    cnet.lookup("/"+word , {
     limit: 2,
     offset: 0
    }, function onDone(err, resp) {
      if (err) {console.log(err)}
      else {
        res.send(JSON.stringify(resp))
      }
    })
    //resp = JSON.stringify(resp)
    //console.log(resp)
    //res.send(resp)
  })

  var getResponseHi = function () {
    var decide = Math.ceil(Math.random()*100);
    if (decide < 25 ) {
      return 'Hello!';
    } else if (decide < 50 ) {
      return 'Hi! this is '+ robot.name ;
    } else {
      return 'Hello there!'
    }
  }

  var getAllPPProducts = function() {
      return [{"fallback":"Web Payments","color":"blue","title":"Web Payments","fields":[{"value":"PayPal Express Checkout"},{"value":"PayPal Payments Standard"},{"value":"PayPal Payments Pro"}]},{"fallback":"Compare Solutions","color":"white","title":"Compare Solutions","fields":[{"value":"Online Invoicing"},{"value":"PayPal Online Invoicing"}]},{"fallback":"In-Store Payments","color":"pink","title":"In-Store Payments","fields":[{"value":"PayPal Here"},{"value":"Point of Sale (POS) Solutions"}]},{"fallback":"Mobile Payments","color":"voilet","title":"Mobile Payments","fields":[{"value":"PayPal Here"}]},{"fallback":"Developers","color":"purple","title":"Developers","fields":[{"value":"Braintree v.zero"},{"value":"PayPal Developers"},{"value":"PayPal Here SDK"}]},{"fallback":"Other Products","color":"indigo","title":"Other Products","fields":[{"value":"PayPal Working Capital"},{"value":"PayPal Credit"},{"value":"Promotional Financing"},{"value":"PayPal Business Debit MasterCard"},{"value":"Digital Goods"},{"value":"Fundraising"},{"value":"Mass Payment"},{"value":"PayFlow Payment Gateway"},{"value":"Virtual Terminal"}]},{"fallback":"Industry Solutions","color":"warning","title":"Industry Solutions","fields":[{"value":"Nonprofits"},{"value":"Education"},{"value":"Political Campaigns"},{"value":"Government"},{"value":"Enterprise"}]},{"fallback":"Partner Solutions","color":"blue","title":"Partner Solutions","fields":[{"value":"Shopping Cart"},{"value":"3rd-party products and services for your business"}]}]  
    }
    
}

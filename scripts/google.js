// dependencies
var _ = require('lomath')
var ai = require('../lib/js/ai')
var slackAtt = require('../lib/js/slack_att')

// export for bot
/* istanbul ignore next */
module.exports = function(robot) {
  // menu
  robot.respond(/google$/i, function(res) {
    res.send('`google <query>`')
  })

  // menu
  robot.respond(/googlekb$/i, function(res) {
    res.send('`googlekb <query>`')
  })

  // find out details about users matching the search keyword
  robot.respond(/google\s+(.+)/i, function(res) {
    var query = res.match[1]
    // call google kg search
    ai.google.gsearchAsync(query)
    .then(function(results) {
      // format and send slack attachments
      att = slackAtt.gen(res, results, slackAtt.gsearchParser)
      robot.adapter.customMessage(att)
    }).catch(console.log)
  })

  // find out details about users matching the search keyword
  robot.respond(/googlekb\s+(.+)/i, function(res) {
    var keyword = res.match[1]
    var params = { query: keyword, limit: 5 };
    // call google kg search
    ai.google.kgsearch.entities.searchAsync(params)
    .then(function(results) {
      // format and send slack attachments
      att = slackAtt.gen(res, results, slackAtt.gkgParser)
      robot.adapter.customMessage(att)
    }).catch(console.log)
  })

  // find out nearby places
  // https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&type=restaurant&name=cruise&key=AIzaSyAQtYoniD4RyLCuRNut111ZPL1k0rKpY0U
  // googlenb lati longi rankbydistance
  // googlenb 12.945864 77.717506
  // googlenb 22.737356 75.889217
  robot.respond(/googlenb\s*(.+)/i, function(res) {
    
    var keyword = res.match[1]
    var key = (keyword?keyword.split(" "):[])
    
    //default values
    var type = 'restaurant',
      latitude= 12.945864,  //22.737356, 
      longitude =  77.717506, //75.889217;
      radius = 1000,
      rank_by = '';
    
    //check validity of request
    if (key && key.length===1) {
      var place = key[0]
      //revergeocode for place
      ai.google.geocoder.geocodeAsync(place).then(function(results) {
        console.log(results)
      }).catch(console.log)


    } else if (key && key.length>=2) {
      latitude = key[0],
      longitude = key[1],
      radius = key[2] || radius,
      rank_by = key[3] || ''
    } else {
      res.send('googlenb <latitude> <longitude> <radius> <rank_by: (prominance || distance)>')
      return
    }

    //prepare the request
    if (rank_by && (rank_by.toLowerCase() === 'prominance' ||
        rank_by.toLowerCase() === 'distance')) {
        var params = {
          location: ''+latitude+','+longitude,//''49.250964,-123.102192',
          rankby: rank_by,
          type: type
        }; 
    } else {
      var params = {
        location: ''+latitude+','+longitude,//''49.250964,-123.102192',
        radius: radius,
        type: type
      };
    }
    
    // call google nearbyPlaces search
    ai.google.nearbyPlaces.nearbySearch(params, (err, results) => {
      if (err) {
        console.log(err)
        res.send(err.toString())
      }
      if (results && results.body && results.body.status === 'ZERO_RESULTS') {
        res.send('No restaurants found')
        return
      }
      // format and send slack attachments
      //res.send(results)
      att = slackAtt.gen(res, results.body, slackAtt.gnbParser)
      robot.adapter.customMessage(att)
    })
  })


}

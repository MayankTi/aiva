var _ = require('lomath')
var ai = require('../lib/js/ai')
var slackAtt = require('../lib/js/slack_att')

module.exports = function(robot) {
	// menu
	robot.respond(/yelp$/i, function(res) {
	res.send('`yelp <latitude> <longitude>`')
	})

	robot.respond(/yelp\s*(.+)/i, function(res) {
	    
	    var keyword = res.match[1];
	    var key = (keyword?keyword.split(" "):[]);

	    var latitude = 37.788022,
	    	longitude = -122.399797;

	    if (key && key.length>=2) {
	    	// go isNan check on lat and longi
	    	latitude= key[0],
	    	longitude= key[1];
	    } else {
	    	res.send('`yelp <latitude> <longitude>`')
	    }

	    //sort 0=Best matched (default), 1=Distance, 2=Highest Rated
	    var params = {
	    	ll: ''+latitude+','+longitude, //or location: 'San Francisco'
	    	term: "restaurants",
	    	limit: 10,
	    	sort: 1,
	    	radius_filter: 10000
	    }

		ai.yelp.yelpClient.search(params).then( function(results) {
			console.log(JSON.stringify(results))
			att = slackAtt.gen(res, results, slackAtt.yelpParser)
		 	robot.adapter.customMessage(att)
		}).catch(function (err) {
			console.log(err)
			res.send(err.toString())
		})
	})
}
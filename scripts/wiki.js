var _ = require('lomath')
var ai = require('../lib/js/ai')
var slackAtt = require('../lib/js/slack_att')

module.exports = function(robot) {
	// menu
	robot.respond(/wiki$/i, function(res) {
	res.send('`wiki <search_param>`')
	})

	robot.respond(/wiki\s*(.+)/i, function(res) {
	    
	    var keyword = res.match[1];
	    var key = (keyword?keyword.split(" "):[]);

		ai.wiki.page.data(keyword, { content: true }, function(results) {
			/*if (err) {
				console.log(err)
				res.send(err.toString())
			}*/
			console.log(JSON.stringify(results))
			att = slackAtt.gen(res, results, slackAtt.yelpParser)
		 	robot.adapter.customMessage(att)
		})
	})
}
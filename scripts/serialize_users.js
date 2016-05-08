// dependencies
// Module to serialize users
var _ = require('lomath')
var co = require('co')


// The function to serialize users from the brain to the KB. Invoked by user call or new user entering.
// This only updates fields and does not delete any, so that user node is save for other purposes.
function serialize_users(slackUsers) {
  // get the list of users parsed by Slack adapter
 var slackUsers = robot.brain.data.users
  // legalize it for KB use
  var Users = _.map(slackUsers, function(obj) {
    var lobj = cons.legalize(obj, 'id')
    var label = 'user'
    return [
      [lobj, label]
    ]
  });
  // add then return the number of members serialized
  return co(function*() {
    return yield KB.addNode(Users).then(_.size).catch(console.log)
  })

}


// export for bot
module.exports = function(robot) {
  // serialize on event
  robot.on('serialize_users', function() {
    // !skip for now, need to generalize and split cases like customMsg
    /* istanbul ignore next */
    if (robot.adapterName == 'telegram') {
      return
    } else if (robot.adapterName == 'fb') {
      return
    }
    serialize_users(robot.brain.data.users).then(function(size) {
      console.log("setting global.users from scripts/serialize_users.js")
    })
  })

  // manually call serialize_users
  robot.respond(/serialize users/i, function(res) {
    res.send('Serialize users')
    robot.emit('serialize_users')
  })

  // on a new user entering default room, re-serialize users
  robot.enter(function(res) {
    res.send(`Welcome ${res.envelope.user.name}, I am ${robot.name}. See what I can do by typing \`${robot.name} help\`. Meanwhile let me add you to my KB...`)
    robot.emit('serialize_users')
  })

}

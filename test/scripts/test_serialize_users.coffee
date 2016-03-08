helper = new Helper('../scripts/serialize_users.js')

# test ping script
describe 'scripts/serialize_users.js', ->
  beforeEach ->
    # creating room with 'httpd: false' will auto tear-down
    @room = helper.createRoom(httpd: false, name: global.defaultRoom)
    @robot = @room.robot
    _.set @robot, 'brain.data.users', users


  # Test
  context 'robot.on(serialize_users)', ->
    # response
    it 'serialize_users()', ->
      co =>
        @robot.emit 'serialize_users'
        # allow time for message to get through and handled
        yield delayer()
        # emit the 'serialize' event
        @room.messages.should.eql [
          ['hubot', 'Serialized 3 users.']
        ]
 

  # Test
  context 'user: serialize_users; invoke emit()', ->
    beforeEach ->
      co =>
        @spySer = sinon.spy()
        @room.robot.on 'serialize_users', @spySer
        yield @room.user.say 'alice', '@hubot serialize users'

    it 'robot.emit(serialize_users); hubot: Serializing users...', ->
      sinon.assert.calledOnce @spySer
      # and event emitted
      @room.messages.should.eql [
        ['alice', '@hubot serialize users']
        ['hubot', 'Serializing users...']
      ]


  # Test
  context 'user.enter() from "defaultRoom"; invoke emit()', ->
    beforeEach ->
      co =>
        @spySer = sinon.spy()
        @room.robot.on 'serialize_users', @spySer
        yield @room.user.enter 'alice'

    it 'robot.emit(serialize_users); hubot: Serializing users...', ->
      sinon.assert.calledOnce @spySer
      # and event emitted
      @room.messages.should.eql [
        ['hubot', 'Welcome alice, I am hubot. See what I can do by typing `hubot help`. Meanwhile let me add you to my KB...']
      ]


  # Test
  context 'user.enter() from "not_defaultRoom"; no invocation', ->
    beforeEach ->
      co =>
        @spySer = sinon.spy()
        @room.name = 'not_defaultRoom'
        @room.robot.on 'serialize_users', @spySer
        yield @room.user.enter 'alice'

    it 'robot should not emit()', ->
      @spySer.called.should.equal.false
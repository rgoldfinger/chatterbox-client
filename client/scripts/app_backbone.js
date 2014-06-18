
var Message = Backbone.Model.extend({

  initialize: function(message){
    this.text = message.text;
    this.username = message.username;
    this.roomname = message.roomname;
  },

  getText: function(){
    return _.escape(this.text);
  },

  getUsername: function(){
    return _.escape(this.username);
  },

  getRoomname: function(){
    return _.escape(this.roomname);
  }
});

var MessageView = Backbone.View.extend({
  render: function(){
    var html = '<p class="chat">' +
                 '<a href="#" class="username">' + this.model.getUsername() + '</a>' +
              ': ' + this.model.getText() + '</p>';
    return this.$el.html(html);
  }
});

var Messages = Backbone.Collection.extend({

  model: Message,

  initialize: function(){
    this.server = 'https://api.parse.com/1/classes/chatterbox';
    setInterval(function(){
      this.getMessagesFromServer();
    }.bind(this), 1000);
  },

  getMessagesFromServer: function(){
    var _this = this;
    var urlOptions = '?order=-createdAt';
    $.ajax({
      url: _this.server + urlOptions,
      type: 'GET',
      success: function(data){
        _this.processMessageData(data.results);
      },
      error: function(data){
        console.error(":'{");
      }
    });
  },

  processMessageData: function(data){
    var messages = _.map(data, function(msg){
      return new Message(msg);
    });
    this.set(messages);
    show();
  }
});

var MessagesView = Backbone.View.extend({
  initialize: function() {

  },

  render: function() {
    var messageNodes = this.collection.map(function(msg) {
      var messageView = new MessageView({model: msg});
      return messageView.render();
    }.bind(this));
    return this.$el.append(messageNodes);
  }

});


var show;

$(function(){
  var messages = new Messages();

  var messagesView = new MessagesView({collection: messages});

  show = function () {


    $('#chats').append(messagesView.render());
  };
});





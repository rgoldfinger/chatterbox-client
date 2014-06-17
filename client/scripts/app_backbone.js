// var Chatter = Backbone.Model.extend({

//   initialize: function(){
//     this.chats = {};
//     this.server =  'https://api.parse.com/1/classes/chatterbox';
//   },

//   getAllMessages: function() {
//     var urlOptions = '?order=-createdAt';
//     var _this = this;

//     $.ajax({
//       url: _this.server + urlOptions,
//       type: 'GET',
//       success: function(data){
//         _this.processFetchedData(data);

//       },
//       error: function(data){
//         console.error("looks like we're all alone in the universe...");
//       }
//     });
//   },

//   processFetchedData: function(data) {
//     this.chats = data.results;


//   }

// });

// var ChatterView = Backbone.View.extend({
//   initialize: function() {

//   },
//   generateMessageHTML: function() {

//   },
//   render: function() {
//     _.map()

//   }
// });

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

var msg = {
  text: "hellow",
  username: "whatever",
  roomname: "havefun"
};

$('document').ready(function(){
  var message = new Message(msg);

  var messageView = new MessageView({model: message});

  $('#chats').append(messageView.render());
});





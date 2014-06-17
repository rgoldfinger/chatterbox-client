var Chatter = Backbone.Model.extend({

  initialize: function(){
    this.chats = {};
    this.server =  'https://api.parse.com/1/classes/chatterbox';
  },

  getAllMessages: function() {
    var urlOptions = '?order=-createdAt';
    var _this = this;

    $.ajax({
      url: _this.server + urlOptions,
      type: 'GET',
      success: function(data){
        _this.processFetchedData(data);

      },
      error: function(data){
        console.error("looks like we're all alone in the universe...");
      }
    });
  },

  processFetchedData: function(data) {
    this.chats = data.results;


  }

});

var ChatterView = Backbone.View.extend({
  initialize: function() {

  },
  generateMessageHTML: function() {

  },
  render: function() {
    _.map()

  }
});


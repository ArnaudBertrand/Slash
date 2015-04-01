var SHOW_CONNECTION_ISSUE_KEY = 'showConnectionIssue';
Session.setDefault(SHOW_CONNECTION_ISSUE_KEY, false);

var CONNECTION_ISSUE_TIMEOUT = 5000;

Meteor.startup(function () {
  // Check connexion issues
  setTimeout(function () {
    // Show the connection error box
    Session.set(SHOW_CONNECTION_ISSUE_KEY, true);
  }, CONNECTION_ISSUE_TIMEOUT);
});


Template.appBody.rendered = function (){
  // Handle transition in body
  this.find('#content-container')._uihooks = {
    insertElement: function(node, next) {
      $(node)
        .hide()
        .insertBefore(next)
        .fadeIn();
    }
  };  
};

Template.appBody.helpers({
  thisArray: function() {
    return [this];
  }
});

$(window).on('beforeunload', function(){
    socket.close();
});
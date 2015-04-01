var ERROR_KEY = 'addNewSlashErrors';
var ERROR_USER_NOT_CONNECTED = 'User not connected, please login.';
var ERROR_MESSAGE_TOO_SHORT = 'Message too short, at least 10 characters.';
var SHOW_ADD_NEW_SLASH = 'showAddNewSlash';

Template.addSlash.created = function() {
  Session.set(ERROR_KEY, '');
};

Template.addSlash.helpers({
  errorMessage: function() {
    return Session.get(ERROR_KEY);
  },
  userPicture: function(){
    var picture = null;
    // Get the picture of current user
    if(Meteor.userId()){
      var user = Meteor.users.findOne({_id: Meteor.userId()});
      if(typeof user !== 'undefined'){
        picture = profileImage.findOne({_id: user.img});
      }
    }
    return picture;
  },
  nbMessage: function(){
    var nb = 0;
    // Get user nb of messages
    if(Meteor.userId()){
      var user = Meteor.users.findOne({_id: Meteor.userId()},{nbMessage: 1});
      nb = user.nbSlash;
    }
    return nb;
  }
});

Template.addSlash.destroyed = function(){
  $('.add-new-slash i').removeClass("fa-minus");
  $('.add-new-slash i').addClass("fa-plus");  
}

var resetAddNewSlash = function(template){
  $('.add-new-slash i').removeClass("fa-minus");
  $('.add-new-slash i').addClass("fa-plus");
  template.$('.add-slash-form').slideUp("slow");
  template.$('#slash-message').val('');
  Session.set(SHOW_ADD_NEW_SLASH, false);
}

Template.addSlash.events({
  'submit .add-slash-form': function(event, template){
    var slashToAdd = {};

    if(Meteor.userId()){
      // Author
      slashToAdd.authorId = Meteor.userId();

      // Message
      slashToAdd.message = template.$('.add-slash-form #slash-message').val();

      // Force message to be 10 char minimum
      if(slashToAdd.message.length > 9){
        // Start date
        var sDate = $('.start-date input').val();
        if(sDate !== ''){
          slashToAdd.startDate = new Date(sDate);
        } else {
          slashToAdd.startDate = new Date(Date.now());
        }

        // End date
        var eDate = $('.end-date input').val();
        if(eDate !== ''){
          slashToAdd.endDate = new Date(eDate);
        } else {
          slashToAdd.endDate = new Date(slashToAdd.startDate.getTime() + 24*3600000);     
        }

        // Name of subject
        var current = Router.current();
        slashToAdd.subject = current.params.name;

        // Add slash
        Meteor.call('addNewSlash',slashToAdd);        
        resetAddNewSlash(template);
      } else {
        Session.set(ERROR_KEY, ERROR_MESSAGE_TOO_SHORT);
      }
    } else {
      Session.set(ERROR_KEY, ERROR_USER_NOT_CONNECTED);
    }
    return false;
  }
});
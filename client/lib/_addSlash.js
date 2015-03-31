var ERROR_KEY = 'addNewSlashErrors';
var ERROR_USER_NOT_CONNECTED = 'User not connected, please login.';
var ERROR_MESSAGE_TOO_SHORT = 'Message too short, at least 10 characters.';

Template.addSlash.created = function() {
  Session.set(ERROR_KEY, '');
};

Template.addSlash.helpers({
  errorMessage: function() {
    return Session.get(ERROR_KEY);
  }
});

var renderAdd = function(){
  $('.add-slash-form').hide();
  $('.add-slash-form').slideDown("slow");
  $('.add-new-slash i').removeClass("fa-plus");
  $('.add-new-slash i').addClass("fa-minus");
  $('.datetimepicker').datetimepicker();
}

Template.addSlash.rendered = function (){
  // Render add slash
  renderAdd();
  // Date
  $('.datetimepicker.start-date').on("dp.change",function(e){
    $('.datetimepicker.end-date').data("DateTimePicker").minDate(e.date);
  });
  $('.datetimepicker.end-date').on("dp.change",function(e){
    $('.datetimepicker.start-date').data("DateTimePicker").maxDate(e.date);
  });
}

Template.addSlash.destroyed = function(){
  $('.add-new-slash i').removeClass("fa-minus");
  $('.add-new-slash i').addClass("fa-plus");  
}

Template.addSlash.events({
  'submit .add-slash-form': function(event){
    var slashToAdd = {};

    if(Meteor.userId()){
      // Author
      slashToAdd.authorId = Meteor.userId();

      // Message
      slashToAdd.message = $('.add-slash-form #slash-message').val();

      if(slashToAdd.message.length > 10){
        // Start
        var sDate = $('.start-date input').val();
        if(sDate !== ''){
          slashToAdd.startDate = new Date(sDate);
        } else {
          slashToAdd.startDate = new Date(Date.now());
        }

        // End
        var eDate = $('.end-date input').val();
        if(eDate !== ''){
          slashToAdd.endDate = new Date(eDate);
        } else {
          slashToAdd.endDate = new Date(slashToAdd.startDate.getTime() + 24*3600000);     
        }

        // Name of subject
        var current = Router.current();
        slashToAdd.subject = current.params.name;

        Meteor.call('addNewSlash',slashToAdd);        
      } else {
        Session.set(ERROR_KEY, ERROR_MESSAGE_TOO_SHORT);
        return false;
      }

    } else {
      Session.set(ERROR_KEY, ERROR_USER_NOT_CONNECTED);
      return false;
    }
  }
});
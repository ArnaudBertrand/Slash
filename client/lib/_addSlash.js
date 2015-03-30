/**
*** TODO: Deal with errors in adding
**/

var ERROR_KEY = 'addNewSlashErrors';

Template.addSlash.created = function() {
  Session.set(ERROR_KEY, '');
};

Template.addSlash.helpers({
  errorMessage: function() {
    return Session.get(ERROR_KEY);
  }
});

Template.addSlash.rendered = function (){
  $('.add-slash-form').hide();
  $('.add-slash-form').slideDown("slow");
  $('.add-new-slash i').removeClass("fa-plus");
  $('.add-new-slash i').addClass("fa-minus");

  // Date
  $('.datetimepicker').datetimepicker();
  //$('.datetimepicker.start-date').data("DateTimePicker").minDate(Date.now());
  // Date bounds
  //console.log(date());
  $('.datetimepicker.start-date').on("dp.change",function(e){
    console.log(e.date);
    console.log(e.date.toDate());
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
        Session.set(ERROR_KEY, 'Message too short, at least 10 words.');
        return false;
      }

    } else {
      Session.set(ERROR_KEY, 'User not connected, please login.');
      return false;
    }
  }
});
/**
*** TODO: Deal with errors in adding
**/

var ERRORS_KEY = 'addNewSlashErrors';

Template.addSlash.created = function() {
  Session.set(ERRORS_KEY, {});
};

Template.addSlash.helpers({
  errorMessages: function() {
    return _.values(Session.get(ERRORS_KEY));
  },
  errorClass: function(key) {
    return Session.get(ERRORS_KEY)[key] && 'error';
  }
});

Template.addSlash.rendered = function (){
	$('.add-slash-form').hide();
	$('.add-slash-form').slideDown("slow");
	$('.add-new-slash i').removeClass("fa-plus");
	$('.add-new-slash i').addClass("fa-minus");
}

Template.addSlash.destroyed = function(){
	$('.add-new-slash i').removeClass("fa-minus");
	$('.add-new-slash i').addClass("fa-plus");
}

Template.addSlash.events({
	'submit .add-slash-form': function(event){
		console.log("ok");

		var slashToAdd = {};
		slashToAdd.author = Meteor.userId();
		slashToAdd.message = $('.add-slash-form .slash-message').val();

		// Delay
		var timerHH = $('.add-slash-form .timer.hour').val();
		var timerMM = $('.add-slash-form .timer.min').val();
		var timerSS = $('.add-slash-form .timer.sec').val();
		slashToAdd.startDate = new Date(Date.now() + timerHH*3600000 + timerMM*60000 + timerSS*1000);

		// Timer
		var timerHH = $('.add-slash-form .timer.hour').val();
		var timerMM = $('.add-slash-form .timer.min').val();
		var timerSS = $('.add-slash-form .timer.sec').val();
		console.log(slashToAdd.startDate);
		slashToAdd.endDate = new Date(slashToAdd.startDate.getTime() + timerHH*3600000 + timerMM*60000 + timerSS*1000);

    	if (! slashToAdd.author ) {
      		errors.author = 'User not connected, please login.';
    	}

		console.log(slashToAdd);
		return false;
	}
});
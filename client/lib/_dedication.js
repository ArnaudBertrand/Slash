var DEDICATION_KEY = 'currentDedication';
Session.setDefault(DEDICATION_KEY, 'Hey this class is amazing ! - JohnDenis');

Template.dedication.helpers({
  currentDedication: function(){
    return Session.get(DEDICATION_KEY);
  }
});

Template.dedication.events({
	'click .add-dedication-button': function(event,template){
		template.$('.new-dedication').fadeIn();
	},
	'click .cancel': function(event,template){
		template.$('.new-dedication').fadeOut();
		return false;
	},
	'submit': function(event,template){
		alert('Message sent not implemented');
		return false;
	}
})
var DEDICATION_KEY = 'currentDedication';
Session.setDefault(DEDICATION_KEY, 'Hey this class is amazing ! - JohnDenis');

Template.dedication.helpers({
  currentDedication: function(){
    return Session.get(DEDICATION_KEY);
  }
});

Template.dedication.events({
	/*'click .add-dedication-button': function(event,template){
		template.$('.new-dedication').fadeIn();
	},
	'click .cancel': function(event,template){
		template.$('.new-dedication').fadeOut();
		return false;
	},*/
	'click .display-add-dedication': function(event,template){
		if(Meteor.user()){
			$('#add-dedication-popup').removeClass('hidden');
		} else {
			$('#mSignIn').modal('show');
		}
	},
	'click .btn-danger': function(event,template){
		$('#add-dedication-popup').addClass('hidden');
	},
	'click .btn-success': function(event,template){
		$('#add-dedication-popup').addClass('hidden');
	}
});

Template.dedication.rendered = function() {
	$('.dedication').slick({
		dots: false,
		arrows: false,
		autoplay: true,
		autoplaySpeed: 5000,
		easing : true,
		speed : 700,
	});
};
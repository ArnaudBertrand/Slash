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
		$('.new-dedication').removeClass('hidden');
		$('.dedication').addClass('hidden');
		$('.btn-show-add-dedication').addClass('hidden');
		$('.btn-action-add-dedication').removeClass('hidden');
	},
	'click .btn-action-add-dedication .cancel': function(event,template){
		$('.new-dedication').addClass('hidden');
		$('.dedication').removeClass('hidden');
		$('.btn-show-add-dedication').removeClass('hidden');
		$('.btn-action-add-dedication').addClass('hidden');
	},
	'submit': function(event,template){
		alert('Message sent not implemented');
		return false;
	}
})

Template.dedication.rendered = function() {
	$('.dedication').slick({
		dots: false,
		arrows: false,
		autoplay: true,
		autoplaySpeed: 5000,
		easing : true,
		speed : 700,
	});
}
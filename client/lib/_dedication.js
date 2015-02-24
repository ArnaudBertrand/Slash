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
	'click .dedication-user-image-i': function(event,template){
		$('.dedication-user-image-i').addClass('img-change-1');
		setTimeout(function(){ $('.dedication-user-image-i').attr('src','http://img.kazeo.com/132/1329278/XL/chaton-blanc-et-beige.jpg');$('.dedication-user-image-i').removeClass('img-change-1');$('.dedication-user-image-i').addClass('img-change-2');}, 500);
		return false;
	},
	'submit': function(event,template){
		alert('Message sent not implemented');
		return false;
	}
})
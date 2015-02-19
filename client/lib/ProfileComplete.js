Template.profileComplete.events({
	'click .user-fname button': function(event, template){
		var $show = template.$('.user-fname .display-none');
		var $hide = template.$('.user-fname .displayed');

		$show.removeClass('display-none').addClass('displayed');
		$hide.removeClass('displayed').addClass('display-none');

		if(template.$('.user-fname button span').hasClass('glyphicon-edit')){
			template.$('.user-fname button span').removeClass('glyphicon-edit').addClass('glyphicon-ok');
		} else {
			template.$('.user-fname button span').removeClass('glyphicon-ok').addClass('glyphicon-edit');
// Here is value to get			
		}
	},
	'click .user-lname button': function(event, template){
		var $show = template.$('.user-lname .display-none');
		var $hide = template.$('.user-lname .displayed');

		$show.removeClass('display-none').addClass('displayed');
		$hide.removeClass('displayed').addClass('display-none');

		if(template.$('.user-lname button span').hasClass('glyphicon-edit')){
			template.$('.user-lname button span').removeClass('glyphicon-edit').addClass('glyphicon-ok');
		} else {
			template.$('.user-lname button span').removeClass('glyphicon-ok').addClass('glyphicon-edit');
// Here is value to get			
		}
	},
	'click .user-gender button': function(event, template){
		var $show = template.$('.user-gender .display-none');
		var $hide = template.$('.user-gender .displayed');

		$show.removeClass('display-none').addClass('displayed');
		$hide.removeClass('displayed').addClass('display-none');

		if(template.$('.user-gender button span').hasClass('glyphicon-edit')){
			template.$('.user-gender button span').removeClass('glyphicon-edit').addClass('glyphicon-ok');
		} else {
			template.$('.user-gender button span').removeClass('glyphicon-ok').addClass('glyphicon-edit');
// Here is value to get			
		}
	},
	'click .user-email button': function(event, template){
		var $show = template.$('.user-email .display-none');
		var $hide = template.$('.user-email .displayed');

		$show.removeClass('display-none').addClass('displayed');
		$hide.removeClass('displayed').addClass('display-none');

		if(template.$('.user-email button span').hasClass('glyphicon-edit')){
			template.$('.user-email button span').removeClass('glyphicon-edit').addClass('glyphicon-ok');
		} else {
			template.$('.user-email button span').removeClass('glyphicon-ok').addClass('glyphicon-edit');
// Here is value to get			
		}
	},
	'click .user-phone button': function(event, template){
		var $show = template.$('.user-phone .display-none');
		var $hide = template.$('.user-phone .displayed');

		$show.removeClass('display-none').addClass('displayed');
		$hide.removeClass('displayed').addClass('display-none');

		if(template.$('.user-phone button span').hasClass('glyphicon-edit')){
			template.$('.user-phone button span').removeClass('glyphicon-edit').addClass('glyphicon-ok');
		} else {
			template.$('.user-phone button span').removeClass('glyphicon-ok').addClass('glyphicon-edit');
// Here is value to get			
		}
	},
	'click .user-description button': function(event, template){
		var $show = template.$('.user-description .display-none');
		var $hide = template.$('.user-description .displayed');

		$show.removeClass('display-none').addClass('displayed');
		$hide.removeClass('displayed').addClass('display-none');

		if(template.$('.user-description button span').hasClass('glyphicon-edit')){
			template.$('.user-description button span').removeClass('glyphicon-edit').addClass('glyphicon-ok');
		} else {
			template.$('.user-description button span').removeClass('glyphicon-ok').addClass('glyphicon-edit');
// Here is value to get			
		}
	},
	'click .panel-heading .back': function(){
		Router.go("profileView", {name: this.profileUsername});
	}
});
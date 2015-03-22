Template.dedication.created = function(){
	this.autorun(function(){
		var currentDedication = Dedications.findOne();
		if(currentDedication){
			// Dedi text
			var dediText = '<span>' + currentDedication.text;
			if(currentDedication.author){
				dediText += ' - <a class="link">' + currentDedication.author.username + '</a>';
			}
			dediText += '</span>';

			$('.dedication-text').animate({opacity: 0}, 1000, function(){
				$('.dedication-text').html(dediText).animate({opacity: 1}, 1000);
			});			
		}
	});
}
Template.dedication.helpers({
  currentDedication: function(){
    return Dedications.findOne();
  }
});

Template.dedication.events({
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
		// Add dedication
		var dedic = {};
		dedic.author = Meteor.user();
		dedic.text = $('#add-dedication-popup .dedication-text').val();
		Meteor.call('addDedication',dedic);

		// Reset
		$('#add-dedication-popup .dedication-text').val('')
		$('#add-dedication-popup').addClass('hidden');
	}
});
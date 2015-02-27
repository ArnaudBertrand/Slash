Template.profileComplete.events({
	'click .btn-edit':function(event,template){
		// Hide text and show inputs
		template.$('.table-user-information .edit').removeClass('display-none');
		template.$('.table-user-information .field').addClass('display-none');
		// Hide edit, show validate and cancel
		template.$('.btn-edit').addClass('display-none');
		template.$('.btn-cancel').removeClass('display-none');
		template.$('.btn-validate').removeClass('display-none');
	},
	'click .btn-cancel':function(event,template){
		template.$('.table-user-information .field').removeClass('display-none');
		template.$('.table-user-information .edit').addClass('display-none');
		// Hide validate and cancel, show edit
		template.$('.btn-edit').removeClass('display-none');
		template.$('.btn-cancel').addClass('display-none');
		template.$('.btn-validate').addClass('display-none');
	},
	'change #image-to-upload':function(event,template){
		 _.each(event.currentTarget.files, function(file) {
			Meteor.saveFile(file, file.name);
		}); 
		var file = event.currentTarget.files[0];
		var reader = new FileReader();
		// Set preview image into the popover data-content
		reader.onload = function (e) {         
			$(".image-preview").attr('src', e.target.result);
		}        
		reader.readAsDataURL(file); 
	},
	'click .btn-back': function(){
		Router.go("profileView", {name: this.profileUsername});
	}
});
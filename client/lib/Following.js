Template.following.events({
	'click .btn-back': function(){
		Router.go("profileView", {name: this.profileUsername});
	}
});
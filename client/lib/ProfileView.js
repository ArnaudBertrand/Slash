Template.userProfileInfo.events({
	'click a.profile': function(){
		Router.go('profileComplete', {name: this.profileUsername});
	},
	'click a.followers': function(){
		Router.go('followers', {name: this.profileUsername});
	},
	'click a.following': function(){
		Router.go('following', {name: this.profileUsername});
	}
});
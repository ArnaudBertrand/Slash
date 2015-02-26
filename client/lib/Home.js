Template.home.events({
	'click .subject': function(){
		console.log("test");
		Router.go("subject", {name: "Welcome"});
	},
	'click .view-profile': function(){
		Router.go("profileView", {name: "John"});
	},
	'click .view-complete-profile': function(){
		Router.go("profileComplete", {name: "John"});
	},
	'click .followers': function(){
		Router.go("followers", {name: "John"});
	}
});
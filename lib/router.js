Router.configure({
	// We use the appBody template to define the layout for the entire app
	layoutTemplate: 'appBody',

	// Use for unknown routes
	notFoundTemplate: 'appNotFound',

	// Wait on the following subscriptions before rendering the page
	waitOn: function(){
		return [];
	}
});

Router.map(function(){
	this.route('subject', {
		path: '/subject/:name',
	    // subscribe to todos before the page is rendered but don't wait on the
	    // subscription, we'll just render the items as they arrive
	    onBeforeAction: function () {
	    	// Add a new visitor on the subject page
	    	Meteor.call('incrementSubjectVisitors', this.params.name);
	      	this.next();
	    },
	    waitOn: function(){
	    	// Suscribes
	    	return [Meteor.subscribe('subjectByName', this.params.name),Meteor.subscribe('slashsBySubjectName', this.params.name)];
	    },
	    data: function(){
	    	var subject = Subjects.find().fetch()[0];
	    	var slashs = Slashs.find();
	    	return {
	    		subject: subject,
	    		slashs: slashs
	    	};
	    },
	    action: function () {
	      	this.render();
	    }
	});

	this.route('profileView', {
		path: '/profile/:name',
		data: function(){
			var data = {};
			var user = Meteor.user();
			if(user && user.username === this.params.name){
				data.isUserProfile = true;
			}
			data.profileUsername = this.params.name;
			return data;
		}
	});

	this.route('profileComplete', {
		path: '/profile/complete/:name',
		data: function(){
			var data = {
				firstName: { name: "First Name", value: "Pauline" },
				lastName: { name: "Last Name", value: "Michaud" },
				gender: { name: "Gender", value: "Female", options: {female: "checked"} },
				email: { name: "E-mail", type:"email", value: "paulinemichaud1@sfr.fr" },
				phone: { name: "Phone number", value: "123-4567-890" },
				description: { name: "Description", value: "I'm kind, nice and I like pizza, cats and movies :) :) :)" }
			};

			var user = Meteor.user();
			if(user && user.username === this.params.name){
				data.isUserProfile = true;
			}
			data.profileUsername = this.params.name;
			return data;
		}
	});

	this.route('followers', {
		path: 'followers/:name',
		data: function(){
			var data = {
				followers:[	
					{name: "Arnaud", description: "I am so awesome !"},
					{name: "Pauline", description: "I'm kind, nice and I like pizza, cats and movies :) :) :)"},
					{name: "Sabri", description: "It's my lifeeeeeeeeeee !"}
				]
			}
			return data;
		}
	});

	this.route('home', {
		path: '/',
		action: function() {
			if(Meteor.user()){
				Router.go('profileView',{name: Meteor.user().username });
			}
			this.render();
		}
	});
});
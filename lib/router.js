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

dataReadyHold = null;

if(Meteor.isClient) {
	// Keep showing lauchn screen on mobile devices until app data is loaded
	dataReadyHold = LaunchScreen.hold();

	// Show the loading screen on desktop
//	Router.onBeforeAction('loading', {except: ['xx','xxx'});
//	Router.onBeforeAction('dataNotFound', {except: ['xx','xxx'});
}

Router.map(function(){
	this.route('join');
	this.route('signin');

	this.route('subject', {
		path: '/subject/:name',
	    // subscribe to todos before the page is rendered but don't wait on the
	    // subscription, we'll just render the items as they arrive
	    onBeforeAction: function () {
	    	// Add a new visitor on the subject page
	    	Meteor.call('incrementSubjectVisitors', this.params.name);
		    if (this.ready()) {
	    	    // Handle for launch screen defined in app-body.js
	        	dataReadyHold.release();
	      	}
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

	this.route('home', {
		path: '/',
		action: function() {
			this.render();
		}
	});
});
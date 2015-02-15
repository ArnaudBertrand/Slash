/**
*** TODO: handle online users
**/

Template.subjectHeader.helpers({
	title: function(){
		var current = Router.current();
		return current.params.name;
	},
	nbVisit: function(){
		var current = Router.current();
		return current.data().subject.nbVisit;
	}
})
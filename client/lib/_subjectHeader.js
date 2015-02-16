/**
*** TODO: handle online users
**/
var SHOW_ADD_NEW_SLASH = 'showAddNewSlash';
Session.setDefault(SHOW_ADD_NEW_SLASH, false);

Template.subjectHeader.helpers({
	title: function(){
		var current = Router.current();
		return current.params.name;
	},
	nbVisit: function(){
		var current = Router.current();
		return current.data().subject.nbVisit;
	},
	showAddSlash: function(){
		return Session.get(SHOW_ADD_NEW_SLASH);
	}
})

Template.subjectHeader.events({
	'click .add-new-slash': function(event){
		if(Session.get(SHOW_ADD_NEW_SLASH)){
			Session.set(SHOW_ADD_NEW_SLASH, false);
		} else {
			Session.set(SHOW_ADD_NEW_SLASH, true);
		}
	}
});
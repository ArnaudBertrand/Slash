/**
*** TODO: handle online users
**/
var SHOW_ADD_NEW_SLASH = 'showAddNewSlash';
var SORT_METHOD = 'slashsSortMethod';

Template.subjectHeader.rendered = function(){
  Session.setDefault(SHOW_ADD_NEW_SLASH, false);
}

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
      if(Meteor.user()){
        Session.set(SHOW_ADD_NEW_SLASH, true);
      } else {
        $('#mSignIn').modal('show');
      }
    }
  },
  'click .sort-by':function(event,template){
    template.$('.sort-dropdown').toggle();
  },
  'click .sort-dropdown .sort-item': function(event,template){
    Session.set(SORT_METHOD, event.target.dataset.sort);
    template.$('.sort-dropdown').hide();
  }
});
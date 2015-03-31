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
    var subject = Subjects.findOne();
    if(subject){
      return subject.nbVisit;
    } else {
      return "-";
    }
  },
  showAddSlash: function(){
    return Session.get(SHOW_ADD_NEW_SLASH);
  }
})

var resetDateTimePicker = function (){
  // Init time picker
  $('.datetimepicker').datetimepicker();
  // Date
  $('.datetimepicker.start-date').on("dp.change",function(e){
    $('.datetimepicker.end-date').data("DateTimePicker").minDate(e.date);
  });
  $('.datetimepicker.end-date').on("dp.change",function(e){
    $('.datetimepicker.start-date').data("DateTimePicker").maxDate(e.date);
  });
  $('.slash-central .date-input').val('');
}

var hideAddNewSlash = function(template){
  template.$('.add-new-slash i').removeClass("fa-minus");
  template.$('.add-new-slash i').addClass("fa-plus");
  $('.add-slash-form').slideUp("slow");
  Session.set(SHOW_ADD_NEW_SLASH, false);
}

var showAddNewSlash = function(template){
  template.$('.add-new-slash i').removeClass("fa-plus");
  template.$('.add-new-slash i').addClass("fa-minus");
  $('.add-slash-form').slideDown("slow");
  Session.set(SHOW_ADD_NEW_SLASH, true);
  resetDateTimePicker();
}

Template.subjectHeader.events({
  'click .add-new-slash': function(event,template){
    if(Meteor.user()){
      if(Session.get(SHOW_ADD_NEW_SLASH)){
        hideAddNewSlash(template);
      } else {
        showAddNewSlash(template);
      }
    } else {
      $('#mSignIn').modal('show');
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
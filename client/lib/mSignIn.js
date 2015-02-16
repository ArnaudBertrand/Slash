var ERRORS_KEY = 'signinErrors';

Template.mSignIn.created = function() {
  Session.set(ERRORS_KEY, {});
};

Template.mSignIn.helpers({
  errorMessages: function() {
    return _.values(Session.get(ERRORS_KEY));
  },
  errorClass: function(key) {
    return Session.get(ERRORS_KEY)[key] && 'error';
  }
});

Template.mSignIn.events({
  'submit': function(event, template) {
    event.preventDefault();
    
    var username = template.$('[name=username]').val();
    var password = template.$('[name=password]').val();
    
    var errors = {};

    if (! username) {
      errors.username = 'Username or e-mail is required';
    }

    if (! password) {
      errors.password = 'Password is required';
    }
    
    Session.set(ERRORS_KEY, errors);
    if (_.keys(errors).length) {
      return;
    }
    
    Meteor.loginWithPassword(username, password, function(error) {
      if (error) {
        return Session.set(ERRORS_KEY, {'none': error.reason});
      } else {
        $('#mSignIn').modal('hide');
      }
    });
  },
  'click .signUp': function(event){
    $('#mSignIn').modal('hide');
    $('#mSignUp').modal('show');
  }
});
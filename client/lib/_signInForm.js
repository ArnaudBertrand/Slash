var ERRORS_KEY = 'signinErrors';
var PASSWORD_FORGOT = 'forgotPassword';

Template.signInForm.created = function() {
  Session.set(ERRORS_KEY, {});
};

Template.signInForm.helpers({
  errorMessages: function() {
    return _.values(Session.get(ERRORS_KEY));
  },
  errorClass: function(key) {
    return Session.get(ERRORS_KEY)[key] && 'error';
  }
});

Template.signInForm.events({
  'submit': function(event, template) {
    event.preventDefault();
    // Get username and password
    var username = template.$('[name=username]').val();
    var password = template.$('[name=password]').val();
    
    var errors = {};

    // Check errors
    if (! username) {
      errors.username = 'Username is required';
    }
    if (! password) {
      errors.password = 'Password is required';
    }
    
    // Cancel if errors
    Session.set(ERRORS_KEY, errors);
    if (_.keys(errors).length) {
      return;
    }
    
    // Login
    Meteor.loginWithPassword(username, password, function(error) {
      if (error) {
        return Session.set(ERRORS_KEY, {'none': error.reason});
      } else {
        $('#mSignIn').modal('hide');
      }
    });

    // Cancel post
    return false;
  },
  'click .remember-forgot .forgot': function(){
    $('#mSignIn').modal('show');
    Session.set(PASSWORD_FORGOT, true);
  },
  'click .remember-forgot .create-account': function(){
    $('#mSignIn').modal('hide');
    $('#mSignUp').modal('show');
  }
});
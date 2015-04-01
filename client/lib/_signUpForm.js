var ERRORS_KEY = 'signupErrors';

Template.signUpForm.created = function() {
  Session.set(ERRORS_KEY, {});
};

Template.signUpForm.helpers({
  errorMessages: function() {
    return _.values(Session.get(ERRORS_KEY));
  },
  errorClass: function(key) {
    return Session.get(ERRORS_KEY)[key] && 'error';
  },
  cancel: false
});

Template.signUpForm.events({
  'submit': function(event, template){
    event.preventDefault();
    // Get username and password
    var username = template.$('[name=username]').val();
    var password = template.$('[name=password]').val();
    var confirmPassword = template.$('[name=confirmPassword]').val();

    var errors = {};

    // Check errors
    if (! username) {
      errors.username = 'Username required';
    }
    if (! password || ! confirmPassword) {
      errors.password = 'Password required';
    } else if (password !== confirmPassword){
      errors.password = 'Password do not match';
    }

    Session.set(ERRORS_KEY, errors);
    // Cancel if error
    if (_.keys(errors).length) {
      return;
    }

    // Create user
    Accounts.createUser({
      username: username,
      password: password
    }, function(error){
      if (error) {
        return Session.set(ERRORS_KEY, {'none': error.reason});
      } else {
        $('#mSignUp').modal('hide');
      }
    });

    // Cancel post
    return false;
  }
});
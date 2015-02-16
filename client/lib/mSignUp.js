var ERRORS_KEY = 'signupErrors';

Template.mSignUp.created = function() {
  Session.set(ERRORS_KEY, {});
};

Template.mSignUp.helpers({
  errorMessages: function() {
    return _.values(Session.get(ERRORS_KEY));
  },
  errorClass: function(key) {
    return Session.get(ERRORS_KEY)[key] && 'error';
  }
});

Template.mSignUp.events({
  'submit': function(event, template){
    event.preventDefault();

    var username = template.$('[name=username]').val();
    var password = template.$('[name=password]').val();
    var confirmPassword = template.$('[name=confirmPassword]').val();
    var email = template.$('[name=email]').val();

    var errors = {};

    if (! username) {
      errors.username = 'Username required';
    }

    if (! password || ! confirmPassword) {
      errors.password = 'Password required';
    } else if (password !== confirmPassword){
      errors.password = 'Password do not match';
    }

    Session.set(ERRORS_KEY, errors);

    if (!_.keys(errors).length) {
      Accounts.createUser({
        username: username,
        password: password,
        email: email
      }, function(error){
        if (error) {
          return Session.set(ERRORS_KEY, {'none': error.reason});
        } else {
          $('#mSignUp').modal('hide');
        }
      });
    }

    return false;
  },
  'click .cancel': function(event){
    $('#mSignUp').modal('hide');
  }
});
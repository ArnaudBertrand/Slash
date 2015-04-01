var ERRORS_KEY = 'signinErrors';
var PASSWORD_FORGOT = 'forgotPassword';

Template.forgotPasswordForm.events({
  'submit': function(event, template) {
    $('#mSignIn').modal('hide');
    return false;
  },
  'click .cancel': function(){
    Session.set(PASSWORD_FORGOT, false);
  }
});
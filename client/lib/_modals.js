var PASSWORD_FORGOT = 'forgotPassword';
Session.setDefault(PASSWORD_FORGOT, false);

Template.mSignIn.helpers({
  forgotPassword: function() {
    $('#mSignIn').modal('show');
    return Session.get(PASSWORD_FORGOT);
  }
});
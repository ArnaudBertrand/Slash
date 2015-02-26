var PASSWORD_FORGOT = 'forgotPassword';
Session.setDefault(PASSWORD_FORGOT, false);

Template.mSignIn.helpers({
  forgotPassword: function() {
    return Session.get(PASSWORD_FORGOT);
  }
});
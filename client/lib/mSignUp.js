/** Sign up **/
Template.mSignUp.helpers({
  'usernameInfo': function(){
    return Session.get('usernameInfo');
  },
  'passwordInfo': function(){
    return Session.get('passwordInfo');
  },
  'emailInfo': function(){
    return Session.get('emailInfo');
  }

});

Template.mSignUp.events({
  'submit .mSignUpForm': function(event){
    var username = event.target.username.value;
    var password = event.target.password.value;
    var email = event.target.email.value;
    Accounts.createUser({
      username: username,
      password: password,
      email: email
    });
    return false;
  }
});
if (Meteor.isClient) {
  // Sign up process
  Session.setDefault('signupForm', false);
  Session.setDefault('loginInfo', "");

  Template.mLogin.helpers({
    signupForm: function(){
      return Session.get('signupForm');
    }
  });

  Template.mSignIn.helpers({
    'loginInfo': function(){
      return Session.get('loginInfo');
    }

  });

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

  Template.mSignIn.events({
    'click .signupButton': function(event){
      Session.set('signupForm', true);
    },
    'submit .mSignInForm': function (event) {
      var username = event.target.username.value;
      var password = event.target.password.value;    
      Meteor.loginWithPassword(username,password,function(error){
        Session.set('loginInfo', error.reason);
      });
      return false;
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
}
if (Meteor.isClient) {
  Session.setDefault('currentDedication', 'Hey salut ca roule ma poule');

  Template.body.helpers({
    hello: function(){
      return "Hello John";
    }
  });

  Template.dedication.helpers({
    currentDedication: function(){
      return Session.get('currentDedication');      
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

if (Meteor.isClient) {
  Session.setDefault('currentDedication', 'Hey salut ca roule ma poule');

  Template.body.helpers({
    hello: function(){
      return "Hello John";
    }
  });

  Template.header.helpers({
    puce: [
      { class: "menuUser", icon: "fa fa-user", title:"User page"},
      { class: "menuMessage", icon: "fa fa-envelope-o", title:"Messages"},
      { class: "menuNotif", icon: "fa fa-flag", title:"Notifications"},
      { class: "menuPowerOff", icon: "fa fa-power-off", title:"Logout"}
    ]
  });

  Template.header.events({
    "click .menuUser": function(event){
      $('#modalVP').modal('show');
    },
    "click .menuPowerOff": function(event){
      Meteor.logout();
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

/**
*** TODO: Link puces to menus
*** Render puce differently for users
**/

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
    if(Meteor.user()){
      alert('User menu not developped');
    } else {
      $('#mSignIn').modal('show');
    }
  },
  "click .menuMessage": function(event){
    alert('Messages not developped');
  },
  "click .menuNotif": function(event){
    alert('Notifications not developped');
  },
  "click .menuPowerOff": function(event){
    Meteor.logout();
  },
  "submit .searchSlash" : function(event){
    var name = event.target.searchSlash.value
    //var subject = Subjects.findOne(name);
    Router.go("subject",{name: name});
    return false;
  }
});

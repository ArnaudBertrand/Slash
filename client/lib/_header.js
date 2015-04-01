Template.header.created = function(){
  var notifSubscription = null;
  this.autorun(function(){
    // Subscribe to notifications
    if(Meteor.user()){
      notifSubscription = Meteor.subscribe('notificationsByUsername', Meteor.user().username);
    }
    // Find notifications
    var notifications = Notifications.find();
    var innerHtml = '';
    if(notifications.count()){
      innerHtml = '<ul>';
      notifications.forEach(function(notif){
        innerHtml += '<li class="message"><div class="notif-text" data-notif="'+notif._id 
                  +'" data-path-for="'+notif.pathFor.name+'" data-arg="'+notif.pathFor.params[0]+'">' 
                  +notif.message+'</div><div class="tools" data-notif="'+notif._id+'">x</div></li>';
      });
      innerHtml += '</ul>';
      $('header .puce.menuNotif').css("background-color", "#3c3");
    } else{
      // Hide notifications if none
      $('header .puce.menuNotif').css("background-color", "#fff");
      $('header .notifications').hide();
    }
    $('header .notifications').html(innerHtml);
  });
}

Template.header.helpers({
  puce: function(){
    return [
      { class: "menuUser", icon: "fa fa-user", title:"User page"},
      { class: "menuNotif", icon: "fa fa-flag", title:"Notifications"},
      { class: "menuPowerOff", icon: "fa fa-power-off", title:"Logout"}
    ];
  }
});

Template.header.events({
  "click .puce.menuUser": function(event){
    if(Meteor.user()){
      var username = Meteor.user().username;
      Router.go("profileView", {name: username});
    } else {
      $('#mSignIn').modal('show');
    }
  },
  "click .puce.menuNotif": function(event,template){
    // Display only if there are some notifications
    if(template.$('.notifications').has('ul').length){
      template.$('.notifications').toggle();
      var xPos = event.pageX - 100;
      var yPos = event.pageY + 20;
      template.$('.notifications').css({"left": xPos, "top": yPos});      
    }
  },
  "click .puce.menuPowerOff": function(event){
    Meteor.logout();
  },
  "submit .searchSlash" : function(event){
    var name = event.target.searchSlash.value
    Router.go("subject",{name: name});
    return false;
  },
  "click .signup" : function(event){
    $('#mSignUp').modal('show');
  },
  "click .signin" : function(event){
    $('#mSignIn').modal('show');
  },
  'click .notifications .tools': function(event){
    Meteor.call('removeNotification',event.target.dataset.notif);
  },
  'click .notifications .notif-text': function(event){
    Router.go(event.target.dataset.pathFor, {name: event.target.dataset.arg});
    Meteor.call('removeNotification',event.target.dataset.notif);
  }
});

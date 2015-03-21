var ROUTE_PROFILE_VIEW = 'profileView';

Template.slashList.helpers({
});

Template.slashList.helpers({
  showUserInfo: function() {
    var routeName = Router.current().route.getName();
    return ROUTE_PROFILE_VIEW !== routeName;
  },
  slashList: function(){
  var slashList = Slashs.find().fetch();
  var routeName = Router.current().route.getName();
    if(ROUTE_PROFILE_VIEW !== routeName){
      slashList.forEach(function(slash){
        slash.author = Meteor.users.findOne({_id: slash.authorId});
    });
    }
    return slashList;
  }
});

Template.slashList.events({
  "click .picture-link": function(event){
    Router.go("profileView",{ name: "Arnaud"});
  }
});
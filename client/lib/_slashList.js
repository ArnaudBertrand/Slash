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
      console.log(slashList);
      slashList.forEach(function(slash){
        slash.author = Meteor.users.findOne({_id: slash.authorId});
        slash.picture = profileImage.findOne({_id: slash.author.img});
      });
    }
    return slashList;
  }
});

Template.slashList.events({
  'click .fa-thumbs-o-up:not(.activated)': function(event){
    event.target.className = event.target.className + " activated";
    Meteor.call('likeSlash',this._id);
  },
  'click .fa-thumbs-o-down:not(.activated)': function(){
    event.target.className = event.target.className + " activated";
    Meteor.call('dislikeSlash',this._id);
  }
});
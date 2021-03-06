Template.following.helpers({
  'following': function(){
    // Get followings
    var user = Meteor.users.findOne({username: this.profileUsername}) || {};
    var followings = user.followings ? Meteor.users.find({_id: {$in: user.followings}}).fetch() : [];
    // Get picture of followings
    followings.forEach(function(user){
      user.picture = profileImage.findOne({_id: user.img});
    });
    return followings;

  }
});

Template.following.events({
  'click .btn-back': function(){
    Router.go("profileView", {name: this.profileUsername});
  }
});
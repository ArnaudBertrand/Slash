Template.followers.helpers({
  'followers': function(){
    var user = Meteor.users.findOne({username: this.profileUsername}) || {};
    var followers = user.followers ? Meteor.users.find({_id: {$in: user.followers}}).fetch() : [];

    followers.forEach(function(user){
      user.picture = profileImage.findOne({_id: user.img});
    });
    return followers;
  }
});

Template.followers.events({
  'click .btn-back': function(){
    Router.go("profileView", {name: this.profileUsername});
  }
});

Template.followerListItem.helpers({
  'getNbFollowers': function(user){
    return user.followers ? user.followers.length : 0;
  },
  'getNbFollowing': function(user){
    return user.followings ? user.followings.length : 0;
  },
})
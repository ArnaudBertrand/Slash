Template.following.helpers({
  'following': function(){
    var user = Meteor.users.findOne({username: this.profileUsername}) || {};
    return user.followings ? Meteor.users.find({_id: {$in: user.followings}}).fetch() : [];
  }
});

Template.following.events({
  'click .btn-back': function(){
    Router.go("profileView", {name: this.profileUsername});
  }
});
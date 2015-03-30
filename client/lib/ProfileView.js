Template.profileView.helpers({
  emptySlashList: function(){
    return (Slashs.find().count() == 0);
  }});

Template.userProfileInfo.helpers({
  'profilePicture': function(){
    return profileImage.findOne();
  },
  'isFollowing': function(){
    var follow = false;
    var user = Meteor.users.findOne({_id: {$not: Meteor.userId()}},{followers: 1});
    if(user){
      _.each(user.followers, function(user){
        if(user === Meteor.userId()){
          follow = true;
          return;
        }
      });      
    }
    return follow;
  }
});

Template.userProfileInfo.events({
  'click a.profile': function(){
    Router.go('profileComplete', {name: this.user.username});
  },
  'click a.followers': function(){
    Router.go('followers', {name: this.user.username});
  },
  'click a.following': function(){
    Router.go('following', {name: this.user.username});
  },
  'click .follow' : function () {
	Meteor.call('addFollowing',{followed : this.user._id, follower : $('.currentUser-id').text()});
  },
  'click .stop-follow': function () {
    Meteor.call('removeFollowing',{followed : this.user._id, follower : $('.currentUser-id').text()});
  }
});
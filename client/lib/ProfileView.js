Template.profileView.helpers({
  emptySlashList: function(){
    return (Slashs.find().count() == 0);
  }});

Template.userProfileInfo.helpers({
  'profilePicture': function(){
    return profileImage.findOne();
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
  }
});
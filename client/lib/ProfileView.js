Template.profileView.helpers({
  emptySlashList: function(){
    return (Slashs.find().count() == 0);
  }});

Template.userProfileInfo.helpers({
  'profilePicture': function(){
    return profileImage.findOne();
  },
  'bFollowing': function(){
	Meteor.call('bFollowing',{followed : this.user._id, follower : $('.currentUser-id').text()},function (err,res) {
		if(res) {
			$('.stop-follow').removeClass('hidden');
			$('.follow').addClass('hidden');
		} else {
			$('.follow').removeClass('hidden');
			$('.stop-follow').addClass('hidden');
		}
	});
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
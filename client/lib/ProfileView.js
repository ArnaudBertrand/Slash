var TIMEOUT_FIND_PROFILE = 5000;
var ERROR_PROFILE_NOT_FOUND = 'Profile not found, please search again.';
var ERROR_SEARCH_PROFILE = 'errorSearchProfile';
Session.setDefault(ERROR_SEARCH_PROFILE, false);

Template.profileView.rendered = function(){
  Session.set(ERROR_SEARCH_PROFILE, false);  
  // Set a time out to find the user profile  
  var timeout = Meteor.setTimeout(function(){
    $('.profile-view .loading-profile p').text(ERROR_PROFILE_NOT_FOUND);
  },TIMEOUT_FIND_PROFILE);

  // Find the user profile
  this.autorun(function() {
    var router = Router.current();
    if (router.profileSubscription.ready()){
      if(Meteor.users.find({username: router.params.name}).count()){
        $('.profile-view .loading-profile').hide();
        $('.profile-view .user-profile-and-slash').show();
        Meteor.clearTimeout(timeout);
      }
    }
  });
}

Template.profileView.helpers({
  'errorSearchUser':function(){
    return Session.get(ERROR_SEARCH_PROFILE);
  }
});

Template.userProfileInfo.helpers({
  'profilePicture': function(){
    return profileImage.findOne();
  },
  'isFollowing': function(){
    var follow = false;
    // Check if current user follows the user visited
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
  },
  'quality': function(){
    var quality = 0;
    if(this.user){
      // Check the user quality of slash (like/like+dislike)
      var user = Meteor.users.findOne({username: this.user.username});
      if(user){
        var dislike = user.nbDislike || 0;
        var like = user.nbLike || 0;
        if(like !== 0){
          quality = Math.round(100*(like/(like+dislike)));
        }
      }
    }
    return quality;
  }
});

Template.profileView.events({
  'submit .search-user': function(event,template){
    var user = template.$('[name=search-user]').val();
    Meteor.call('isUserExisting', user, function(error,res){
      if(error){
        console.log(error);
      }
      // If profile found go to profile otherwise print error
      console.log(res);
      if(res){
        Router.go('profileView', {name: user});
        Session.set(ERROR_SEARCH_PROFILE, false);
      } else {
        Session.set(ERROR_SEARCH_PROFILE, true);
      }
    });
    return false;
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
  	Meteor.call('addFollowing', this.user._id);
  },
  'click .stop-follow': function () {
    Meteor.call('removeFollowing', this.user._id);
  }
});
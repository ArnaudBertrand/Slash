var TIMEOUT_FIND_PROFILE = 5000;

Template.profileComplete.rendered = function(){
  // Hide all edit fields
  $('.profile-complete .user-information .field-edit').hide();
  // Set a time out to find the user profile  
  var timeout = Meteor.setTimeout(function(){
    $('.profile-complete .loading-profile p').text('Profile not found, please search again.');
  },TIMEOUT_FIND_PROFILE);

  // Find the user profile
  this.autorun(function() {
    var router = Router.current();
    if (router.profileSubscription.ready()){
      if(Meteor.users.find({username: router.params.name}).count()){
        $('.profile-complete .loading-profile').hide();
        $('.profile-complete .loaded-profile').show();
        Meteor.clearTimeout(timeout);
      }
    }
  });
};

Template.profileComplete.helpers({
  'genderChecked': function(val){
    var selectedUser = Meteor.user();
    if(selectedUser && selectedUser.profile.gender === val){
      return {checked: 'checked'};
    }
    return {};
  }
});

var cancelEdit = function(template){
  // Show text and hide inputs
  template.$('.user-information .field-value').show();
  template.$('.user-information .field-edit').hide();
  // Hide validate and cancel, show edit
  template.$('.btn-edit').show();
  template.$('.btn-cancel').hide();
  template.$('.btn-validate').hide();
}

var closeEdit = function(template){
  // Hide text and show inputs
  template.$('.user-information .field-edit').show();
  template.$('.user-information .field-value').hide();
  // Hide edit, show validate and cancel
  template.$('.btn-edit').hide();
  template.$('.btn-cancel').show();
  template.$('.btn-validate').show();  
}

Template.profileComplete.events({
  'change #image-to-upload':function(event,template){
    FS.Utility.eachFile(event, function(file) {
      profileImage.insert(file, function (err, fileObj) {
        if(err){
          console.log(err);
        } else {
          Meteor.call('changeProfilePicture', fileObj._id, function(){
            var currentRouter = Router.current();
            currentRouter.imgSubscription.stop();
            currentRouter.imgSubscription = Meteor.subscribe('profileImage', Router.current().params.name);
          });
        }
      });
    });
  },
  'click .btn-back': function(){
    Router.go("profileView", {name: this.user.username});
  },
  'click .btn-cancel':function(event,template){
    closeEdit(template)
  },
  'click .btn-edit':function(event,template){
    edit(template);
  },
  'click .btn-validate': function(event,template){
    // Update profile
    var profile = {};
    profile["profile.firstName"] = template.$('.user-fname input').val();
    profile["profile.lastName"] = template.$('.user-lname input').val();
    profile["profile.gender"] = template.$('.user-gender input:checked').val();
    profile["profile.email"] = template.$('.user-email input').val();
    profile["profile.phone"] = template.$('.user-phone input').val();
    profile["profile.description"] = template.$('.user-description textarea').val();
    Meteor.users.update({_id:Meteor.userId()}, {$set:profile});
    // Close edit
    closeEdit(template);
  }
});
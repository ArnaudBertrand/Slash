Template.profileComplete.rendered = function(){
  $('.profile-complete .user-information .field-edit').hide();
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

Template.profileComplete.events({
  'click .btn-edit':function(event,template){
    // Hide text and show inputs
    template.$('.user-information .field-edit').show();
    template.$('.user-information .field-value').hide();
    // Hide edit, show validate and cancel
    template.$('.btn-edit').hide();
    template.$('.btn-cancel').show();
    template.$('.btn-validate').show();
  },
  'click .btn-cancel':function(event,template){
    // Show text and hide inputs
    template.$('.user-information .field-value').show();
    template.$('.user-information .field-edit').hide();
    // Hide validate and cancel, show edit
    template.$('.btn-edit').show();
    template.$('.btn-cancel').hide();
    template.$('.btn-validate').hide();
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

    // Show text and hide inputs
    template.$('.user-information .field-value').show();
    template.$('.user-information .field-edit').hide();
    // Hide validate and cancel, show edit
    template.$('.btn-edit').show();
    template.$('.btn-cancel').hide();
    template.$('.btn-validate').hide();
  },
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
  'click .user-picture button': function(){
    console.log("no pictures");
  }
});
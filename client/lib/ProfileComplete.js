Template.profileComplete.helpers({
  'firstName': function(){
    return { name: "First Name", value: "Pauline" };
  },
  'lastName': function(){
    return { name: "Last Name", value: "Michaud" };
  },
  'gender': function(){
    return { name: "Gender", value: "Female", options: {female: "checked"} };
  },
  'email': function(){
    return { name: "E-mail", type:"email", value: "paulinemichaud1@sfr.fr" };
  },
  'phone': function(){
    return { name: "Phone number", value: "123-4567-890" };
  },
  'description': function(){
    return { name: "Description", value: "I'm kind, nice and I like pizza, cats and movies :) :) :)" };
  },
  'profilePicture': function(){
    return profileImage.findOne();
  }
});

Template.profileComplete.events({
  'click .btn-edit':function(event,template){
    // Hide text and show inputs
    template.$('.table-user-information .edit').removeClass('display-none');
    template.$('.table-user-information .field').addClass('display-none');
    // Hide edit, show validate and cancel
    template.$('.btn-edit').addClass('display-none');
    template.$('.btn-cancel').removeClass('display-none');
    template.$('.btn-validate').removeClass('display-none');
  },
  'click .btn-cancel':function(event,template){
    template.$('.table-user-information .field').removeClass('display-none');
    template.$('.table-user-information .edit').addClass('display-none');
    // Hide validate and cancel, show edit
    template.$('.btn-edit').removeClass('display-none');
    template.$('.btn-cancel').addClass('display-none');
    template.$('.btn-validate').addClass('display-none');
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
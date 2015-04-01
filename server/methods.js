Meteor.methods({
  'addDedication': function(dedication){
    dedication.date = Date.now();
    Dedications.insert(dedication);
  },
  'addFollowing' : function(userId) {
    Meteor.users.update({_id: userId}, {$addToSet : {followers: Meteor.userId()}});
    Meteor.users.update({_id: Meteor.userId()}, {$addToSet : {followings: userId}});
  },
  'addNewSlash': function(slash){
    // Only possible if user is connected
    if(Meteor.userId()){
      // Set default values
      slash.like = 0;
      slash.dislike = 0;
      // Insert directly in slash if start time is passed otherwise insert in waiting list
      if(new Date(slash.startDate).getTime() < Date.now()){
        Slashs.insert(slash);
      } else {
        SlashsWait.insert(slash);
      }
      // Update user number of slashs
      Meteor.users.update({_id: Meteor.userId()}, {$inc: {nbSlash: 1}});
      // Send notificatiosn to all followers
      var user = Meteor.users.findOne({_id: Meteor.userId()},{followers: 1});
      user.followers.forEach(function(userId){
        Notifications.insert({receiver: userId, message: Meteor.user().username 
          + " sent a new slash", pathFor: { name: "profileView", params: [Meteor.user().username]}});
      });

    }
  },
  'changeProfilePicture': function(url){
    Meteor.users.update({_id: Meteor.userId()}, {$set: {img: url}});
  },
  'dislikeSlash': function(args){
    var slashId = args[0];
    var authorId = args[1];
    Slashs.update({_id: slashId}, {$inc: {dislike: 1}})
    Meteor.users.update({_id: authorId}, {$inc: {nbDislike: 1}});
  },
  'findSubjectByName': function(name){
    return Subjects.findOne({name: name});
  },
  'getImage': function(imgId){
    return profileImage.findOne({_id: imgId});
  },
  'incrementSubjectVisitors': function(name){
    if(Subjects.find({name: name}).count() > 0){
      Subjects.update(
        {name: name},
        {$inc: { nbVisit: 1}}
      );
    } else {
      Subjects.insert({ 
        name: name,
        nbVisit: 1
      });
    }
    return Subjects.findOne({name: name});
  },
  'isUserExisting': function(username){
    return Meteor.users.find({username: username}).count();
  },
  'likeSlash': function(args){
    var slashId = args[0];
    var authorId = args[1];
    Slashs.update({_id: slashId}, {$inc: {like: 1}});
    Meteor.users.update({_id: authorId}, {$inc: {nbLike: 1}});
  },
  'removeFollowing': function(userId) {
    Meteor.users.update({_id: userId}, {$pop: {followers: Meteor.userId()}});
    Meteor.users.update({_id: Meteor.userId()}, {$pop: {followings: userId}});
  },
  'removeNotification': function(notifId){
    Notifications.remove({_id: notifId, receiver: Meteor.userId()});
  }
});

/** Add basic values when creating a user **/
Accounts.onCreateUser(function(options, user) {
  user.img = '';
  user.nbSlash = 0;
  user.nbLike = 0;
  user.nbDislike = 0;
  if(options.profile){
    user.profile = options.profile;
  }
  return user;
});
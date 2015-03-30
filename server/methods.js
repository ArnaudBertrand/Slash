Meteor.methods({
  'addDedication': function(dedication){
    Dedications.insert(dedication);
  },
  'addFollowing' : function(users) {
    Meteor.users.update({_id: users.followed}, {$addToSet : {followers: users.follower}});
    Meteor.users.update({_id: users.follower}, {$addToSet : {followings: users.followed}});
    //Meteor.users.findOne({_id: users.follower});
  },
  'addNewSlash': function(slash){
    // Only possible if user is connected
    if(Meteor.userdId()){
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
    }
  },
  'bFollowing' : function(users) {
    var e = Meteor.users.findOne({_id: users.follower});
    var found = false;
    if(e) {
      console.log(e);
      if(typeof e.followings != 'undefined') {
        e.followings.forEach(function(following) {
          if(following == users.followed) {
            found = true;
          }
        });
      }
    }
    return found;
  },
  'changeProfilePicture': function(url){
    Meteor.users.update({_id: Meteor.userId()}, {$set: {img: url}});
  },
  'dislikeSlash': function(slashId){
    Slashs.update({_id: slashId}, {$inc: {dislike: 1}})
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
  'likeSlash': function(slashId){
    Slashs.update({_id: slashId}, {$inc: {like: 1}})
  },
  'removeFollowing' : function(users) {
  Meteor.users.update({_id: users.followed}, {$pop: {followers: users.follower}});
  Meteor.users.update({_id: users.follower}, {$pop: {followings: users.followed}});
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
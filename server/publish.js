/** Dedications **/
Meteor.publish("dedications", function(){
  return Dedications.find();
});

/** Followers / Followings **/
Meteor.publish("followers", function (username) {
  var user = Meteor.users.findOne({username: username});
  // Only if user have followers
  if(user.followers){
    // Get followers
    var followerCursor = Meteor.users.find({_id: {$in: user.followers}});
    // Get profile pictures
    var picturesId = [];
    followerCursor.forEach(function(user){
      picturesId.push(user.img);
    });
    return [followerCursor,profileImage.find({_id: {$in: picturesId}})];
  }
  return [];
});

Meteor.publish("following", function (username) {
  var user = Meteor.users.findOne({username: username});
  // Only if user have follows people
  if(user.followings){
    // Get followings
    var followingCursor = Meteor.users.find({_id: {$in: user.followings}});
    // Get profiles pictures
    var picturesId = [];
    followingCursor.forEach(function(user){
      picturesId.push(user.img);
    });
    return [followingCursor,profileImage.find({_id: {$in: picturesId}})];
  }
  return [];
});

/** Profile **/
Meteor.publish("slashsByUsername", function(username){
  var user = Meteor.users.findOne({username: username}, {fields: {_id: 1}});
  return Slashs.find({authorId: user._id});
});

Meteor.publish("userProfile", function(username){
  return Meteor.users.find({username: username});
});

Meteor.publish("profileImage", function(username){
  var user = Meteor.users.findOne({username: username});
  return profileImage.find({_id: user.img});
});

/** Subjects **/
Meteor.publish("subjectByName", function(subjectName){
  return Subjects.find({name: subjectName});
});

Meteor.publish("slashsBySubjectName", function(subjectName){
  return Slashs.find({subject: subjectName});
});

Meteor.publish("slashUsers", function (subjectName) {
  var users = [];
  Slashs.find({subject: subjectName}).forEach(function(slash){
    if(users.indexOf(slash.authorId) == -1){
      users.push(slash.authorId);
    }
  });
  var userCursor = Meteor.users.find({_id: {$in: users}});

  var picturesId = [];
  userCursor.forEach(function(user){
    picturesId.push(user.img);
  });

  return [userCursor,profileImage.find({_id: {$in: picturesId}})];
});
Meteor.publish("subjectByName", function(subjectName){
  return Subjects.find({name: subjectName});
});

Meteor.publish("slashsBySubjectName", function(subjectName){
  return Slashs.find({subject: subjectName});
});

Meteor.publish("slashsByUsername", function(username){
  var user = Meteor.users.findOne({username: username}, {fields: {_id: 1}});
  return Slashs.find({authorId: user._id});
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

Meteor.publish("userProfile", function(username){
  console.log(username);
  return Meteor.users.find({username: username});
});

Meteor.publish("profileImage", function(username){
  var user = Meteor.users.findOne({username: username});
  return profileImage.find({_id: user.img});
});

Meteor.publish("slashProfilePictures", function(username){
  var user = Meteor.users.findOne({username: username});
  return profileImage.find({_id: user.img});
});
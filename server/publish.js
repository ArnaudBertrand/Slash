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

  return Meteor.users.find({_id: {$in: users}});
});

Meteor.publish("userProfile", function(username){
  return Meteor.users.find({username: username});
});
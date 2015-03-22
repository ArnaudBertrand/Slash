Meteor.methods({
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
  'findSubjectByName': function(name){
    return Subjects.findOne({name: name});
  },
  'addNewSlash': function(slash){
    slash.like = 0;
    slash.dislike = 0;
    Slashs.insert(slash);
    Meteor.users.update({_id: Meteor.userId()}, {$inc: {nbSlash: 1}})
  },
  'addDedication': function(dedication){
    Dedications.insert(dedication);
  },
  'changeProfilePicture': function(url){
    Meteor.users.update({_id: Meteor.userId()}, {$set: {img: url}});
  },
  'getImage': function(imgId){
    return profileImage.findOne({_id: imgId});
  },
  'likeSlash': function(slashId){
    Slashs.update({_id: slashId}, {$inc: {like: 1}})
  },
  'dislikeSlash': function(slashId){
    Slashs.update({_id: slashId}, {$inc: {dislike: 1}})
  }
});

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
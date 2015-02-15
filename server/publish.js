Meteor.publish("subjectByName", function(subjectName){
	return Subjects.find({name: subjectName});
});

Meteor.publish("slashsBySubjectName", function(subjectName){
	return Slashs.find({subject: subjectName}).fetch();
});
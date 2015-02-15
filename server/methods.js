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
	}
});
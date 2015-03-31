var ROUTE_PROFILE_VIEW = 'profileView';
var SORT_METHOD = 'slashsSortMethod';

Template.slashList.rendered = function(){
  Session.setDefault(SORT_METHOD, 'likeUp');
};

Template.slashList.helpers({
  showUserInfo: function() {
    var routeName = Router.current().route.getName();
    return ROUTE_PROFILE_VIEW !== routeName;
  },
  slashList: function(){
    var sort = Session.get(SORT_METHOD);
    var options = {};
    if(sort === 'likeUp'){
      options.sort = {like: -1};
    }
    if(sort === 'likeDown'){
      options.sort = {like: 1};      
    }
    if(sort === 'maxTime'){
      options.sort = {endDate: -1};
    }
    if(sort === 'minTime'){
      options.sort = {endDate: 1};      
    }

    var slashList = Slashs.find({},options).fetch();
    console.log(slashList);
    var routeName = Router.current().route.getName();
    if(ROUTE_PROFILE_VIEW !== routeName){
      slashList.forEach(function(slash){
        slash.author = Meteor.users.findOne({_id: slash.authorId});
        slash.picture = profileImage.findOne({_id: slash.author.img});
      });
    }
    return slashList;
  }
});

Template.slashList.events({
  'click .fa-thumbs-o-up:not(.activated)': function(event){
    event.target.className = event.target.className + " activated";
    Meteor.call('likeSlash',this._id);
  },
  'click .fa-thumbs-o-down:not(.activated)': function(){
    event.target.className = event.target.className + " activated";
    Meteor.call('dislikeSlash',this._id);
  }
});
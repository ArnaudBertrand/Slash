var ROUTE_PROFILE_VIEW = 'profileView';

Template.slashList.helpers({
  showUserInfo: function() {
  	var routeName = Router.current().route.getName();
    return ROUTE_PROFILE_VIEW !== routeName;
  }
});
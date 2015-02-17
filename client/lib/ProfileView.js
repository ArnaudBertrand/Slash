var IS_USER_PROFILE = 'isMyProfile';
Session.setDefault(IS_MY_PROFILE, false);

Template.profileView.helpers({
  isMyProfile: function(){
    return Session.get(IS_USER_PROFILE);
  }
});
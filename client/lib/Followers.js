Template.followers.events({
  'click .btn-back': function(){
    Router.go("profileView", {name: this.profileUsername});
  }
});
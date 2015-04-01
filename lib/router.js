Router.configure({
  // We use the appBody template to define the layout for the entire app
  layoutTemplate: 'appBody',

  // Use for unknown routes
  notFoundTemplate: 'home',
});

Router.map(function(){
  this.route('subject', {
    path: '/subject/:name',
    onBeforeAction: function(){
      // Increment nb of visitors
      Meteor.call('incrementSubjectVisitors', this.params.name);
      // Suscribes to server publications
      this.subjectSubscription = Meteor.subscribe('subjectByName', this.params.name);
      this.slashSubscription = Meteor.subscribe('slashsBySubjectName', this.params.name);
      this.userSlashSubscription = Meteor.subscribe('slashUsers', this.params.name);
      this.dedicationSubscription = Meteor.subscribe('dedications');
      this.next();
    },
    action: function () {
        this.render();
    }
  });

  this.route('profileView', {
    path: '/profile/:name',
    onBeforeAction: function(){
      // Suscribes to server publications
      this.imgSubscription = Meteor.subscribe('profileImage', this.params.name);
      this.slashSubscription = Meteor.subscribe('slashsByUsername', this.params.name);
      this.profileSubscription = Meteor.subscribe('userProfile', this.params.name);
      this.dedicationSubscription = Meteor.subscribe('dedications');
      this.next();
    },
    data: function(){
      var data = {};
      // Check if it is user profile
      var currentUser = Meteor.user();
      if(currentUser && currentUser.username === this.params.name){
        data.isUserProfile = true;
      } else {
        data.isNotUserProfile = true;
      }
      // Get 
      data.user = Meteor.users.findOne({username: this.params.name});
      return data;
    }
  });

  this.route('profileComplete', {
    path: '/profile/complete/:name',
    onBeforeAction: function(){
      // Suscribes to server publications
      this.imgSubscription = Meteor.subscribe('profileImage', this.params.name);
      this.profileSubscription = Meteor.subscribe('userProfile', this.params.name);
      this.next();
    },
    data: function(){
      var data = {};
      var currentUser = Meteor.user();
      if(currentUser && currentUser.username === this.params.name){
        data.isUserProfile = true;
      } else {
        data.isNotUserProfile = true;
      }
      data.user = Meteor.users.findOne({username: this.params.name});
      return data;
    }
  });

  this.route('followers', {
    path: 'followers/:name',
    onBeforeAction: function(){
      // Suscribes to server publications
      this.followersSubscription = Meteor.subscribe('followers', this.params.name);
      this.profileSubscription = Meteor.subscribe('userProfile', this.params.name, function(){
        console.log('test');
      });
      this.next();
    },
    data: function(){
      var data = {};
      data.profileUsername = this.params.name;
      return data;
    }
  });

  this.route('following', {
    path: 'following/:name',
    onBeforeAction: function(){
      // Suscribes to server publications
      this.followingSubscription = Meteor.subscribe('following', this.params.name);
      this.profileSubscription = Meteor.subscribe('userProfile', this.params.name);
      this.next();
    },
    data: function(){
      var data = {};
      data.profileUsername = this.params.name;
      return data;
    }
  });

  this.route('home', {
    path: '/',
    action: function() {
      if(Meteor.user()){
        Router.go('profileView',{name: Meteor.user().username });
      }
      this.render();
    }
  });
});
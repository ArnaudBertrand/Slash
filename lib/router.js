Router.configure({
  // We use the appBody template to define the layout for the entire app
  layoutTemplate: 'appBody',

  // Use for unknown routes
  notFoundTemplate: 'appNotFound',

  // Wait on the following subscriptions before rendering the page
  waitOn: function(){
    return [];
  }
});

Router.map(function(){
  this.route('subject', {
    path: '/subject/:name',
      waitOn: function(){
        // Suscribes
        return [Meteor.call('incrementSubjectVisitors', this.params.name),
        Meteor.subscribe('subjectByName', this.params.name),
        Meteor.subscribe('slashsBySubjectName', this.params.name),
        Meteor.subscribe('slashUsers', this.params.name),
        Meteor.subscribe('dedications')
        ];
      },
      data: function(){
        var subject = Subjects.findOne();
        return {
          subject: subject
        };
      },
      action: function () {
          this.render();
      }
  });

  this.route('profileView', {
    path: '/profile/:name',
    onBeforeAction: function(){
      this.imgSubscription = Meteor.subscribe('profileImage', this.params.name);
      this.slashSubscription = Meteor.subscribe('slashsByUsername', this.params.name);
      this.profileSubscription = Meteor.subscribe('userProfile', this.params.name);
      this.dedicationSubscription = Meteor.subscribe('dedications');
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

  this.route('profileComplete', {
    path: '/profile/complete/:name',
    onBeforeAction: function(){
      this.imgSubscription = Meteor.subscribe('profileImage', this.params.name);
      this.profileSubscription = Meteor.subscribe('userProfile', this.params.name);
      this.next();
    },
    data: function(){
      var data = {};
      var user = Meteor.user();
      if(user && user.username === this.params.name){
        data.isUserProfile = true;
      }
      data.user = Meteor.users.findOne({username: this.params.name});
      return data;
    }
  });

  this.route('followers', {
    path: 'followers/:name',
    data: function(){
      var data = {
        followers:[ 
          {username: "Nono", name: "Arnaud Bertrand", followers: 110, following: 115},
          {username: "Linepo", name: "Arnaud Bertrand", followers: 190, following: 155},
          {username: "Sab", name: "Arnaud Bertrand", followers: 170, following: 125},
          {username: "Nono", name: "Arnaud Bertrand", followers: 110, following: 115},
          {username: "Linepo", name: "Arnaud Bertrand", followers: 190, following: 155},
          {username: "Sab", name: "Arnaud Bertrand", followers: 170, following: 125},
          {username: "Linepo", name: "Arnaud Bertrand", followers: 190, following: 155},
          {username: "Nono", name: "Arnaud Bertrand", followers: 110, following: 115},
          {username: "Linepo", name: "Arnaud Bertrand", followers: 190, following: 155}
        ]
      }
      data.profileUsername = this.params.name;
      return data;
    }
  });

  this.route('following', {
    path: 'following/:name',
    data: function(){
      var data = {
        followers:[ 
          {username: "Nono", name: "Arnaud Bertrand", followers: 110, following: 115},
          {username: "Linepo", name: "Arnaud Bertrand", followers: 190, following: 155},
          {username: "Sab", name: "Arnaud Bertrand", followers: 170, following: 125},
          {username: "Nono", name: "Arnaud Bertrand", followers: 110, following: 115},
          {username: "Linepo", name: "Arnaud Bertrand", followers: 190, following: 155},
          {username: "Sab", name: "Arnaud Bertrand", followers: 170, following: 125},
          {username: "Linepo", name: "Arnaud Bertrand", followers: 190, following: 155},
          {username: "Nono", name: "Arnaud Bertrand", followers: 110, following: 115},
          {username: "Linepo", name: "Arnaud Bertrand", followers: 190, following: 155}
        ]
      }
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
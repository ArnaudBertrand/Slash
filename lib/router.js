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
        Meteor.subscribe('slashUsers', this.params.name)
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
    waitOn: function(){
        // Suscribes
        return [
          Meteor.subscribe('slashsByUsername', this.params.name),
          Meteor.subscribe('userProfile', this.params.name)
        ];
      },
      data: function(){
      var data = {};
      var user = Meteor.user();
      if(user && user.username === this.params.name){
        data.isUserProfile = true;
      } else {
        data.isNotUserProfile = true;
      }
      
      data.user = Meteor.users.findOne();
      console.log(data.user);
      return data;
    }
  });

  this.route('profileComplete', {
    path: '/profile/complete/:name',
    data: function(){
      var data = {
        firstName: { name: "First Name", value: "Pauline" },
        lastName: { name: "Last Name", value: "Michaud" },
        gender: { name: "Gender", value: "Female", options: {female: "checked"} },
        email: { name: "E-mail", type:"email", value: "paulinemichaud1@sfr.fr" },
        phone: { name: "Phone number", value: "123-4567-890" },
        description: { name: "Description", value: "I'm kind, nice and I like pizza, cats and movies :) :) :)" }
      };

      var user = Meteor.user();
      if(user && user.username === this.params.name){
        data.isUserProfile = true;
      }
      data.profileUsername = this.params.name;
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
Fiber = Npm.require('fibers');
var mongo_url = process.env.MONGOHQ_URL;

/** Batch for dedication publications **/
function DedicationBatch (){
  if ( arguments.callee._singletonInstance )
    return arguments.callee._singletonInstance;
  arguments.callee._singletonInstance = this;  
  
  this.run = function(){
    this.timer = 10000;

    this.update = function(){
      this.randomMessages = [
        'Messages can be sorted by like, dislike or time',
        'Create any post in any subject you want, world is yours',
        'Send a message here by click on the + right here ==>',
        'Invite your friends to share the experience :)',
        'The default value for a slash to exist is one day',
        'All slashs you send will be deleted after the deadline you fix !'
      ];

      var dediSize = Dedications.find({}).count();
      // If size too small then add random messages
      if(dediSize < 2){
        var i = Math.floor(Math.random()*(this.randomMessages.length));
        Dedications.insert({text: this.randomMessages[i], date: Date.now()});
      }
      // Delete the first dedication
      var firstDedi = Dedications.findOne({},{sort: {date: 1}});
      Dedications.remove({_id: firstDedi._id});
    }

    Meteor.setInterval(this.update,this.timer);
  }
};

new DedicationBatch().run();

/** Batch for slashes remove **/
function SlashRemoveBatch (){
  if ( arguments.callee._singletonInstance )
    return arguments.callee._singletonInstance;
  arguments.callee._singletonInstance = this;  
  
  function running(){
    var now = new Date();
    // Insert new slashs
    var slashsToMove = SlashsWait.find({startDate: {$lte: now}}).fetch();
    _.each(slashsToMove, function(slash){
      Slashs.insert(slash);
    });
    SlashsWait.remove({startDate: {$lte: now}});
    // Remove old slashs
    Slashs.remove({endDate: {$lt: now}});
    
    Meteor.setTimeout(running,1000*(61-now.getSeconds()));    
  }
  this.run = running;
};

new SlashRemoveBatch().run();
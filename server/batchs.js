Fiber = Npm.require('fibers');

/** Batch for dedication publications **/
function DedicationBatch (){
  if ( arguments.callee._singletonInstance )
    return arguments.callee._singletonInstance;
  arguments.callee._singletonInstance = this;  
  
  this.run = function(){
    this.timer = 10000;

    this.update = function(){
      this.randomMessages = [
        'Hello first message',
        'Hello second message',
        'Hello third message',
        'Hello fourth message',
        'Hello fifth message'
      ];

      var dediSize = Dedications.find({}).count();
      // If size too small then add random messages
      if(dediSize < 2){
        var i = Math.floor(Math.random()*(this.randomMessages.length));
        Dedications.insert({text: this.randomMessages[i], date: Date.now()});
      }
      // Delete the first dedication
      var firstDedi = Dedications.findOne();
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
    Slashs.remove({endDate: {$lt: now}});
    Meteor.setTimeout(running,1000*(61-now.getSeconds()));    
  }
  this.run = running;
};

new SlashRemoveBatch().run();
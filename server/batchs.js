Fiber = Npm.require('fibers');

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
        console.log(i);
        console.log(this.randomMessages[i]);
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
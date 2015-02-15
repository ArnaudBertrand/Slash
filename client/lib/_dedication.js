var DEDICATION_KEY = 'currentDedication';
Session.setDefault(DEDICATION_KEY, 'Hey salut ca roule ma poule');

Template.dedication.helpers({
  currentDedication: function(){
    return Session.get(DEDICATION_KEY);
  }
});
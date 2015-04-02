Template.dedication.created = function(){
  var previousId = '';
  this.autorun(function(){
    var currentDedication = Dedications.findOne({},{sort: {date: 1}});
    if(currentDedication && previousId !== currentDedication._id){
      // Transition between slashs
      $('.dedication-text').hide(0, function(){
        $('.dedication-text').fadeIn(1000);
      });
      // Avoid to repeat dedication on change
      previousId = currentDedication._id;
    }
  });
}

Template.dedication.helpers({
  'currentDedication': function(){
    return Dedications.findOne({},{sort: {date: 1}});
  }
})

Template.dedication.events({
  'click .display-add-dedication': function(event,template){
    if(Meteor.user()){
      $('#add-dedication-popup').removeClass('hidden');
    } else {
      $('#mSignIn').modal('show');
    }
  },
  'click .btn-danger': function(event,template){
    $('#add-dedication-popup').addClass('hidden');
  },
  'click .btn-success': function(event,template){
    // Add dedication
    var dedic = {};
    dedic.author = Meteor.user();
    dedic.text = $('#add-dedication-popup [name=dedication-text]').val();
    Meteor.call('addDedication',dedic);

    // Reset
    $('#add-dedication-popup [name=dedication-text]').val('')
    $('#add-dedication-popup').addClass('hidden');
  }
});
Meteor.startup(function() {
  Uploader.finished = function(index, fileInfo, templateContext) {
    Uploads.insert(fileInfo);
  }
});
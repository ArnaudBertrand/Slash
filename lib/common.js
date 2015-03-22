profilImageStore = new FS.Store.GridFS("profileImage");

profileImage = new FS.Collection('profileImage',{
  stores: [profilImageStore]
});

profileImage.deny({
  insert: function(){
    return false;
  },
  update: function(){
    return false;
  },
  remove: function(){
    return true;
  },
  download: function(){
    return false;
  }
});

profileImage.allow({
  insert: function(){
    return true;
  },
  update: function(){
    return true;
  },
  remove: function(){
    return false;
  },
  download: function(){
    return true;
  }
});
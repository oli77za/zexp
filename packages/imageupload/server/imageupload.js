Meteor.methods({
  'uploadImage': function(imageId, imageData) {
    if (imageId != null) {
      Images.remove({_id: imageId});
    }
    return Images.insert({
      data: imageData
    });
  },
  'removeImage': function(imageId) {
    Images.remove({_id: imageId});
  }
});


Meteor.publish('image', function(imageId) {
  return Images.find({_id: imageId});
});

ImageUpload = {
  getImageData: function(imageId) {
    var image = Images.findOne({_id: imageId});
    return image ? image.data : null;
  }
}

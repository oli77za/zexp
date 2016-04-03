Meteor.methods({
  'uploadImage': function(image) {
      if (image._id) {
          Images.update({_id: image._id}, image);
          return image._id;
      } else {
          return Images.insert(image);
      }
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

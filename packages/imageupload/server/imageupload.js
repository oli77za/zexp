Meteor.methods({
  'uploadImage': function(imageId, imageData) {
    if (imageId == null) {
      console.log('Inserting new image');
      return Images.insert({
	data: imageData
      });
    } else {
      console.log('Updating existing image');
      return Image.update({
	data: imageData
      });
    }
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

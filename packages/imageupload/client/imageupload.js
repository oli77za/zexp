var reactiveImageId = new ReactiveVar();

ImageUpload = {
  imageId: function() {
    return reactiveImageId ? reactiveImageId.get() : null; 
  }
}

Template.imageupload.onCreated(function() {
  var self = this;
  this.autorun(function() {
    if (reactiveImageId.get()) {
      console.log("Subscribing for image: " + reactiveImageId.get());
      self.subscribe("image", reactiveImageId.get());
    }
  });
});

Template.imageupload.helpers({
  imageData: function() {
    var image = Images.findOne({_id: reactiveImageId.get()});
    return image ? image.data : null;
  }
});

Template.imageupload.events({
  'change input[type="file"]': function(event, template) {
    var file = event.currentTarget.files[0];
    if (!file.type.match('image.*')) {
      return;
    }
    var fileReader = new FileReader();
    fileReader.onload = function(readerEvent) {
      Meteor.call('uploadImage',
        template.data.imageId,
        readerEvent.target.result,
        function(error, result) {
          if (error) {
          } else {
            reactiveImageId.set(result);
          }
        });
    };
    //fileReader.readAsDataURL(file);
    fileReader.readAsDataURL(file);
  }
});

var reactiveImageId = new ReactiveVar();

ImageUpload = {
  imageId: function() {
    return reactiveImageId ? reactiveImageId.get() : null;
  },
  removeImage: function(imageId) {
    Meteor.call('removeImage', imageId);
  }
}

Template.imageupload.onCreated(function() {
  var self = this;
  if(this.data.imageId) {
    self.subscribe("image", this.data.imageId);
    reactiveImageId.set(this.data.imageId);
  }
  this.autorun(function() {
    if (reactiveImageId.get()) {
      self.subscribe("image", reactiveImageId.get());
    }
  });
});

Template.imageupload.onRendered(function() {
  var self = this;
  this.autorun(function() {
    reactiveImageId.set(Template.currentData().imageId);
  });
});

Template.imageupload.onDestroyed(function() {
  reactiveImageId.set(null);
});

Template.imageupload.helpers({
  imageData: function() {
    var image = Images.findOne({_id: reactiveImageId.get()});
    ImageUpload._image = image;
    return image ? "data:image/jpeg;base64," + btoa(String.fromCharCode.apply(null, ImageUpload._image.data)): null;
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
        new Uint8Array(readerEvent.target.result),
        function(error, result) {
          if (error) {
	    console.log(error);
	    alert("Failed to upload image");
          } else {
            reactiveImageId.set(result);
          }
        });
    };
    fileReader.readAsArrayBuffer(file);
  }
});

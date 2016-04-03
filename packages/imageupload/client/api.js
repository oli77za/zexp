
ImageUpload = {
    imageId: function() {
        return reactiveImageId ? reactiveImageId.get() : null;
    },
    removeImage: function(imageId) {
        Meteor.call('removeImage', imageId);
    }
};


ImageUpload = {
    removeImage: function(imageId) {
        Meteor.call('removeImage', imageId);
    }
};

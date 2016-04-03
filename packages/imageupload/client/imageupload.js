Template.imageupload.onCreated(function() {
    var self = this;
    this.image = new ReactiveVar({});
    if(this.data.imageId) {
        self.subscribe("image", this.data.imageId);
    }
    this.autorun(function() {
        var image = Images.findOne({_id: self.data.imageId});
        if (image) {
            self.image.set(image);
        }
    });
});

Template.imageupload.helpers({
    imageData: function() {
        var image= Template.instance().image.get();
        if (image && image.data) {
            return "data:image/jpeg;base64," +_arrayBufferToBase64(image.data);
        }
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
            var image = template.image.get();
            image.data = new Uint8Array(readerEvent.target.result);
            template.image.set(image);
        };
        fileReader.readAsArrayBuffer(file);
    },
    'click .save_button': function(event, template) {
        var image = template.image.get();
        Meteor.call('uploadImage',
                    image,
                    function(error, result) {
                        if (error) {
                            console.log(error);
                            alert("Failed to upload image");
                        } else {
                            image._id = result;
                            template.image.set(image);
                            template.data.imageSavedCallback(image);
                        }
                    });
    }
});

function _arrayBufferToBase64( bytes ) {
    var binary = '';
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
}




Template.imageupload.onCreated(function() {
    var self = this;
    this.imagePreview = new ReactiveVar();
    if(this.data.imageId) {
        self.subscribe("image", this.data.imageId);
    }
    this.autorun(function() {
        var image = Images.findOne({_id: self.data.imageId});
        if (image) {
            self.imagePreview.set(image.data);
        }
    });
});

Template.imageupload.helpers({
    imageData: function() {
        return "data:image/jpeg;base64," +_arrayBufferToBase64(Template.instance().imagePreview.get());
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
            template.imagePreview.set(readerEvent.target.result);
        };
        fileReader.readAsArrayBuffer(file);
    },
    'click .save_button': function(event, template) {
        Meteor.call('uploadImage',
                    template.data.imageId,
                    new Uint8Array(template.imagePreview.get()),
                    function(error, result) {
                        if (error) {
                            console.log(error);
                            alert("Failed to upload image");
                        } else {
                            template.data.imageSavedCallback(result);
                        }
                    });
    }
});

function _arrayBufferToBase64( buffer ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
}
function imageBytesToString ( imageByteBuffer) {
    var imageString = "data:image/jpeg;base64," + btoa(String.fromCharCode.apply(null, imageByteBuffer));
}

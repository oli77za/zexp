Template.Categories.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('categories');
  });
});

Template.Categories.helpers({
  categories: function() {
    return Categories.find({});
  }
});


Template.Categories.events({
  'click .add_button' : function(event) {
    Categories.insert({
      code: $('input[name="code"]').val(),
      name: $('input[name="name"]').val(),
      vat: $('input[name="vat"]').val()
    });
  },
  'click .remove_button': function(event) {
    Categories.remove({
      _id: this._id
    });
  }
});

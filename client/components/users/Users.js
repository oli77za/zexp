Template.Users.onCreated(function() {
  var self = this;
  self.autorun(function() {
    Meteor.subscribe('all_users');
  });
});


Template.Users.helpers({
  users: function () {
    return Meteor.users.find({});
  }
});
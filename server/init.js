Meteor.startup(function() {
  //
  // Initialize the login service
  //
  ServiceConfiguration.configurations.remove({});
  ServiceConfiguration.configurations.insert({
    "service": "google",
    "loginStyle": "popup",
    "clientId": Meteor.settings.private.services.google.clientId,
    "secret": Meteor.settings.private.services.google.secret
  });
});
Template.homepage.events({
    'click .login_btn': function() {
        Meteor.loginWithGoogle();
    }
});

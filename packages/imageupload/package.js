Package.describe({
  name: 'oli77za:imageupload',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use(['templating', 'reactive-var'], 'client');
  api.use('mongo', ['client', 'server']);
  api.addFiles(['collections.js']);
  api.addFiles(['server/imageupload.js'], 'server');
  api.addFiles(['client/imageupload.html', 'client/imageupload.js'], 'client');
  api.export('ImageUpload', ['client', 'server']);
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('oli77za:imageupload');
  api.addFiles('imageupload-tests.js');
});

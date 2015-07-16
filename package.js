Package.describe({
  name: 'rainhaven:iron-seo',
  version: '1.0.1',
  // Brief, one-line summary of the package.
  summary: 'Title and Meta Tags for Iron Router and Social Sharing',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/RainHaven/iron-seo',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.3.2');
  api.use(['underscore', 'iron:router@1.0.7']);
  api.addFiles('rainhaven:iron-seo.js', 'client');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('rainhaven:iron-seo');
  api.addFiles('rainhaven:iron-seo-tests.js');
});

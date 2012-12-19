Package.describe({
  summary: "Run node-ntwitter against your meteor app"
});

Package.on_use(function (api, where) {
  // api.use('node-modules', 'server');

  api.add_files('ntwitter.js', 'server');
});
Meteor.nTwitter = __meteor_bootstrap__.require('ntwitter')

Meteor.nTwitter.prototype.streamTweets = function(keywords, collection_str, options) {
    console.log('... ... streamTweets')
    var _this = this
    _this.stream(
        'statuses/filter',
        { track: keywords },
        function(stream) {
            stream.on('data', function(tweet) {
              console.log(tweet.text);
              Fiber(function() {
                // Store some options on this tweet to help filtering out later
                _.extend(tweet, options)
                // Insert the Tweet into the Collection
                id = eval(collection_str).insert(tweet)
              }).run();
            });
            stream.on('error', function(error, code) {
                console.log("My error: " + error + ": " + code)
            });
            stream.on('end', function (response) {
              // Handle a disconnection
              console.log("Twitter connection ended: " + response)
            });
            stream.on('destroy', function (response) {
              // Handle a 'silent' disconnection from Twitter, no end/error event fired
              console.log("Twitter destroyed the connection: " + response)
            });
            _this.current_stream = stream
        }
    );
}

Meteor.nTwitter.prototype.destroyTweets = function() {
    console.log('... ... destroyTweets')
    var _this = this
    console.log('... ... ... attempting to destroy the current stream: ' + _this.current_stream.destroy)
}

Meteor.nTwitter.prototype.searchTweets = function(query, collection_str) {
  console.log('... ... searchTweets: ' + query)
  var _this = this

  _this.search(query, {}, function(err, data) {
    // console.log(data)
    _collection = eval(collection_str)
    Fiber(function() {
      _collection.insert(data)
    }).run()
  });
}
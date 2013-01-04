Meteor.nTwitter = __meteor_bootstrap__.require('ntwitter')

Meteor.nTwitter.prototype.streamTweets = function(keywords, product_slug) {
    console.log('... ... streamTweets')
    this.stream(
        'statuses/filter',
        { track: keywords },
        function(stream) {
            stream.on('data', function(tweet) {
            console.log(tweet.text);
              Fiber(function() {
                  tweet.product_slug = product_slug
                  id = Tweets.insert(tweet)
              }).run();
            });
            stream.on('error', function(error, code) {
                console.log("My error: " + error + ": " + code);
            });
            stream.on('end', function (response) {
              // Handle a disconnection
              console.log("Twitter connection ended: " + response)
            });
            stream.on('destroy', function (response) {
              // Handle a 'silent' disconnection from Twitter, no end/error event fired
              console.log("Twitter destroyed the connection: " + response)
            });
        }
    );
}

Meteor.nTwitter.prototype.destroyTweets = function() {
    console.log('... ... destroyTweets')
    this.stream.destroy
}
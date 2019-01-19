var Twitter = require('twitter');

var client = new Twitter({
    consumer_key: 'VVi6FSB9icPEDcQ394d7fJoIi',
    consumer_secret: 'qpzSCJ5jFRzXNeXCv3LqokiKr4ZXEh3BTatqG4MaiCSobPRGVk',
    access_token_key: '3142021121-KyouqcIKFZFXUKIDqa60CuTqWklBW0BixEQSUfh',
    access_token_secret: 'sG2rKXJSgDBImzOV676SNhjBcqHWOJ5Kq5iF4Si9lfYLV'
  });
  var params = {screen_name: 'SpartaHack'};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      console.log(tweets);
    }
  });
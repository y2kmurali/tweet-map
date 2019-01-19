var Twitter = require('twit');

var T = new Twitter({
    consumer_key: 'VVi6FSB9icPEDcQ394d7fJoIi',
    consumer_secret: 'qpzSCJ5jFRzXNeXCv3LqokiKr4ZXEh3BTatqG4MaiCSobPRGVk',
    access_token: '3142021121-KyouqcIKFZFXUKIDqa60CuTqWklBW0BixEQSUfh',
    access_token_secret: 'sG2rKXJSgDBImzOV676SNhjBcqHWOJ5Kq5iF4Si9lfYLV'
});
var stream = T.stream('statuses/sample')
stream.on('tweet', function (tweet) {
    console.log(tweet)
})
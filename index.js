var Twitter = require('twit');

var T = new Twitter({
    consumer_key: 'VVi6FSB9icPEDcQ394d7fJoIi',
    consumer_secret: 'qpzSCJ5jFRzXNeXCv3LqokiKr4ZXEh3BTatqG4MaiCSobPRGVk',
    access_token: '3142021121-KyouqcIKFZFXUKIDqa60CuTqWklBW0BixEQSUfh',
    access_token_secret: 'sG2rKXJSgDBImzOV676SNhjBcqHWOJ5Kq5iF4Si9lfYLV'
});
var loc = ['-125.853', '28.74', '-66.22', '47.029'];
var stream = T.stream('statuses/filter', { locations: loc });
var count = 0;
stream.on('tweet', function (tweet) {
    count++;
    console.log(tweet);
    if (count >= 1) {
        stream.stop();
    }
})

var AYLIENTextAPI = require('aylien_textapi');
var textapi = new AYLIENTextAPI({
    application_id: "714f8d76",
    application_key: "5a765b0561ebf79c9b9debb7e36f087d"
});
textapi.sentiment({
    'text': "Thicc"
}, function (error, response) {
    if (error === null) {
        console.log(response);
    }
});
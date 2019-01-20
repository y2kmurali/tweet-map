var Twitter = require('twit');

var T = new Twitter({
    consumer_key: 'VVi6FSB9icPEDcQ394d7fJoIi',
    consumer_secret: 'qpzSCJ5jFRzXNeXCv3LqokiKr4ZXEh3BTatqG4MaiCSobPRGVk',
    access_token: '3142021121-KyouqcIKFZFXUKIDqa60CuTqWklBW0BixEQSUfh',
    access_token_secret: 'sG2rKXJSgDBImzOV676SNhjBcqHWOJ5Kq5iF4Si9lfYLV'
});
var loc = ['-125.853', '28.74', '-66.22', '47.029'];

var AYLIENTextAPI = require('aylien_textapi');
var textapi = new AYLIENTextAPI({
    application_id: "714f8d76",
    application_key: "5a765b0561ebf79c9b9debb7e36f087d"
});

function handleState(state, rr) {
    console.log(state);
    if (rr){
        if (rr["polarity"] === "positive"){
            console.log(50 + 50*rr["polarity_confidence"]);
        }
        else if (rr["polarity"] === "negative"){
            console.log(50 - 50*rr["polarity_confidence"]);
        }
        else{
            console.log(50);
        }
    }
}

function handleSentiment(st, text) {
    textapi.sentiment({
        'text': text
    }, function (error, response) {
        if (error === null) {
            //rr=response;//console.log(response);
            handleState(st, response);
        }
    });
}

function handleTweet(tweet) {
    var st = tweet["place"]["full_name"].split(", ")[1];
    if (st && st.length < 3) {
        if (tweet["extended_tweet"]) {
            handleSentiment(st, tweet["extended_tweet"]["full_text"]);
        } else {
            handleSentiment(st, tweet["text"]);
        }
    }
}

function getTweets() {
    var cc = 0;
    var stream = T.stream('statuses/filter', { locations: loc });
    stream.on('tweet', function (tweet) {
        cc++;
        //console.log("Tweet");
        handleTweet(tweet);
        if (cc >= 5) {
            stream.stop();
        }
    });
    console.log("====================");
    setTimeout(getTweets, 2500);
}
getTweets();

//neg pol.
    // 50-50*(confidence)
//pos pol. 
    // 50 + 50(confidence)
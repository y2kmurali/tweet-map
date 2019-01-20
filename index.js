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
    application_id: "b5fde251",
    application_key: "e5ac3930db6b0f52faef96f53e2ae485"
});

function handleState(state, rr) {
    if (rr) {
        if (rr["polarity"] === "positive") {
            module.exports.states_data["US-" + state] = (module.exports.states_data["US-" + state] + (50 + 50 * rr["polarity_confidence"])) / 2
        }
        else if (rr["polarity"] === "negative") {
            module.exports.states_data["US-" + state] = (module.exports.states_data["US-" + state] + (50 - 50 * rr["polarity_confidence"])) / 2
        }
        else {
            module.exports.states_data["US-" + state] = (module.exports.states_data["US-" + state] + (50)) / 2
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
    if (tweet["place"]) {
        var st = tweet["place"]["full_name"].split(", ")[1];
        if (st && st.length < 3) {
            if (tweet["extended_tweet"]) {
                handleSentiment(st, tweet["extended_tweet"]["full_text"]);
            } else {
                handleSentiment(st, tweet["text"]);
            }
        }
    }
}

function getTweets() {
    var cc = 0;
    var stream = T.stream('statuses/filter', { locations: loc });
    stream.on('tweet', function (tweet) {
        //console.log(tweet);
        cc++;
        //console.log("Tweet");
        handleTweet(tweet);
        if (cc >= 5) {
            stream.stop();
        }
    });
    //console.log("====================");
    //console.log(states_data);
    setTimeout(getTweets, 1500);
}
getTweets();

//   State ID      avg value
//{ id: "US-AL", value: 60.524 },

module.exports.states_data = {
    "US-AL": 50.0,
    "US-AK": 50.0,
    "US-AR": 50.0,
    "US-AZ": 50.0,
    "US-CA": 50.0,
    "US-CO": 50.0,
    "US-CT": 50.0,
    "US-DE": 50.0,
    "US-DC": 50.0,
    "US-FL": 50.0,
    "US-GA": 50.0,
    "US-HI": 50.0,
    "US-ID": 50.0,
    "US-IL": 50.0,
    "US-IN": 50.0,
    "US-IA": 50.0,
    "US-KS": 50.0,
    "US-KY": 50.0,
    "US-LA": 50.0,
    "US-ME": 50.0,
    "US-MD": 50.0,
    "US-MA": 50.0,
    "US-MI": 50.0,
    "US-MN": 50.0,
    "US-MS": 50.0,
    "US-MO": 50.0,
    "US-MT": 50.0,
    "US-NE": 50.0,
    "US-NV": 50.0,
    "US-NH": 50.0,
    "US-NJ": 50.0,
    "US-NM": 50.0,
    "US-NY": 50.0,
    "US-NC": 50.0,
    "US-ND": 50.0,
    "US-OH": 50.0,
    "US-OK": 50.0,
    "US-OR": 50.0,
    "US-PA": 50.0,
    "US-RI": 50.0,
    "US-SC": 50.0,
    "US-SD": 50.0,
    "US-TN": 50.0,
    "US-TX": 50.0,
    "US-UT": 50.0,
    "US-VA": 50.0,
    "US-VT": 50.0,
    "US-WA": 50.0,
    "US-WV": 50.0,
    "US-WI": 50.0,
    "US-WY": 50.0
}
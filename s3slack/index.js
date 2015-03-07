const SLACK_TOKEN = "....";
const TYPETALK_TOKEN = "....";

var req = require('request');

exports.handler = function(event, context) {
    var filename = event.Records[0].s3.object.key;
    slack(SLACK_TOKEN, "your slack channel id", "Put: "+filename);
    typetalk(TYPETALK_TOKEN, "your typetalk toppick id", "Put: "+filename);
};

function slack(token, channel, message) {
    req.post('https://slack.com/api/chat.postMessage')
        .form({
            token: token,
            channel: channel,
            text: message
        })
        .on('response', function (response) {
          response.on('data', function(data) {
            context.done(null, data);
          });
        })
        .on('error', function (err) {
            cotext.done(err, 'Failed post the chat');
        });
}

function typetalk(token, topic_id, message) {
    req.post('https://typetalk.in/api/v1/topics/'+topic_id+'?typetalkToken='+token)
        .form({
            message: message
        })
        .on('response', function (response) {
          response.on('data', function(data) {
            context.done(null, data);
          });
        })
        .on('error', function (err) {
            cotext.done(err, 'Failed post the chat');
        });
}
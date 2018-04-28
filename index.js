//the lambda function that your Alexa skill will connect to.

'use strict';

const AWS = require('aws-sdk');
const Alexa = require('alexa-sdk');

const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

const handlers = {
    'LaunchRequest': function () {
        this.emit(':ask', 'welcome to dog pictures');
    },
    'ShowAllDogPicturesIntent': function () {
        var docClient = new AWS.DynamoDB.DocumentClient();
        var dogPictureNumber = 0;
        
        var params = {
            TableName: "DogPictures",
            Key: {
                "pictureId": 0,
            },
            UpdateExpression: "set pictureToShow = :newImageNumber",
            ExpressionAttributeValues: {
                ":newImageNumber" : dogPictureNumber
            }
        };
        docClient.update(params, (() => {
            this.emit(':ask', 'you asked for all images');
        }));
    },
    'ShowDogPictureIntent': function () {
        var docClient = new AWS.DynamoDB.DocumentClient();
        var dogPictureNumber = this.event.request.intent.slots.number.value;
        
        var params = {
            TableName: "DogPictures",
            Key: {
                "pictureId": 0,
            },
            UpdateExpression: "set pictureToShow = :newImageNumber",
            ExpressionAttributeValues: {
                ":newImageNumber" : dogPictureNumber
            }
        };
        docClient.update(params, (() => {
            this.emit(':ask', 'you said image ' + dogPictureNumber);
        }));
    },
    'AMAZON.HelpIntent': function () {
        this.emit(':tell', 'you can ask for a dog picture by saying dog number 1');
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', 'bye bye, have a nice day');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'bye bye, have a nice day');
    },
};

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

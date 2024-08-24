const AWS = require("aws-sdk");
AWS.config.update({ region: 'us-east-1' });
const dynamoDB = new AWS.DynamoDB({ apiVersion: 'latest' });
const { uuid } = require('uuidv4');
const _ = require('lodash');
const jsonpath = require('jsonpath');

const s3SourceBucket = 'categorized-sports-event-data';
const dynamoDbTable = 'us-sports-event-replayer';


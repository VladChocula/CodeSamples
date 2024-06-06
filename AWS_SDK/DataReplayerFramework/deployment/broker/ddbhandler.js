const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });
const dynamo = new AWS.DynamoDB.DocumentClient();
const tableName = 'us-sports-event-replayer';

const sendResponse = (status, body) => {
    const response = {
        statusCode: status,
        headers: {
            'Content-Type': 'application/json',
        },
        body,
    };
    return response;
};

exports.handler = async (event) => {
    const environemnt = event.queryStringParameters ? event.queryStringParameters.environment : null;
    if (!['Test', 'Cert', 'Dev'].includes(environment)) {
        return sendResponse( 400,
            `{"Message": "Unrecognized environment: ${environemnt}, options are Test, Cert, Dev"}`);
    }
    try {
        let date = new Date().getTime();
        const params = {
            ExpressionAttributeValues: {
                ':env': environemnt,
                ':end_event_time': date + (65 * 1000),
                ':start_time': date,
            },
            KeyConditionExpression: 'environment = :env AND delivery_time BETWEEN :start_time AND :end_time',
            TableName: tableName,
        };
        const events = await dynamo.query(params).promise();
        return { body: JSON.stringify(events), statusCode: 200 };
    } catch (err) {
        console.error(err);
    }
}
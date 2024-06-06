const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });
const S3 = new AWS.S3({ apiVersion: 'latest' });
const jp = require('jsonpath');

exports.handler = async (event) => {
    const bucketName = 'categorized-sports-event-data';
    const objKey = events.Records[0].s3.object.key;
    
    const s3Params = {
        Bucket: bucketName,
        Key: objKey
    };

    const s3Obj = await S3.getObject(s3Params, (err, data) => {
        if (err) {
            console.log(`Error when getting object from S3: ${err}`);
        }
    }).promise();

    const jsonMessage = JSON.parse(s3Obj.Body.toString());
    const timeStamp = objKey.replace(/\D/g, "");
    const messageType = jsonMessage.messageType;
    let eventId = '';

    if (messageType === "COMPOUND_MESSAGE") {
        eventId = jsonMessage.messages[0].eventId;
    } else {
        eventId = jsonMessage.eventId;
    }
    
    const newKey = `${eventId}/${messageType}_${timeStamp}.json`;

    S3.copyObject({
        Bucket: bucketName,
        CopySource: `${bucketName}/${objKey}`,
        Key: newKey
    }).promise();

    const response = {
        statusCode: 200,
        body: JSON.stringify(`Successful categorization of ${newKey}`),
    };

    console.log(response);
    return response;
}
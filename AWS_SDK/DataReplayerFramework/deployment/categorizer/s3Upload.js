const AWS = require("aws-sdk");
const fs = require('fs');
const s3 = new AWS.S3({ apiVersion: 'latest' });
const path = require('path');

const s3Bucket = 'sports-event-replayer';

export async function s3Upload(Files, LocalFilePath) {

    for (let file in files) {

        const fileStream = fs.createReadStream(`${LocalFilePath}/${Files[file]}`);

        fileStream.on('error', (err) => {
            console.log(`Error when opening local file stream: ${err}`);
        });

        let uploadParams = {
            Bucket: s3Bucket,
            Key: `${file.fileName}/${files[file]}`,
            Body: fileStream
        };

        s3.upload(uploadParams, (err, data) => {
            if (err) {
                console.log(`Error when uploading file to ${s3Bucket}: ${err}`);
            }
            if (data) {
                console.log(`Upload Success: ${JSON.stringify(data.Location)}`);
            }
        });
    }
}
const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {

    const requestBody = JSON.parse(event.body);
    const survey = requestBody.survey;

    recordRide(survey).then(() => {
        callback(null, {
        statusCode: 201,
            body: survey,
            headers: {
            'Access-Control-Allow-Origin': '*', //TODO: Validate if this CORS is necessary
            },
    });
}).catch((err) => {
        console.error(err);
    errorResponse(err.message, context.awsRequestId, callback)
});
};
//TODO: Complete thus item with the survey values :)
function recordRide(survey) {
    return ddb.put({
        TableName: 'survey',
        Item: {
            email: survey.email,
            feeling: survey.feeling,
            pensiones: survey.pensiones,
        },
    }).promise();
}

function errorResponse(errorMessage, awsRequestId, callback) {
    callback(null, {
        statusCode: 500,
        body: JSON.stringify({
            Error: errorMessage,
            Reference: awsRequestId,
        }),
        headers: {
            'Access-Control-Allow-Origin': '*',//TODO: Validate if this CORS is necessary
        },
    });
}
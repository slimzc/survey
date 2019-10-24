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
            degreeSatisfactionAfpPensions: survey.according-degree-satisfaction-afp-pensions,
            degreeSatisfactionIncomeTax: survey.according-degree-satisfaction-income-tax,
            degreeSatisfactionSalaries: survey.according-degree-satisfaction-salaries,
            degreeSatisfactionBasicServices: survey.according-degree-satisfaction-basic-services,
            degreeSatisfactionEducation: survey.according-degree-satisfaction-education,
            degreeSatisfactionTransport: survey.according-degree-satisfaction-transport,
            degreeSatisfactionHealth: survey.according-degree-satisfaction-health,
            degreeSatisfactionSecurityCrime: survey.according-degree-satisfaction-security-crime,
            degreeSatisfactionOthers: survey.according-degree-satisfaction-others,
            relevantTopic: survey.relevant-topic,
            responsable_situacion_actual: survey.responsible-current-situation,
            manifestaciones: survey.social-manifestation,
            regiones: survey.regiones,
            comunas: survey.comunas,
            genero: survey.gender,
            edad: survey.age,
            evaluacion_poblacion_civil: survey.civil-population-assessment,
            evaluacion_carabineros: survey.carabineros-evaluation,
            evaluacion_ejercito: survey.army-evaluation,
            evaluacion_medios: survey.media-evaluation,
            iniciativa: survey.project-or-initiative
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
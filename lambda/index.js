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
            pensiones: survey.according-degree-satisfaction-afp-pensions,
            impuestos: survey.according-degree-satisfaction-income-tax,
            sueldos: survey.according-degree-satisfaction-salaries,
            servicios: survey.according-degree-satisfaction-basic-services,
            educacion: survey.according-degree-satisfaction-education,
            transporte: survey.according-degree-satisfaction-transport,
            salud: survey.according-degree-satisfaction-health,
            seguridad_delicuencia: survey.according-degree-satisfaction-security-crime,
            otros: survey.according-degree-satisfaction-others,
            tema_relevante: survey.relevant-topic,
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
const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {

    const requestBody = JSON.parse(event.body);
    const survey = requestBody;

    recordRide(survey).then(() => {
        callback(null, {
            statusCode: 201,
            body: survey,
            headers: {
                'Access-Control-Allow-Origin': '*',
                "Access-Control-Allow-Credentials" : true
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
            degreeSatisfactionAfpPensions: survey.according_degree_satisfaction_afp_pensions,
            degreeSatisfactionIncomeTax: survey.according_degree_satisfaction_income_tax,
            degreeSatisfactionSalaries: survey.according_degree_satisfaction_salaries,
            degreeSatisfactionBasicServices: survey.according_degree_satisfaction_basic_services,
            degreeSatisfactionEducation: survey.according_degree_satisfaction_education,
            degreeSatisfactionTransport: survey.according_degree_satisfaction_transport,
            degreeSatisfactionHealth: survey.according_degree_satisfaction_health,
            degreeSatisfactionSecurityCrime: survey.according_degree_satisfaction_security_crime,
            degreeSatisfactionOthers: survey.according_degree_satisfaction_others,
            relevantTopic: survey.relevant_topic,
            responsableSituacionActual: survey.responsible_current_situation,
            manifestaciones: survey.social_manifestation,
            regiones: survey.regiones,
            comunas: survey.comunas,
            genero: survey.gender,
            edad: survey.age,
            evaluacionPoblacionCivil: survey.civil_population_assessment,
            evaluacionCarabineros: survey.carabineros_evaluation,
            evaluacionEjercito: survey.army_evaluation,
            evaluacionMedios: survey.media_evaluation,
            iniciativa: survey.project_or_initiative
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
            'Access-Control-Allow-Origin': '*',
            "Access-Control-Allow-Credentials" : true

        },
    });
}
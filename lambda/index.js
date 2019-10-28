const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {

    const requestBody = JSON.parse(event.body);
    const survey = requestBody;

    recordRide(survey).then(() => {
        callback(null, {
        statusCode: 201,
            body: JSON.stringify(survey),
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
    console.log(survey);
    return ddb.put({
        TableName: 'survey',
        Item: {
            email: survey.email,
            feeling: (survey.feeling != '' || survey.feeling == undefined) ? survey.feeling:'N/A',
            degreeSatisfactionAfpPensions: survey.according_degree_satisfaction_afp_pensions,
            degreeSatisfactionIncomeTax: survey.according_degree_satisfaction_income_tax,
            degreeSatisfactionSalaries: survey.according_degree_satisfaction_salaries,
            degreeSatisfactionBasicServices: survey.according_degree_satisfaction_basic_services,
            degreeSatisfactionEducation: survey.according_degree_satisfaction_education,
            degreeSatisfactionTransport: survey.according_degree_satisfaction_transport,
            degreeSatisfactionHealth: survey.according_degree_satisfaction_health,
            degreeSatisfactionSecurityCrime: survey.according_degree_satisfaction_security_crime,
            degreeSatisfactionOthers: (survey.according_degree_satisfaction_others != '' || survey.according_degree_satisfaction_others == undefined) ? survey.according_degree_satisfaction_others:'N/A',
            relevantTopic: (survey.relevant_topic != '' || survey.relevant_topic == undefined) ? survey.relevant_topic:'N/A',
            responsableSituacionActual: (survey.responsible_current_situation != '' || survey.responsible_current_situation == undefined) ? survey.responsible_current_situation:'N/A',
            manifestaciones: (survey.social_manifestation != '' || survey.social_manifestation == undefined) ? survey.social_manifestation:'N/A',
            evasionLegitimateMethod: (survey.evasion_legitimate_method != '' || survey.evasion_legitimate_method == undefined) ? survey.evasion_legitimate_method:'N/A',
            violenceLegitimateMethod: (survey.violence_legitimate_method != '' || survey.violence_legitimate_method == undefined) ? survey.violence_legitimate_method:'N/A',
            regiones: survey.regiones,
            comunas: survey.comunas,
            genero: (survey.gender != '' || survey.gender == undefined) ? survey.gender:'N/A',
            edad: (survey.age != '' || survey.age == undefined) ? survey.age:'N/A',
            evaluacionPoblacionCivil: survey.civil_population_assessment,
            evaluacionCarabineros: survey.carabineros_evaluation,
            evaluacionEjercito: survey.army_evaluation,
            evaluacionMedios: survey.media_evaluation,
            iniciativa: (survey.project_or_initiative != '' || survey.project_or_initiative == undefined) ? survey.project_or_initiative:'N/A',
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
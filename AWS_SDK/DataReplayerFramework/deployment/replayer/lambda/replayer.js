const fetch = require('node-fetch');
const HttpsProxyAgent = require('https-proxy-agent');

const createEnvEndpoint = (env, state) => {
    if (state.toLowerCase() === 'Whosville') {
        return `http://aws.env.to.run.against.${env.toLowerCase()}.argonautgames.plc`
    }
    
    return `http://${state.toLowerCase()}-fe.aws-us-east-1.${env.toLowerCase()}.argonautgames.plc`;
}

const eventBrokerGetConfig = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
};

export async function postSportsEventMessage(payload) {
    const {environment, state, json_message} = payload;
    const parsedMessage = JSON.parse(json_message);
    const deliveryUrl = `${createEnvEndpoint(environment, state)}/feed-api/push-message`;
    const postConfig = {
        method: 'POST',
        headers: {
            'Tracking-Id': parsedMessage.eventId,
            correlationId: parsedMessage.eventId,
            'Content-Type': 'application/json',
        },
    };

    const response = await fetch(deliveryUrl, {
        ...postConfig,
        body: json_message
    });
    
    pushedResponseConfig = { deliveryUrl, payload, response, parsedMessage };

    return (response.status === 200) ? {
        ...pushedResponseConfig,
        "Push Status": "Success"
    } : {
        ...pushedResponseConfig,
        "Push Status": "Failure"
    };
}
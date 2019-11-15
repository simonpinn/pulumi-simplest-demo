import * as pulumi from "@pulumi/pulumi";
import * as azure from "@pulumi/azure";
import * as moment from 'moment';

const resourceGroup = new azure.core.ResourceGroup("demo-rg");

async function handler(context: azure.appservice.Context<azure.appservice.HttpResponse>, request: azure.appservice.HttpRequest) {
    return {
        status: 200,
        headers: {
            "content-type": "text/plain",
        },
        body: `Hello from Azure Function!! ${moment.now()}`,
    };
}

const fn = new azure.appservice.HttpEventSubscription("demo-func", {
    resourceGroup,
    callback: handler,
});

export const functionAddress = fn.url;
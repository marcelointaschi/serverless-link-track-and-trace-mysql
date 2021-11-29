# Serverless - Tracer & Tracker functions

This project has been generated using the `aws-nodejs-typescript` template from the [Serverless framework](https://www.serverless.com/).

For detailed instructions, please refer to the [documentation](https://www.serverless.com/framework/docs/providers/aws/).


## Environemnt INSTALL
- Install Serverless using the command:
```
 npm install serverless -g
```
- Configure the AWS credentials in case of AWS provider with the command bellow:
```
serverless config credentials  -o  --provider aws --key <KEYHERE> --secret <SECRETHERE>
```
## Installation/deployment instructions

Depending on your preferred package manager, follow the instructions below to deploy your project.

> **Requirements**: NodeJS `lts/fermium (v.14.15.0)`. If you're using [nvm](https://github.com/nvm-sh/nvm), run `nvm use` to ensure you're using the same Node version in local and in your lambda's runtime.

### Using NPM

- Run `npm i` to install the project dependencies
- Run `npx sls deploy` to deploy this stack to AWS

### Using Yarn

- Run `yarn` to install the project dependencies
- Run `yarn sls deploy` to deploy this stack to AWS

## Test both services

This template contains two lambda functions triggered by an HTTP request made on the provisioned API Gateway REST API.

### Trace

- sending a `POST` request to `/trace` with a payload containing some string properties of `src/functions/trace/schema.ts` will result in API Gateway returning a `200` HTTP status code.

### Tracker

- sending a `GET` request to `/tracker` with the params of `src/functions/tracker/schema.ts` will result in API Gateway returning a `301` HTTP status code in order to redirect to the url from the param.


requesting any other path than both above will result in API Gateway returning a `403` HTTP error code

### Locally

In order to test the hello function locally, run the following command:

- `npx sls invoke local -f trace --path src/functions/trace/mock.json` if you're testing the trace function or `npm run tracetest`
- `npx sls invoke local -f tracker --path src/functions/tracker/mock.json` if you're testing the tracker function or `npm run trackertest`

Check the [sls invoke local command documentation](https://www.serverless.com/framework/docs/providers/aws/cli-reference/invoke-local/) for more information.

### Remotely

#### Trace
Copy and replace your `url` - found in Serverless `deploy` command output - and all parameters in the following `curl` command in your terminal or in Postman to test your newly deployed application.

```
curl --location --request POST 'https://myApiEndpoint/dev/trace' \
--header 'Content-Type: application/json' \
--data-raw '{
    "customer_id": "11111",
    "destination": "LP",
    "origin_type": "phone",
    "origin_value": "5511998989898",
    "action_type": "CLICK",
}'
```

#### Tracker

Copy and past the url below in your browser:

     https://grt08tfpmb.execute-api.us-east-2.amazonaws.com/dev/tracker?url=http://www.google.com.br&origin_type=LP&origin_value=novalue&id=1111111

### Project structure

The project code base is mainly located within the `src` folder. This folder is divided in:

- `functions` - containing code base and configuration for your lambda functions
- `libs` - containing shared code base between your lambdas

```
.
├── src
│   ├── functions               # Lambda configuration and source code folder
│   │   ├── trace
│   │   │   ├── handler.ts      # `trace` lambda source code
│   │   │   ├── index.ts        # `trace` lambda Serverless configuration
│   │   │   ├── mock.json       # `trace` lambda input parameter, if any, for local invocation
│   │   │   └── schema.ts       # `trace` lambda input event JSON-Schema
│   │   │
│   │   ├── tracker
│   │   │   ├── handler.ts      # `tracker` lambda source code
│   │   │   ├── index.ts        # `tracker` lambda Serverless configuration
│   │   │   ├── mock.json       # `tracker` lambda input parameter, if any, for local invocation
│   │   │   └── schema.ts       # `tracker` lambda input event JSON-Schema
│   │   │
│   │   └── index.ts            # Import/export of all lambda configurations
│   │
│   └── libs                    # Lambda shared code
│       └── apiGateway.ts       # API Gateway specific helpers
│       └── handlerResolver.ts  # Sharable library for resolving lambda handlers
│       └── lambda.ts           # Lambda middleware
│
├── package.json
├── serverless.ts               # Serverless service file
├── tsconfig.json               # Typescript compiler configuration
├── tsconfig.paths.json         # Typescript paths
└── webpack.config.js           # Webpack configuration
```

### 3rd party libraries

- [json-schema-to-ts](https://github.com/ThomasAribart/json-schema-to-ts) - uses JSON-Schema definitions used by API Gateway for HTTP request validation to statically generate TypeScript types in your lambda's handler code base
- [middy](https://github.com/middyjs/middy) - middleware engine for Node.Js lambda. This template uses [http-json-body-parser](https://github.com/middyjs/middy/tree/master/packages/http-json-body-parser) to convert API Gateway `event.body` property, originally passed as a stringified JSON, to its corresponding parsed object
- [@serverless/typescript](https://github.com/serverless/typescript) - provides up-to-date TypeScript definitions for your `serverless.ts` service file
- [serverless-mysql](https://github.com/jeremydaly/serverless-mysql) - mysql management
- [@types/mysql](https://github.com/DefinitelyTyped/DefinitelyTyped) - This package contains the mysql driver for typescript


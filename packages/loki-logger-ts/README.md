# loki-logger-ts

Is a Loki Logger written in Typescript. It allows for the creation of a Grafana Loki Logging Client and easy parsing of messages and labels.

More information about Loki can be found here.
<https://grafana.com/loki>

## Installation

```bash
# NPM
npm i loki-logger-ts
# or
# YARN
yarn add loki-logger-ts
# or
#PNPM
pnpm i loki-logger-ts
```

## Usage

### No Authentication

``` ts
import { LokiClient, LogError, LokiLabels } from "loki-logger-ts";


const HostData = {
  url: "http://localhost:3100/api/prom/push"
};

const labels: LokiLabels = { source: "TestSource", job: "TestJob", host: "TestHost" };

async function main() {
  const client = new LokiClient(HostData.url);

  const msg = 'Test Message: No Authentication.';
  await LogError(client, msg, labels);

  client.getMetrics();
}

main();

```

### Basic Authentication

```ts
import { LokiClient, LogError, LokiLabels } from "loki-logger-ts";

const HostData = {
  url: "http://localhost:3100/api/prom/push",
  username: "Test",
  password: "Test"
};


const labels: LokiLabels = { source: "TestSource", job: "TestJob", host: "TestHost" };

async function main() {
  const client = new LokiClient(HostData.url, {username: HostData.username, password: HostData.password});

  const msg = 'Test Message: Basic Authentication.';
  await LogError(client, msg, labels);

  client.getMetrics();
}

main();
```

### Secret Authentication

```ts
import { LokiClient, LogError, LokiLabels } from "loki-logger-ts";

const HostData = {
  url: "http://localhost:3100/api/prom/push",
  secret: "Test"
};

const labels: LokiLabels = { source: "TestSource", job: "TestJob", host: "TestHost" };

async function main() {
  const client = new LokiClient(HostData.url, {secret: HostData.secret});

  const msg = 'Test Message: Secret Authentication';
  await LogError(client, msg, labels);


  client.getMetrics();
}

main();
```

### Message Types

Four types of formatted messages can be sent, these are:

- Error
  
```ts
import { LogError } from "loki-logger-ts";
```

- Warning

```ts
import { LogWarning } from "loki-logger-ts";
```

- Information

```ts
import { LogInfo } from "loki-logger-ts";
```

- Debug

```ts
import { LogDebug } from "loki-logger-ts";
```

Unformatted messages can also be sent by using:

```ts
import { Log } from "loki-logger-ts";
```

### Ticker

When large amount of messages will be sent the ticker should be enabled so the client will update timestamps once a second. This prevents a new Date object being created for every message.

To enable this the following is used:

```ts
import { LokiClient } from "loki-logger-ts";

const HostData = {
  url: "http://localhost:3100/api/prom/push",
  username: "Test", //Only needed if basic auth is used
  password: "Test" //Only needed if basic auth is used
  secret: "Test" //Only need if secret auth is need. Eg. Grafana Cloud
};

const client = new LokiClient(HostData.url, {}, true);

//Basic auth example
const clientBasicAuth = new LokiClient(HostData.url, {username: HostData.username, password: HostData.password}, true);

//Secret auth example
const clientSecretAuth = new LokiClient(HostData.url, {secret: HostData.secret}, true);

```

### Note

For  more information and functions look at the comments in the source code.

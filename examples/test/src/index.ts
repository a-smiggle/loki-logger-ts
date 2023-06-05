import { LokiClient, LogError, LokiLabels } from "loki-logger-ts";

/**
 * HostData
 * Example objects holding host variables to be passed into LokiClient.
 */
const HostData = {
  url: "http://localhost:3100/api/prom/push",
  //username: "Test", //Only needed if basic auth is used
  //password: "Test" //Only needed if basic auth is used
  //secret: "Test" //Only need if secret auth is need. Eg. Grafana Cloud
};

/**
 * labels
 * Labels can be unique and do not have to follow this example.
 * LokiLabels are used so objects can be any length.
 */
const labels: LokiLabels = { source: "TestSource", job: "TestJob", host: "TestHost" };

async function main() {
  const client = new LokiClient(HostData.url, {}, true);

  //Basic auth example
  //const client = new LokiClient(HostData.url, {username: HostData.username, password: HostData.password});

  //Secret auth example
  //const client = new LokiClient(HostData.url, {secret: HostData.secret});

  console.time("1000 Messages in");

  for (let i = 0; i < 1000; ++i) {
    const msg = `Test Message ${i}`;
    await LogError(client, msg, labels);
  }

  client.getMetrics();

  console.timeEnd("1000 Messages in");
  client.stopTicker();
}

main();

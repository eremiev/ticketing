# Ticketing

Service-Oriented Architecture (SOA) project with Typescript, Next.js and NATS Streaming

## Run the project

Set kubernetes ENV for `JWT_KEY`

```
kubectl create secret generic jwt-secret --from-literal JWT_KEY=secret
```

You have to install [Skaffold](https://skaffold.dev/) in order to run the project
Then run the command below.

```
skaffold dev
```
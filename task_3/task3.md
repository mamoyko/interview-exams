# Bi-Directional Data Synchronization System

## Solution Overview

We will build a bi-directional data synchronization system between HubSpot and Stripe using event-driven architecture. This will require:

1. **Webhook listeners** (to receive events)
2. **Message queue** (BullMQ/RabbitMQ)
3. **Processing workers**
4. **Centralized state store**
5. **Monitoring**

## Architecture Diagram

```
                     [ Stripe Webhooks ]           [ HubSpot Webhooks ]
                             |                              |
                             v                              v
                   ┌──────────────────┐           ┌──────────────────┐
                   │ Stripe Listener  │           │ HubSpot Listener │
                   └──────────────────┘           └──────────────────┘
                             |                              |
                             v                              v
                   ┌────────────────────┐       ┌────────────────────┐
                   │ Event Queue (SQS,  │<----->│ Event Queue (SQS,  │
                   │ RabbitMQ)          │       │         RabbitMQ)   │
                   └────────────────────┘       └────────────────────┘
                             |                              |
                             v                              v
          ┌────────────────────────┐       ┌────────────────────────┐
          │ Stripe Event Processor │       │ HubSpot Event Processor│
          └────────────────────────┘       └────────────────────────┘
                             |                              |
                             v                              v
         ┌────────────────────────────────────────────────────────────┐
         │       Central State Store (DynamoDB, Firestore, etc.)      │
         │   (StripeID <-> HubSpotID mappings + sync statuses)        │
         └────────────────────────────────────────────────────────────┘
                             |
                             v
            ┌────────────────────────────────────────┐
            │ Monitoring, Logging, Alerting          │
            │ (CloudWatch, Sentry, etc.)             │
            └────────────────────────────────────────┘
```

## Key Components

### a. Webhook Listeners

These will be HTTP endpoints that listen for events from Stripe and HubSpot. They will parse the incoming data and push it to the event queue.

### b. Message Queue

We will use a message queue like BullMQ or RabbitMQ to decouple the webhook listeners from the processing logic. This allows for better scalability and reliability.

### c. Event Processors

-   **i. Mapping Check**
-   **ii. Validation**
-   **iii. Rate Limiting**
-   **iv. Retry & DLQ**: On failure, retry with exponential backoff
-   **v. Central State Store**

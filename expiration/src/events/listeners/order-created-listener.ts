import {Listener, OrderCreatedEvent, Subjects} from '@eremiev/common';
import {Message} from 'node-nats-streaming';
import {queueGroupName} from './queue-gorup-name';
import {expirationQueue} from '../../queues/expiration-queue';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
    queueGroupName = queueGroupName;

    async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
        const delay = new Date(data.expiresAt).getTime() - new Date().getTime();
        console.log('Waiting this many milliseconds to proceess the job:', delay);

        await expirationQueue.add(
            {
                orderId: data.id
            },
            {
                delay
            });
        msg.ack();
    }
}
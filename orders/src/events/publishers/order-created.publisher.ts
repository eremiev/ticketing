import {OrderCreatedEvent, Publisher, Subjects} from '@eremiev/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
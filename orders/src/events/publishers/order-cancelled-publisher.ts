import {OrderCancelledEvent, Publisher, Subjects} from '@eremiev/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
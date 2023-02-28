import {PaymentCreatedEvent, Publisher, Subjects} from '@eremiev/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
import {Publisher, Subjects, TicketCreatedEvent} from '@eremiev/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
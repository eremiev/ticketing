import {ExpirationCompleteEvent, Publisher, Subjects} from '@eremiev/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
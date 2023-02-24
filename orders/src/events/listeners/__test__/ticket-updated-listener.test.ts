import mongoose from 'mongoose';
import {Message} from 'node-nats-streaming';
import {TicketUpdatedEvent} from '@eremiev/common';
import {TicketUpdatedListener} from '../ticket-updated-listener';
import {natsWrapper} from '../../../nats-wrapper';
import {Ticket} from '../../../models/ticket';

const setup = async () => {
    // create a listener
    const listener = new TicketUpdatedListener(natsWrapper.client);

    // create and save a ticket
    const ticket = Ticket.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        title: 'concert',
        price: 20
    });
    await ticket.save();

    // create a fake data event
    const data: TicketUpdatedEvent['data'] = {
        id: ticket.id,
        version: ticket.version + 1,
        title: 'concert updated',
        price: 200,
        userId: new mongoose.Types.ObjectId().toString()
    };

    // create a fake message object
    // @ts-ignore
    const msg: Message = {
        ack: jest.fn()
    };

    return {listener, ticket, data, msg};
};

it('finds, updates, saves a ticket', async () => {
    const {listener, ticket, data, msg} = await setup();

    // call the onMessage function with the date object + message object
    await listener.onMessage(data, msg);

    // write assertions to make sure a ticket was updated
    const updatedTicket = await Ticket.findById(ticket.id);

    expect(updatedTicket!.title).toEqual(data.title);
    expect(updatedTicket!.price).toEqual(data.price);
    expect(updatedTicket!.version).toEqual(data.version);
});

it('acks the message', async () => {
    const {listener, data, msg} = await setup();

    // call the onMessage function with the date object + message object
    await listener.onMessage(data, msg);

    // write assertions to make sure ack function is called
    expect(msg.ack).toHaveBeenCalled();
});

it('does not call ack if the event has a skipped version number', async () => {
    const {listener, data, msg} = await setup();
    data.version = 10;
    // call the onMessage function with the date object + message object
    try {
        await listener.onMessage(data, msg);
    } catch (err) {
    }

    // write assertions to make sure ack function is called
    expect(msg.ack).not.toHaveBeenCalled();
});
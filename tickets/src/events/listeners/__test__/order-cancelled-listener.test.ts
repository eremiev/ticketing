import mongoose from 'mongoose';
import {Message} from 'node-nats-streaming';
import {OrderCancelledListener} from '../order-cancelled-listener';
import {natsWrapper} from '../../../nats-wrapper';
import {Ticket} from '../../../models/ticket';
import {OrderCancelledEvent, OrderStatus} from '@eremiev/common';

const setup = async () => {
    // Create an instance of the listener
    const listener = new OrderCancelledListener(natsWrapper.client);
    // Create and save a ticket
    const orderId = new mongoose.Types.ObjectId().toHexString();
    const ticket = Ticket.build({
        title: 'concert',
        price: 20,
        userId: '123'
    });
    ticket.set({orderId});
    await ticket.save();

    // create fake data event
    const data: OrderCancelledEvent['data'] = {
        id: orderId,
        version: 0,
        ticket: {
            id: ticket.id
        }
    };

    // fake message object
    // @ts-ignore
    const msg: Message = {
        ack: jest.fn()
    };

    return {listener, ticket, data, orderId, msg};
};

it('update the ticket, publishes an event, and acks the message', async () => {
    const {listener, ticket, data, orderId, msg} = await setup();
    await listener.onMessage(data, msg);
    const updatedTicket = await Ticket.findById(ticket.id);
    expect(updatedTicket!.orderId).not.toBeDefined();
    expect(msg.ack).toHaveBeenCalled();
    expect(natsWrapper.client.publish).toHaveBeenCalled();
});
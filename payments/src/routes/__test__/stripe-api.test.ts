import request from 'supertest';
import mongoose from 'mongoose';
import {app} from '../../app';
import {Order} from '../../models/order';
import {OrderStatus} from '@eremiev/common';
import {stripe} from '../../stripe';
import {Payment} from '../../models/payments';

/**
 * Use this API test only if you rename src/__mock__/stripe.ts to stripe.ts.old
 * and set STRIPE_KEY in test/setup.ts
 */
it('returns a 201 with valid inputs and real API call', async () => {
    // const userId = new mongoose.Types.ObjectId().toHexString();
    // const price = Math.floor(Math.random() * 100000);
    // const order = Order.build({
    //     id: new mongoose.Types.ObjectId().toHexString(),
    //     userId,
    //     version: 0,
    //     price,
    //     status: OrderStatus.Created
    // });
    // await order.save();
    //
    // await request(app)
    //     .post('/api/payments')
    //     .set('Cookie', global.signin(userId))
    //     .send({
    //         token: 'tok_visa',
    //         orderId: order.id
    //     })
    //     .expect(201);
    //
    // const stripeCharges = await stripe.charges.list({limit: 10});
    // const stripeCharge = stripeCharges.data.find(charge => {
    //     return charge.amount === price * 100;
    // });
    // expect(stripeCharge).toBeDefined();
    //
    // const payment = await Payment.findOne({
    //     orderId: order.id,
    //     stripeId: stripeCharge!.id
    // })
    // expect(payment).not.toBeNull();
});
import mongoose from 'mongoose';
import BaseUserSchema from './baseUserModel.js';

const options = { discriminatorKey: 'kind' };

const eventSchema = new mongoose.Schema({ time: Date }, options);
const Event = mongoose.model('Event', eventSchema);

// ClickedLinkEvent is a special type of Event that has
// a URL.
const ClickedLinkEvent = Event.discriminator('ClickedLink',
    new mongoose.Schema({ url: String }, options));

// When you create a generic event, it can't have a URL field...
const genericEvent = new Event({ time: Date.now(), url: 'google.com' });
// assert.ok(!genericEvent.url);

// But a ClickedLinkEvent can
const clickedEvent = new ClickedLinkEvent({ time: Date.now(), url: 'google.com' });
// assert.ok(clickedEvent.url);


const event1 = new Event({ time: Date.now() });
const event2 = new ClickedLinkEvent({ time: Date.now(), url: 'google.com' });
const event3 = new SignedUpEvent({ time: Date.now(), user: 'testuser' });


await Promise.all([event1.save(), event2.save(), event3.save()]);
const count = await Event.countDocuments();
assert.equal(count, 3);
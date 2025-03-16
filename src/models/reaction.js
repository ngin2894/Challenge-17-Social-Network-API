import { Schema, Types } from 'mongoose';
import { formatTimestamp } from '../utils/timeStamp.js';

export const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: 'Please enter a reaction!',
        maxLength: 280
    },
    username: {
        type: String,
        required: 'Please enter your username!'
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => formatTimestamp(timestamp)
    }
},
{
    toJSON: {
        getters: true
    },
    id: false
});

export default reactionSchema;
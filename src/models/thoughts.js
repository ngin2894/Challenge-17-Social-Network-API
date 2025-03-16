import { Schema, model } from 'mongoose';
import { formatTimestamp } from '../utils/timeStamp.js';
import { reactionSchema } from './reaction.js';

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: 'Please enter your thoughts!',
        minLength: 1,
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
    },
    reactions: [reactionSchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);
export default Thought;
import { Schema, model } from 'mongoose';
import validator from 'validator';

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: 'Please enter a username!',
        trim: true
    },
    email: {
        type: String,
        required: 'Please enter an email address!',
        unique: true,
        validate: [validator.isEmail, 'Please enter a valid email address.'],
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    }, {
        versionKey: false,
        toJSON: {
            virtuals: true,
            getters: true,
    },
});

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('User', userSchema);
export default User;
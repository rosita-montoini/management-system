import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const task = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isDone: {
        type: Boolean,
        default: false
    },
    priority: {
        type: Number,
        required: true
    },
    dueDate: {
        type: Date,
        required: true,
    },
    ownerId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

export default model('Task', task);
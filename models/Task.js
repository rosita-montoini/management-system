const {Schema, model} = require('mongoose');

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

module.exports = model('Task', task);
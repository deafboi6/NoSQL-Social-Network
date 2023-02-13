const { Schema, model } = require("mongoose");

const reactionSchema = new Schema({
    //TODO: set default value to new ObjectId
    reactionId: {
        type: Schema.Types.ObjectId,
        // default: 
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);

thoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
});

reactionSchema.virtual("formatDate").get(function () {
    if (Date) {
        return Date.toISOString().split("T")[0]
    };
});

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
const { Schema, model } = require("mongoose");
const thoughts = require("./Thought");

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: () => Promise.resolve(false),
                message: 'Email validation failed'
            }
        },
        thoughts: [thoughts],
        friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const User = model("User", userSchema);

module.exports = User;
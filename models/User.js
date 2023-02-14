const { Schema, model } = require("mongoose");
const thoughts = require("./Thought");

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

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
            validate: [validateEmail, "please fill a valid email"]
        },
        thoughts: [{ type: Schema.Types.ObjectId, ref: "Thought" }],
        friends: [{ type: Schema.Types.ObjectId, ref: "User" }]
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);

userSchema.virtual("friendCount").get(function () {
    return this.friends.length;
});

const User = model("User", userSchema);

module.exports = User;
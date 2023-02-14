// const Thought = require("../models/Thought");
// const User = require("../models/User");
const { Thought, User } = require("../models");

module.exports = {
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .select("-__v")
        .then((thought) => {
            if (!thought) {
                res.status(404).json({ message: "No thought found!" });
            } else {
                res.json(thought);
            }
        });
    },
    createThought(req, res) {
        Thought.create(req.body)
            .then((thoughtData) => {
                User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $push: { thoughts: thoughtData._id }}
                    )
                    .then((data) => {
                        if (!data) {
                            res.status(404).json({ message: "no user found" });
                        } else {
                            res.status(200).json({ message: "Success" });
                        }
                    })
            })
            .catch((err) => res.status(500).json(err));
    },
    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
            .then((thought) => {
                if (!thought) {
                    res.status(404).json({ message: "No thought found" });
                } else {
                    res.status(200).json({ message: "Thought deleted" });
                }
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            })
    },
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { reactions: req.body }}
            )
            .then((data) => {
                if (!data) {
                    res.status(404).json({ message: "no thought found" });
                } else {
                    res.status(200).json({ message: "Success" });
                }
            })
            .catch((err) => res.status(500).json(err));
    },
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: req.params.reactionId }}
            )
            .then((data) => {
                if (!data) {
                    res.status(404).json({ message: "no user found" });
                } else {
                    res.status(200).json({ message: "Success" });
                }
            })
            .catch((err) => res.status(500).json(err));
    }
};
const { User, Thought } = require("../models");
// const User = require("../models/User");
// const Thought = require("../models/Thought");

module.exports = {
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
        .then((user) => {
            if (!user) {
                res.status(404).json({ message: "no user found with this id" });
            } else {
                res.json(user);
            }
        });
    },
    createUser(req, res) {
        User.create(req.body)
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => res.status(500).json(err));
    },
    deleteUser(req, res) {
        User.findOneAndRemove({ _id: req.params.userId })
            .then((user) => {
                if (!user) {
                    res.status(404).json({ message: "no user found with this id" });
                } else {
                    res.status(200).json({ message: "User deleted" });
                };
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $push: { friends: req.params.friendId }}
        )
            .then((data) => {
                if (!data) {
                    res.status(404).json({ message: "no user found" });
                } else {
                    res.status(200).json({ message: "Success" });
                }
            })
            .catch((err) => res.status(500).json(err));
    },
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId }}
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
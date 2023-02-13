const { User, Thought } = require("../models");

module.exports = {
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
        .select("-__v")
        .then((user) => {
            if (!user) {
                res.status(404).json({ message: "no user found with this id" });
            } else {
                res.json(user);
            }
        })
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
                    Thought.findOneAndUpdate(
                        { User: req.params.userId },
                        { $pull: { User: req.params.userId } },
                        { new: true }
                    );
                }
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    }
};
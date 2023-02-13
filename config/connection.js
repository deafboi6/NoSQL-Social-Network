const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/hw18", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = connection;
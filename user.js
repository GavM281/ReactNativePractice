const mongoose = require('mongoose')
const Schema = new mongoose.Schema({
    name: String,
})

mongoose.model("user", Schema);

const mongoose = require('mongoose');

const authorSchema = mongoose.Schema({
    id : Number,
    name :String,
    books : [String],
});


const authorModel = mongoose.model("authors",authorSchema);

module.exports = authorModel;

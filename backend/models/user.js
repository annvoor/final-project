const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
const userSchema = new Schema({
    name: {
        type: String,
        // required: true,
    },
    playlists: {

    },
    savedSongs: {

    }
});


module.exports = mongoose.model("User", userSchema);
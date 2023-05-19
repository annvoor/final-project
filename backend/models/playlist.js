const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const songSchema = new Schema({
    // Simple declaration of datatype that will be used:
    name: {
        type: String,
        // lmao required is broken need to fix that
        // required: true,
        unique: true
    },
    artist: String,

    album: String, 

    // TODO: add an image for album cover?
    // albumCover: {

    // },
    genre: {
        type: String,
        enum: ["K-Pop", "Classical", "Theater", "Pop"]
    },
    mood: {
        type: String,
        enum: ["Happy", "Sad", "Angry", "Chill"]
    },

    // TODO: figure out how to put audio files
    // audio: {

    // }
});

// create a schema
const playlistSchema = new Schema({
    playlistname: {
        type: String,
        // required: true,
        unique: true
    },
    songs: [songSchema]
});

module.exports = mongoose.model("Playlist", playlistSchema);
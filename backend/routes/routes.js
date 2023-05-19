const express = require('express')
const router = express.Router()
const SongSchema = require('../models/song.js')
const PlaylistSchema = require('../models/playlist.js')
const { rawListeners } = require('../models/song.js')

//Songs


// find songs (use query)
// tested and works
router.get('/getsong', (req, res) => {
    SongSchema.find(req.query)
    //'then' happens if find is succesful
    .then(songs => {
      console.log("found songs!")
      console.log(songs)
      res.json(songs)
    })
    //if theres an error, 'catch' happens instead
    .catch(err => {
      console.error(err)
      res.send(err)
    })
})

// add new song
// tested and works
router.post('/addsong', (req, res) => {
  SongSchema.create(req.body)
  .then(song => {
    console.log("new thing")
    console.log(song)
    res.send(song)
  })
  .catch(err => {
    console.error(err)
    res.send(err)
  })
})

// change song details
// tested and works
router.put('/changesong', (req, res) => {
  SongSchema.findOneAndUpdate(req.query, req.body)
  .then(songs => {
    console.log("found songs!")
    console.log(songs)
    res.json(songs)
  })
  .catch(err => {
    console.error(err)
    res.send(err)
  })
})

// delete a song
// tested and works
router.delete('/deletesong', (req, res) => {
  SongSchema.findOneAndDelete(req.query)
  .then(songs => {
    console.log("found songs!")
    console.log(songs)
    res.json(songs)
  })
  .catch(err => {
    console.error(err)
    res.send(err)
  })
})



// Playlists


// find playlist by name
// tested and works
router.get('/getplaylist', (req, res) => {
  PlaylistSchema.find(req.query)
  .then(playlist => {
    console.log("found playlist!")
    console.log(playlist)
    res.json(playlist)
  })
  .catch(err => {
    console.error(err)
    res.send(err)
  })
})

// create new playlist
// tested and works
router.post('/addplaylist', (req, res) => {
PlaylistSchema.create(req.body)
.then(song => {
  console.log("new thing")
  console.log(song)
  res.send(song)
})
.catch(err => {
  console.error(err)
  res.send(err)
})
})

// add song to playlist
router.put('/addtoplaylist/:name', (req, res) => {
  // find the song
  console.log(req.query)
  SongSchema.findOne(req.query)
  .then(song => {
    // with song found, if the song actually exists
    if (song != null && song != undefined){
      // find the playlist
      PlaylistSchema.findOne({playlistname: req.params.name})
      .then(playlist => {
        // log song and playlist
        // add the song to the songs array on the playlist
        // save to mongo db
        console.log(song)
        console.log(playlist)
        playlist.songs.push(song)
        playlist.save()
        // console log everything and send the result
        .then(playlistsong => {
          console.log("added thing")
          console.log(playlistsong)
          res.send(playlistsong)
        })
      })
    }
    // if song doesn't exist (null or undefined) then return error 404
    else {
      res.status(404).send("no song :(");
    }
  })
  .catch(err => {
    console.error(err)
    res.send(err)
  })
  })

// delete a playlist
router.delete('/deleteplaylist', (req, res) => {
  PlaylistSchema.findOneAndDelete(req.query)
  .then(songs => {
    console.log("deleted playlist!")
    console.log(songs)
    res.json(songs)
  })
  .catch(err => {
    console.error(err)
    res.send(err)
  })
})



///////////////////////////////////////////////////////////////////////////////////





//Read/get by id
// router.get('/:id', (req, res) => {
//     NuevanSchema.findById(req.params.id)
//     .then(nuevan => {
//       console.log("succesfully got one!")
//       console.log(nuevan)
//       res.json(nuevan)
//     })
//     .catch(err => {
//       console.error(err)
//       res.send(err)
//     })
// })


// //we will be using the '/add' to do a POST request
// router.post('/add', (req, res) => {
//     NuevanSchema.create(req.body)
//     .then(nuevan => {
//       console.log("added thing")
//       console.log(nuevan)
//       res.send(nuevan)
//     })
//     .catch(err => {
//       console.error(err)
//       res.send(err)
//     })
//     // TODO:
//     // Create:
//     // Create a Model using our NuevanSchema Model
//     // https://mongoosejs.com/docs/api/model.html#model_Model.create

//     // be sure to add a .then() and .catch() after
// })

// //TODO: change '/' below to be by id
// router.put('/:id', (req, res) => {
//     NuevanSchema.findByIdAndUpdate(req.params.id, req.body)
//     .then(nuevan => {
//       console.log("changed thing")
//       console.log(nuevan)
//       res.send(nuevan)
//     })
//     .catch(err => {
//       console.error(err)
//       res.send(err)
//     })

//     // TODO:
//     // Update:
//     // Update a Model using our NuevanSchema Model
//     // https://mongoosejs.com/docs/api/model.html
//     // which of the methods in the link above ^ could be useful?

//     // be sure to add a .then() and .catch() after
// })

// //TODO: change '/' below to be by id
// router.delete('/:id', (req, res) => {
//   NuevanSchema.findByIdAndDelete(req.params.id)
//   .then(nuevan => {
//     console.log("deleted the thing")
//     res.send(nuevan)
//   })
//   .catch(err => {
//     console.error(err)
//     res.send(err)
//   })
//     // TODO:
//     // Delete:
//     // Delete a Model using our NuevanSchema Model
//     // https://mongoosejs.com/docs/api/model.html
//     // which of the methods in the link above ^ could be useful?

//     // be sure to add a .then() and .catch() after
// })

module.exports = router

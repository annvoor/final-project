import React from 'react'
import { useState } from 'react'
import './App.css'

// display search bar at top, list all songs, and then bar at the bottom to switch between this an playlists?
// place to add/change/delete songs/playlists on bottom bar
export default class App extends React.Component {
  render() {
    return(
      <div className="elements">
        {/* <Songs id="songs"/> */}
        <Add />
        <Search />
        <Delete />
      </div>
    );
  }
}

function Search() {
  const [inputValue, updateInputValue] = useState("Search for a Song")
  const [songName, updateSongName] = useState(null)
  const [artist, updateArtist] = useState(null)


  function inputUpdate(evt) {
    updateInputValue(evt.target.value)
    getSongData(inputValue).then(res => {
      console.log(res)
      console.log(res[0].name)
      updateSongName(res[0].name)
      console.log(res[0].artist)
      updateArtist(res[0].artist)
    })
  }

  return(
    <div className="searchStuff">
      <input name="songSearch" value={inputValue} onChange={inputUpdate} id="searchSongs"/>
      <div id="song-results">
        <div>{songName}</div>
        <div>{artist}</div>
      </div>
    </div>
  )
}

function Delete() {
  const [inputValue, updateInputValue] = useState("Delete a Song")
  const [songDelete, updateSongDelete] = useState(null)

  function change(evt) {
    updateInputValue(evt.target.value)
  }

  function inputUpdate(evt) {
    updateInputValue(evt.target.value)
    deleteSong(inputValue).then(res => {
      console.log(res)
      updateSongDelete("Song Deleted!")
    })
  }

  return(
    <form id="addSongs">
      <input name="songAdd" value={inputValue} onChange={change} id="song-add-input"/>
      <button onClick={inputUpdate} id="song-add-button">Submit</button>
      <div>{songDelete}</div>
    </form>
  )
}

function Add() {
  const [inputValue, updateInputValue] = useState("Add a Song")

  function inputUpdate(evt) {
    updateInputValue(evt.target.value)
    addSong(inputValue).then(res => {
      console.log(res)
    })
  }

  function change(evt) {
    updateInputValue(evt.target.value)
    console.log(inputValue)
  }

  // function onSubmit() {
  //   addSong(inputValue).then(res => {
  //     console.log(res)
  //     console.log(inputValue)
  //   })
  // }

  return(
    <form id="addSongs">
      <input name="songAdd" value={inputValue} onChange={change} id="song-add-input"/>
      <button onClick={inputUpdate} id="song-add-button">Submit</button>
    </form>
  )
}

// function Add() {
//   const [name, updateName] = useState("Song Name")
//   const [album, updateAlbum] = useState("Album")
//   const [artist, updateArtist] = useState("Artist")
//   const [genre, updateGenre] = useState("Genre")
//   const [mood, updateMood] = useState("Mood")

// function onSubmit() {
//   addSong(name, album, artist, genre, mood).then(res => {
//     console.log(res)
//     console.log(inputValue)
//   })
// }


//   return(
//     <div>
//         <p>Name</p>
//         <input value={name} onChange={evt => updateName(evt.target.value)} />
//         <p>Artist</p>
//         <input value={artist} onChange={evt => updateArtist(evt.target.value)} />
//         <p>Album</p>
//         <input value={album} onChange={evt => updateAlbum(evt.target.value)} />
//         <p>Genre</p>
//         <input value={genre} onChange={evt => updateGenre(evt.target.value)} />
//         <p>Mood</p>
//         <input value={mood} onChange={evt => updateMood(evt.target.value)} />

//         <button onClick={() => onSubmit()}>Submit</button>
//     </div>
//       )
// }

// figure out how to use query/body/params and all that
async function getSongData(request) {
    const data = await fetch("http://localhost:3000/getsong?name="+String(request))
    return (data.json())
}

async function addSong(formData) {
  // const [res, updateRes] = useState(null)
  // try {
    const response = await fetch("http://localhost:3000/addsong", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: formData,
    });
    const result = await response.json();
    // updateRes(result)
  //   console.log("Success:", result);
  // } catch (error) {
  //   console.error("Error:", error);
  // }
  return(result)
}


// async function addSong(name, album, artist, genre, mood) {
//   try {
//     const response = await fetch("http://localhost:3000/addsong", {
//       method: "POST",
//       body: JSON.stringify({"name": {name}, "album": {album}, "artist": {artist}, "genre": {genre}, "mood": {mood}}),
//     });
//     const result = await response.json();
//     console.log("Success:", result);
//   } catch (error) {
//     console.error("Error:", error);
//   }
//   return(response.json())
// }

async function deleteSong(song) {
  const data = fetch("http://localhost:3000/deletesong?name="+String(song), { method: "DELETE"})
  return (data.json)
}

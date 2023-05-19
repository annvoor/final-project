import React from 'react'
import { useState } from 'react'
import './App.css'

const dataURL = "localhost:3000"


// display search bar at top, list all songs, and then bar at the bottom to switch between this an playlists?
// place to add/change/delete songs/playlists on bottom bar
export default class App extends React.Component {
  render() {
    return(
      <div className="elements">
        {/* <Songs id="songs"/> */}
        <Add />
        <Search />
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

function Add(){
  const [inputValue, updateInputValue] = useState("Add a Song")

  function inputUpdate(evt) {
    updateInputValue(evt.target.value)
    addSong(inputValue).then(res => {
      console.log(res)
      console.log(inputValue)
    })
  }

  function change(evt) {
    updateInputValue(evt.target.value)
    console.log(inputValue)
  }

  return(
    <form  id="addSongs">
      <input name="songAdd" value={inputValue} onChange={change} id="song-add-input"/>
      <button onClick={() => onSubmit(inputUpdate)} id="song-add-button">Submit</button>
    </form>
  )
}

// figure out how to use query/body/params and all that
async function getSongData(request) {
    const data = await fetch("http://localhost:3000/getsong?name="+String(request))
    return (data.json())
}

// async function addSong(formData) {
//     const response = await fetch("https://localhost:3000/addsong", {
//       method: "POST",
//       body: formData,
//     })
//     return (response.json())
// }

async function addSong(formData) {
  try {
    const response = await fetch("https://example.com/posts", {
      method: "POST",
      body: formData,
    });
    const result = await response.json();
    console.log("Success:", result);
  } catch (error) {
    console.error("Error:", error);
  }
  return(response.json())
}


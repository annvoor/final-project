import React from 'react'
import { useState } from 'react'
import './App.css'


// pretty much the same as songs but click on playlist to display all the songs?
export default class Display extends React.Component {
    render() {
        return(
            <div>
                {/* <Playlist /> */}
                <Search />
            </div>
        )
    }
}

function Playlist() {
    fetchPlaylistData().then(data => {
        return(
            <div>
                <Search />
                <Delete />
                <AddSong />
                <Songs />
            </div>
        )
    })
}

function Search() {
    const [inputValue, updateInputValue] = useState("Search for a Playlist")
    const [playlistName, updatePlaylistName] = useState(null)
    const [songs, updateSongs] = useState(null)

    function inputUpdate(evt) {
        updateInputValue(evt.target.value)
        playlistSearch(inputValue).then(res => {
        console.log(res)
        console.log(res[0].playlistname)
        console.log(res[0].songs[0])
        updatePlaylistName(res[0].playlistname)
        updateSongs(res[0].songs)
        if (res[0].songs[0] == undefined) {
            updateSongs("no songs")
        }
        })
    }

    return(
        <div>
            <input name="playlistSearch" value={inputValue} onChange={inputUpdate} id="searchPlaylist"/>
            <div>{playlistName}</div>
            <div>{songs}</div>
        </div>
    )
}
function Delete() {
    return(
        <button></button>
    )
}

function Add() {
    return(
        <button></button>
    )
}

function AddSong() {

}

function Songs() {

}

async function playlistSearch(request) {
    const data = await fetch("http://localhost:3000/getplaylist?playlistname="+String(request))
    return (data.json())
}

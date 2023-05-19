import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Playlist from './playlists'
import './App.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Playlist />
    <App />
  </React.StrictMode>,
)

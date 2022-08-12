import React, { Component } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Room from './pages/Room'
import Roomlogin from './pages/Roomlogin'
import Homepage from './pages/Homepage'

function App() {
  return (
    <>
      <div>
        <Toaster
          position='top-right'
          toastOptions={{
            success: {
              theme: {
                primary: "green-400",
              },
            },
          }}
        ></Toaster>
      </div>
      <Router>
        <Routes>
          <Route path='/' element={<Homepage />} exact />
          <Route path="/room/:roomId" element={<Room />} />
          <Route path="/room" element={<Roomlogin />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

import React from 'react'
import Login from './components/Login'
import "./style.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EventList from "./components/EventList"
import Register from './components/Register';
import MyRegistrations from "./components/MyRegistrations";
import FeedbackForm from "./components/FeedbackForm";
import EventDetail from "./components/EventDetail";
import CreateEvent from "./components/CreateEvent";
import Navbar from './components/Navbar';

const App = () => {
  return (
    <>
    <Navbar />
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Register />} />
        <Route path="/events" element={<EventList />} />
        <Route path="/my-registrations" element={<MyRegistrations />} />
        <Route path="/events/:eventId/feedback" element={<FeedbackForm />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/create-event" element={<CreateEvent />} />
      </Routes>  
    </>  
  )
}

export default App
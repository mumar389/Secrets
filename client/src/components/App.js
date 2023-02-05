import React from 'react';
import Navbar from './Navbar';
import Home from './Home';
import Login from './Login';
import Secret from './Secret';
import Form from './Form';
import Register from './Register';
import About from './About';
import Contact from './Contact';
import {Route,Routes,BrowserRouter} from "react-router-dom";
import Logout from './Logout';
function App() {
 
  return (
    <div className="App">
  <BrowserRouter>
  <Navbar/>
    <Routes >
    <Route exact path="/" element={<Home />} />
    <Route exact path="/sign-in" element={<Login />} />
    <Route exact path="/secret-page" element={<Secret />} />
    <Route exact path="/secret-form" element={<Form />} />
    <Route exact path="/sign-up" element={<Register />} />
    <Route exact path="/about" element={<About />} />
    <Route exact path="/contact" element={<Contact />} />
    <Route exact path="/log-out" element={<Logout />} />
    </Routes>
    </BrowserRouter>

    </div>
  );
}

export default App;

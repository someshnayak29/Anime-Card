import React from 'react';
import { Container } from '@mui/material';
import './index.css';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Auth from './components/Auth/Auth';

/* in app.js we will track state of current id, why in app.js because we have to share current id between post and form and our app
is the only parent component b/w form and post */


const App = () => {

    return (
        <BrowserRouter>
        <Container maxwidth="lg">
            <Navbar />
            <Routes>
                <Route path = "/" element = {<Home />} />
                <Route path = "/auth" element = {<Auth />} /> 
            </Routes>
        </Container>
        </BrowserRouter>
    );
}

export default App;
import React, { useState, useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@mui/material';
import { useDispatch } from 'react-redux';
import { getPosts } from './actions/posts';
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import './index.css';

import OnePiece from './images/OnePiece.png';

/* in app.js we will track state of current id, why in app.js because we have to share current id between post and form and our app
is the only parent component b/w form and post */


const App = () => {
    const [currentId, setCurrentId] = useState(null); // now pass that current id over to form and setter method to both post and form

    const dispatch = useDispatch(); // define useDispatch hook, best way to dispatch action is inside useEffect

    /* useEffect(() => {
        dispatch();
    }, []); // right now we dont have any actions in here, there for now we add them

    */

    useEffect(() => {
        dispatch(getPosts()); // useDispatch will take that object i.e. action[type, payload], and lok thru the reducers
        //if it matches the type and then perform updates on store based on it.
    }, [currentId, dispatch]);

    return (
        <Container maxwidth="lg">
            <AppBar position="static" color="inherit" sx={{
                borderRadius: 15,
                margin: '30px 0',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Typography variant="h2" align="center" sx={{
                    color: 'rgba(0,183,255, 1)'
                }}>Anime Planet</Typography>
                <img src={OnePiece} alt="Anime" height="60" sx={{ marginLeft: '15px' }} />
            </AppBar>
            <Grow in>
                <Container>
                    <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Posts setCurrentId = {setCurrentId}/>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form currentId = {currentId} setCurrentId = {setCurrentId}/>
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    );
}

export default App;
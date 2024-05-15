import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid } from '@mui/material';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { useDispatch } from 'react-redux';
import { getPosts } from '../../actions/posts';

const Home = () => {

    const [currentId, setCurrentId] = useState(null); // now pass that current id over to form and setter method to both post and form

    const dispatch = useDispatch(); // define useDispatch hook, best way to dispatch action is inside useEffect

    /* useEffect(() => {
        dispatch();
    }, []); // right now we dont have any actions in here, there for now we add them

    */

    useEffect(() => {
        dispatch(getPosts()); // useDispatch will take that object i.e. action[type, payload], and look thru the reducers
        //if it matches the type and then perform updates on store based on it.
    }, [currentId, dispatch]);

    return (
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
    )
}

export default Home;
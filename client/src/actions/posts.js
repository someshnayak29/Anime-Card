import * as api from "../api";
import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes'

// Action creators, functions that return actions
// action is object that has type and payload
// we are working with async data, to actually fetch all the data sometimes it has to pass over some data, therefore we use thunk

/* const getPosts = () => {

    const action = { type : 'FETCH_ALL', payload: []};

    return action;
}
*/

// for async calls we use thunk i.e. it allows to create another function and in all it will return a funciotn

export const getPosts = () => async (dispatch) => {
  try {
    //fetching all data using api from backend, we will get response from api and it always has data object therefore we use data directly
    // we are destrucuring the response as { data }

    const { data } = await api.fetchPosts();
    dispatch({ type: FETCH_ALL, payload: data }); // triggers useEffect
  } catch (error) {
    console.log(error);
  }

  //we can remove this action and immediately dispatch this action in try block.

  /* const action = { type: 'FETCH_ALL', payload: [] };
    dispatch(action); */

  //return action;
  // with redux thunk instead of returning the action we actually dispatch(action), so that it also triggers useEffect
};
export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async(dispatch) => {
  try {

    await api.deletePost(id);
    dispatch({type : DELETE, payload : id});

  } catch (error) {

    console.log(error);
    
  }
}

export const likePost = (id) => async(dispatch) => {
  const user = JSON.parse(localStorage.getItem('profile'));

  try {
    const { data } = await api.likePost(id, user?.token);

    dispatch({ type: LIKE, payload: data });

  } catch (error) {

    console.log(error);

  }
}

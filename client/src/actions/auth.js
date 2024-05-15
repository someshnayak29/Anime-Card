import * as api from "../api";
import { AUTH } from '../constants/actionTypes'

// if async, then we use thunk i.e. return async function with dispatch

// FLOW is : components dispatch => actions => api call to backend and send response to dispatch => reducers

export const signin = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);
        dispatch({ type : AUTH, data }); // data is payload
        navigate('/');
    } catch (error) {
        console.log(error);
    }
}

export const signup = (formData, navigate) => async (dispatch) => {
    try {
      const { data } = await api.signUp(formData);
      dispatch({ type : AUTH, data });
      navigate('/');
    } catch (error) {
        console.log(error);
    }
}
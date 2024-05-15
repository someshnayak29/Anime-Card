import { AUTH, LOGOUT } from '../constants/actionTypes'

// have to give state some default value since currenlty it is undefined, if nothing then authData is set to null
const authReducer = (state = { authData : null }, action) => {
    switch (action.type){
        case AUTH :
            // we want to save in local storage so that when we refresh page, it knows that a user is log in

            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
            return { ...state, authData: action?.data };            // always have to return something

        case LOGOUT :
            localStorage.clear();
            return { ...state, authData: null }; // return same thing as auth except authdata is now null

        default:
            return state;
        
    }
};

export default authReducer;
import {
    LOGIN_USER,
    REGISTER_USER
} from '../_actions/type';

export default function(state={}, action){
    switch (action.type) {
        case LOGIN_USER:
            return {...state, logInSuccess: action.payload}; 
        case REGISTER_USER:
            return {...state, registerSuccess: action.payload};

        default:
            return state;
    }
}
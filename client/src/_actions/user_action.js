import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER
} from './type';

export function loginUser(dataToSubmit){
    
    const request = axios.post('/api/users/login', dataToSubmit)
        .then(function(response){
            return response.data;
        });
    
    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function registerUser(dataToSubmit){

    const request = axios.post('/api/users/register', dataToSubmit)
        .then(function(response){
            return response.data;
        });
    
    return {
        type: REGISTER_USER,
        payload: request
    }
}
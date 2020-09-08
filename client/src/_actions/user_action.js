import axios from 'axios';
import {
    LOGIN_USER
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
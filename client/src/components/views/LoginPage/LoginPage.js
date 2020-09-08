import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../../_actions/user_action'

function LoginPage(props) {
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    const onEmailHandler = function(event){
        setEmail(event.currentTarget.value);
    }
    const onPasswordHandler = function(event){
        setPassword(event.currentTarget.value);
    }
    const onSubmitHandler = function(event){
        event.preventDefault();

        const body = {
            email: Email,
            password: Password
        };

        dispatch(loginUser(body))
            .then(function(response){
                if(response.payload.logInSuccess){
                    alert(response.payload.message);
                    props.history.push('/');
                } else {
                    alert(response.payload.message);
                }
            })

    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh'
        }}>
            <form style={{
                display: 'flex', flexDirection: 'column'
            }} onSubmit={onSubmitHandler}>
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />
                <label>Password</label>
                <input type="password"value={Password} onChange={onPasswordHandler} />
                <br />
                <button>LogIn</button>
            </form>
        </div>
    )
}

export default LoginPage

import React, { useEffect } from 'react'
import axios from 'axios'

function LandingPage() {
    useEffect(() => {
        axios.get('/api/hello')
            .then((response) => { console.log(response.data) });
    }, []);

    const onClickHandler = function(){
        axios.get('/api/users/logout')
            .then((response) => {
                if(response.data.logOutSuccess){
                    alert('로그아웃 완료');
                } else {
                    alert('로그아웃 실패');
                }
            });
    };

    return (
        <div style={{
            display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh'
        }}> 
            <h2>시작 페이지</h2>
            <button onClick={onClickHandler}>로그아웃</button>  
        </div>
    )
}

export default LandingPage
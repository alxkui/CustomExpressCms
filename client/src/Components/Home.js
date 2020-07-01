import React from 'react';

function Home() {

    return(
        <div>
            <h1>Welcome</h1>
            <hr />
            { localStorage.getItem('token') ? <h2>Logged In!</h2> : <h2>You are not logged in!</h2> }
        </div>
    );
}

export default Home;
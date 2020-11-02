import {useEffect} from 'react';
import {checkTokenValid} from "../helpers/api";

function Home() {
    useEffect(() => {
        checkTokenValid();
    });

    return (
        <h1>Home</h1>
    );
}

export default Home;

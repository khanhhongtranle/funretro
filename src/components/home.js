import {quickCheckToken} from "../helpers/api";
import {Redirect} from 'react-router-dom';

function Home() {
    const logined = quickCheckToken();
    if (logined) {
        return (
            <h1>Home</h1>
        );
    } else {
        return (<Redirect to="/login"/>);
    }
}

export default Home;

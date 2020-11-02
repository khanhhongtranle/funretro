import Login from "./components/login";
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Switch, Route, Link} from "react-router-dom";
import Home from "./components/home";
import {useEffect} from 'react';
import {checkTokenValid} from "./helpers/api";

function App() {
    useEffect(() => {
        checkTokenValid();
    });
    return (
        <BrowserRouter>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
            </ul>
            <Switch>
                <Route path="/login"><Login/></Route>
                <Route path="/"><Home/></Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;

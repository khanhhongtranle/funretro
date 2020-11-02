import Login from "./components/login";
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Home from "./components/home";
import {useEffect} from 'react';
import {checkTokenValid} from "./helpers/api";
import BoardDetail from "./components/boardDetail";

function App() {
    useEffect(() => {
        checkTokenValid();
    });
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/login"><Login/></Route>
                <Route path="/detail"><BoardDetail/></Route>
                <Route path="/"><Home/></Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;

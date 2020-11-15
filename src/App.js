import Login from "./components/login";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Home from "./components/home";
import {useEffect} from 'react';
import {checkTokenValid} from "./helpers/api";
import {BoardDetail} from "./components/boardDetail";
import Signup from "./components/signup";
import Account from "./components/account";

function App() {
    useEffect(() => {
        checkTokenValid();
    });

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/login"><Login/></Route>
                <Route path="/detail/:id" component={BoardDetail}/>
                <Route path="/signup" component={Signup}/>
                <Route path="/account" component={Account}/>
                <Route path="/"><Home/></Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;

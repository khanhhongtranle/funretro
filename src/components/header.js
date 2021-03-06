import {Navbar, Nav, Button, Container} from "react-bootstrap";
import {callAPI, deleteCookie, getCookie} from "../helpers/api";
import {config} from "../config";
import {faSignOutAlt, faUserAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useEffect, useState} from "react";

function Header() {

    const [mounted, setMounted] = useState(true);
    const [username, setUsername] = useState('');

    useEffect(()=>{
        const params = new FormData();
        params.append('token', getCookie(config.cookie_name));
        params.append('user_id', getCookie(config.cookie_user_id));

        callAPI('getUserInfo', params, function (res) {
            if (res.success) {
                if (mounted) {
                    setUsername(res.data['username']);
                }
            }
        });
        setMounted(false);
    }, [mounted])

    function logoutHandler() {
        deleteCookie(config.cookie_name);
        deleteCookie(config.cookie_user_id);
        window.location.href = "/";
    }

    function accountHandler(){
        window.location.href = "/account";
    }

    return (
            <Navbar bg="info" variant="dark">
                <Container>
                    <Navbar.Brand href="/">Funretro</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                    </Nav>
                    <Nav className="mr-auto">
                        <Nav.Item style={{color: "#fff"}}>Hi, {username}!</Nav.Item>
                    </Nav>
                    <Button onClick={accountHandler} style={{marginRight: "1rem"}} variant="outline-light">
                        <FontAwesomeIcon icon={faUserAlt}/>
                        Profile
                    </Button>
                    <Button variant="light" onClick={logoutHandler}>
                        <FontAwesomeIcon icon={faSignOutAlt}/>
                        Logout
                    </Button>
                </Container>
            </Navbar>
    );
}
export default Header;

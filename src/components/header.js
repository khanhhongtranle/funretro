import {Navbar, Nav, Button, Container} from "react-bootstrap";
import {deleteCookie} from "../helpers/api";
import {config} from "../config";
import {faSignOutAlt, faUserAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function Header() {

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

import {Navbar, Nav, Button} from "react-bootstrap";
import {deleteCookie} from "../helpers/api";
import {config} from "../config";

function Header() {

    function logoutHandler() {
        deleteCookie(config.cookie_name);
        deleteCookie(config.cookie_user_id);
        window.location.href = "/";
    }

    return (
            <Navbar bg="primary" variant="dark">
                <Navbar.Brand href="#home">Funretro</Navbar.Brand>
                <Nav className="mr-auto">
                    <Button variant="light" onClick={logoutHandler}>Logout</Button>
                </Nav>
            </Navbar>
    );
}
export default Header;

import {Form, Button, Container, Card} from 'react-bootstrap';
import {useState} from "react";
import {callAPI, setCookie} from "../helpers/api";
import {config} from "../config";
import {Link} from "react-router-dom";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function actionLogin() {
        const params = new FormData();
        params.append('username', username);
        params.append('password', password);

        callAPI('login', params, function (res) {
            if (res.success) {
                setCookie(config.cookie_name, res.token);
                setCookie(config.cookie_user_id, res.user_id);
                window.location.href = "/";
            } else {
                alert('Login failed');
            }
        });
    }

    return (
        <Container style={{paddingTop: "2rem"}}>
            <Card style={{padding: "1rem", width: "300px", margin: "auto"}}>
                <h2 className="text-center">Login</h2>
                <Form>
                    <Form.Group controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Username" onChange={e => setUsername(e.target.value)}/>
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                    </Form.Group>
                    <Button onClick={actionLogin} variant="primary" type="button">Login</Button>
                    <Link style={{marginLeft: "20px"}} to="/signup">Sign up</Link>
                </Form>
            </Card>
        </Container>
    );
}

export default Login;

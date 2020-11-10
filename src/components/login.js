import {Form, Button, Container, Card, Row, Col} from 'react-bootstrap';
import {useState} from "react";
import {callAPI, setCookie} from "../helpers/api";
import {config} from "../config";
import {Link} from "react-router-dom";
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

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

    const responseGoogle = (response) => {
        console.log(response);
        const params = new FormData();
        params.append('email', response.tt.$t);
        params.append('first_name', response.tt.gV);
        params.append('last_name', response.tt.jT);
        params.append('username', response.tt.CT);

        callAPI('loginGoogle', params, function (res) {
            if (res.success) {
                setCookie(config.cookie_name, res.token);
                setCookie(config.cookie_user_id, res.user_id);
                window.location.href = "/";
            } else {
                alert('Login failed');
            }
        });
    }

    const responseFacebook = (response) => {
        console.log(response);
        const params = new FormData();
        params.append('username', response.userID);
        params.append('email', response.email);
        params.append('first_name', response.name);
        params.append('last_name', '');
        callAPI('loginFacebook', params, function (res) {
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
            <Card style={{padding: "1rem", width: "400px", margin: "auto"}}>
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

                    <Row>
                        <Col>
                            <Button onClick={actionLogin} variant="primary" type="button">Login</Button>
                        </Col>
                        <Col>
                            <Link style={{marginLeft: "20px", marginRight: "20px"}} to="/signup">Sign up</Link>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <GoogleLogin
                                clientId={config.google_client_id}
                                buttonText="Login"
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                                cookiePolicy={'single_host_origin'}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <FacebookLogin
                                appId="403062567533270"
                                autoLoad={false}
                                textButton="Login"
                                fields="name,email,picture"
                                onClick={()=>{console.log("Clicked!")}}
                                callback={responseFacebook} />
                        </Col>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
}

export default Login;

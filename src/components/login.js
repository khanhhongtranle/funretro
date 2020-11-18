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
        if (response.hasOwnProperty('$t')) {
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
    }

    const responseFacebook = (response) => {
        if (response.hasOwnProperty()) {
            const params = new FormData();
            params.append('username', response.id);
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
    }

    const handleKeyPress = (event) => {
        if (event.code === "Enter") {
            actionLogin();
        }
    };

    return (
        <Container style={{paddingTop: "2rem"}}>
            <Card style={{padding: "1rem", width: "400px", margin: "auto"}}>
                <h2 className="text-center">Login</h2>
                <Form>
                    <Form.Group controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control onKeyPress={handleKeyPress} type="text" placeholder="Username" onChange={e => setUsername(e.target.value)}/>
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onKeyPress={handleKeyPress} type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                    </Form.Group>

                    <Row>
                        <Col>
                            <Button onClick={actionLogin} variant="info" type="button">Login</Button>
                        </Col>
                        <Col style={{textAlign:"right"}}>
                            <Link style={{marginLeft: "20px", marginRight: "20px"}} to="/signup">Sign up</Link>
                        </Col>
                    </Row>

                    <Row style={{marginTop:"1rem", textAlign:"center"}}>
                        <Col>
                            <GoogleLogin
                                className={"btn btn-outline-primary"}
                                style={{textAlign:"center",width:"300px"}}
                                clientId={config.google_client_id}
                                buttonText="Login"
                                onSuccess={responseGoogle}
                                cookiePolicy={'single_host_origin'}
                            />
                        </Col>
                    </Row>

                    <Row style={{marginTop:"1rem", textAlign:"center"}}>
                        <Col>
                            <FacebookLogin
                                className={"btn btn-outline-primary"}
                                style={{textAlign:"center",width:"300px"}}
                                appId={config.facebook_app_id}
                                autoLoad={true}
                                textButton="Login"
                                fields="name,email,picture"
                                callback={responseFacebook}/>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
}

export default Login;

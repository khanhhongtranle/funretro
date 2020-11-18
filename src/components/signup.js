import {Form, Button, Container, Card, Col, Row} from 'react-bootstrap';
import {useState} from "react";
import {callAPI, setCookie} from "../helpers/api";
import {config} from "../config";
import {Link} from "react-router-dom";

function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setrePassword] = useState("");
    const [email, setEmail] = useState("");
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");

    function signupHandler() {
        /**
         * password
         */
        if(password!== repassword){
            alert("re-password not match!");
            return;
        }
        if(username==="" || password==="" || email === "" || firstname==="" || lastname===""){
            alert("please input field required!");
            return;
        }

        const params = new FormData();
         params.append('username', username);
         params.append('password', password);
         params.append('email', email);
         params.append('firstname', firstname);
         params.append('lastname', lastname);

        callAPI('signup', params, function (res) {
            //console.log(res);
            if (res.success) {
                window.location.href = "/login";
            } else {
                alert('Failed');
            }
        });
    }

    return (
        <Container style={{paddingTop: "2rem"}}>
            <Card style={{padding: "1rem", width: "600px", margin: "auto"}}>
                <h2 className="text-center">Sign Up</h2>
                <Form>
                    <Row>
                        <Col xs={6}>
                            <Form.Group controlId="username">
                                <Form.Label>Username *</Form.Label>
                                <Form.Control type="text" placeholder="Username" onChange={e => setUsername(e.target.value)} />
                            </Form.Group>
                        </Col>
                        <Col xs={6}>
                            <Form.Group controlId="password">
                                <Form.Label>Password *</Form.Label>
                                <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={6}>
                            <Form.Group controlId="repassword">
                                <Form.Label>Re-Password *</Form.Label>
                                <Form.Control type="password" placeholder="Re-password" onChange={e => setrePassword(e.target.value)}/>
                            </Form.Group>
                        </Col>
                        <Col xs={6}>
                            <Form.Group controlId="email">
                                <Form.Label>Email *</Form.Label>
                                <Form.Control type="text" placeholder="Email" onChange={e => setEmail(e.target.value)}/>
                            </Form.Group>
                        </Col>
                    </Row>


                    <Row>
                        <Col xs={6}>
                            <Form.Group controlId="firstname">
                                <Form.Label>First name *</Form.Label>
                                <Form.Control type="text" placeholder="First name" onChange={e => setFirstName(e.target.value)}/>
                            </Form.Group>
                        </Col>
                        <Col xs={6}>
                            <Form.Group controlId="lastname">
                                <Form.Label>Last name *</Form.Label>
                                <Form.Control type="text" placeholder="Last name" onChange={e => setLastName(e.target.value)}/>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Button onClick={signupHandler} variant="info" type="button">Submit</Button>
                    <Link style={{marginLeft: "20px"}} to="/login">Login</Link>
                </Form>
            </Card>
        </Container>
    );
}

export default Signup;

import {Form, Button, Container, Card, Col, Row} from 'react-bootstrap';
import React, {useEffect, useState} from "react";
import {callAPI, getCookie, quickCheckToken, setCookie} from "../helpers/api";
import {config} from "../config";
import {Link, Redirect} from "react-router-dom";
import Header from "./header";

function Account() {
    const logined = quickCheckToken();

    const [username, setUsername] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [email, setEmail] = useState("");
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [mounted, setMounted] = useState(true);
    useEffect(() => {
        const params = new FormData();
        params.append('token', getCookie(config.cookie_name));
        params.append('user_id', getCookie(config.cookie_user_id));

        callAPI('getUserInfo', params, function (res) {
            if (res.success) {
                console.log(res);
                if (mounted) {
                    setUsername(res.data['username']);
                    setEmail(res.data['email']);
                    setFirstName(res.data['first_name']);
                    setLastName(res.data['last_name']);
                }
            }
        });
        setMounted(false);
    });

    function updateAccountHandler() {
        if(username==="" || email === "" || firstname==="" || lastname===""){
            alert("please input field required!");
            return;
        }

        const params = new FormData();
        params.append('token', getCookie(config.cookie_name));
        params.append('username', username);
        params.append('oldPassword', oldPassword);
        params.append('newPassword', newPassword);
        params.append('email', email);
        params.append('firstname', firstname);
        params.append('lastname', lastname);

        callAPI('updateUserInfo', params, function (res) {
            console.log(res);
            if (res.success && res.data['change_pass']) {
                alert('Updated info and password!');
            }else if(res.success && res.old_pass_not_valid) {
                alert('Updated info! Old password not valid - password not change!');
            }else if(res.success){
                alert('Updated info!');
            } else {
                alert('Failed');
            }
        });
    }
    if (logined) {
        return (
            <Container fluid>
            <Header />
            <Container style={{paddingTop: "2rem"}}>
                <Card style={{padding: "1rem", width: "600px", margin: "auto"}}>
                    <h2 className="text-center">Account infomation</h2>
                    <Form>
                        <Row>
                            <Col xs={6}>
                                <Form.Group controlId="username">
                                    <Form.Label>Username *</Form.Label><br/>
                                    <Form.Label>{username}</Form.Label>
                                </Form.Group>
                            </Col>
                            <Col xs={6}>
                                <Form.Group controlId="password">
                                    <Form.Label>Old Password</Form.Label>
                                    <Form.Control value={oldPassword} type="password" placeholder="Password" onChange={e => setOldPassword(e.target.value)}/>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={6}>
                                <Form.Group controlId="email">
                                    <Form.Label>Email *</Form.Label>
                                    <Form.Control value={email} type="text" placeholder="Email" onChange={e => setEmail(e.target.value)}/>
                                </Form.Group>
                            </Col>
                            <Col xs={6}>
                                <Form.Group controlId="password">
                                    <Form.Label>New Password</Form.Label>
                                    <Form.Control value={newPassword} type="password" placeholder="Password" onChange={e => setNewPassword(e.target.value)}/>
                                </Form.Group>
                            </Col>
                        </Row>


                        <Row>
                            <Col xs={6}>
                                <Form.Group controlId="firstname">
                                    <Form.Label>First name *</Form.Label>
                                    <Form.Control value={firstname} type="text" placeholder="First name" onChange={e => setFirstName(e.target.value)}/>
                                </Form.Group>
                            </Col>
                            <Col xs={6}>
                                <Form.Group controlId="lastname">
                                    <Form.Label>Last name *</Form.Label>
                                    <Form.Control value={lastname} type="text" placeholder="Last name" onChange={e => setLastName(e.target.value)}/>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Button onClick={updateAccountHandler} variant="primary" type="button">Change</Button>
                        <Link style={{marginLeft: "20px"}} to="/">Back</Link>
                    </Form>
                </Card>
            </Container>
            </Container>
        );
    } else {
        return (<Redirect to="/login"/>);
    }
}

export default Account;

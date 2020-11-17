import {Form, Button, Container, Card, Col, Row, Modal} from 'react-bootstrap';
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
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showChangePassword, setShowChangePassword] = useState(false);
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
        params.append('email', email);
        params.append('firstname', firstname);
        params.append('lastname', lastname);

        callAPI('updateUserInfo', params, function (res) {
            console.log(res);
            if (res.success) {
                alert('Infor is updated.');
            }
        });
    }

    function handleChangePassword(){
        if (oldPassword === '' || newPassword === '' || confirmPassword === ''){
            alert('Please input field required!');
            return;
        }

        if (newPassword !== confirmPassword){
            alert('confirm password is incorrect!');
            return;
        }

        const params = new FormData();
        params.append('token', getCookie(config.cookie_name));
        params.append('username', username);
        params.append('old_password', oldPassword);
        params.append('new_password', newPassword);

        callAPI('updateUserPassword', params, function (res) {
            console.log(res);
            if (res.success) {
                if (res.data['change_pass']){
                    alert('Changed password');
                }
                else if (res.data['old_pass_not_valid']){
                    alert('Old password is incorrect!');
                }

                setShowChangePassword(false);
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
                                <Form.Group controlId="email">
                                    <Form.Label>Email *</Form.Label>
                                    <Form.Control value={email} type="text" placeholder="Email" onChange={e => setEmail(e.target.value)}/>
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
                        <Link style={{margin: "0 20px"}} to="/">Back</Link>
                        <Button variant="success" type="button" onClick={() => setShowChangePassword(true)}>Change password</Button>
                    </Form>
                </Card>

                <Modal show={showChangePassword} onHide={() => setShowChangePassword(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Change password</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form>
                            <Row>
                                <Col>
                                    <Form.Group controlId="password">
                                        <Form.Label>Old password *</Form.Label><br/>
                                        <Form.Control value={oldPassword} type="password" onChange={e => setOldPassword(e.target.value)}/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group controlId="newpassword">
                                        <Form.Label>New password *</Form.Label>
                                        <Form.Control value={newPassword} type="password" onChange={e => setNewPassword(e.target.value)}/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group controlId="confirmpassword">
                                        <Form.Label>Confirm password *</Form.Label>
                                        <Form.Control value={confirmPassword} type="password" onChange={e => setConfirmPassword(e.target.value)}/>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowChangePassword(false)} >Close</Button>
                        <Button variant="primary" onClick={handleChangePassword}>Save changes</Button>
                    </Modal.Footer>
                </Modal>

            </Container>
            </Container>
        );
    } else {
        return (<Redirect to="/login"/>);
    }
}

export default Account;

import {callAPI, getCookie, quickCheckToken} from "../helpers/api";
import {Redirect, Link} from 'react-router-dom';
import {Container, Row, Col, Card, Modal, Button, Form} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {config} from "../config";
import Header from "./header";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock, faTimes, faUser} from "@fortawesome/free-solid-svg-icons";


function Home() {
    const logined = quickCheckToken();
    const [boards, setBoards] = useState([]);
    const [boardName, setBoardName] = useState("");
    const [sharedBoards, setSharedBoards] = useState([]);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSaveBoard = (id) => {
        const params = new FormData();
        params.append('board_name', boardName);
        params.append('user_id', getCookie(config.cookie_user_id));
        params.append('token', getCookie(config.cookie_name));

        callAPI('saveBoard', params, function (res) {
            //console.log(res);
            if (res.success) {
                setShow(false);
                setBoards(res.data);
            } else {
                alert('Failed');
            }
        });
    };

    const handleDelete = (id) => {
        const params = new FormData();
        params.append('id', id);
        params.append('user_id', getCookie(config.cookie_user_id));
        params.append('token', getCookie(config.cookie_name));

        callAPI('deleteBoard', params, function (res) {
            //console.log(res);
            if (res.success) {
                setShow(false);
                setBoards(res.data);
            } else {
                alert('Failed');
            }
        });
    };
    const [mounted, setMounted] = useState(true);
    useEffect(() => {
        const params = new FormData();
        params.append('token', getCookie(config.cookie_name));
        params.append('user_id', getCookie(config.cookie_user_id));

        callAPI('getBoards', params, function (res) {
            if (res.success) {
                //console.log(res);

                let params1 = new FormData();
                params1.append('token', getCookie(config.cookie_name));
                params1.append('user_id', getCookie(config.cookie_user_id));
                callAPI('getSharedBoards', params1, res => {
                    if (res.success) {
                       // console.log(res);
                        setSharedBoards(res.data);
                    }
                });

                if (mounted) {
                    setBoards(res.data);
                }
            }
        });
        setMounted(false);
    }, []);

    if (logined) {
        return (
            <Container fluid>
                <Header/>
                <Container>
                    <div>
                        <div style={{marginTop: "2rem"}}>
                            <span style={{fontSize: "30px"}}>My Boards</span>
                            <Button style={{fontSize: "15px", margin: "10px 0 20px 30px"}} variant="info" onClick={handleShow}>New board</Button>
                        </div>

                        <Row>
                            {boards.map(board =>
                                <Col xs>
                                    <Link className="link" to={'/detail/' + board['id']}>
                                        <Card className="mycard">
                                            <Card.Body>
                                                <FontAwesomeIcon onClick={() => handleDelete(board['id'])} className="delete" icon={faTimes}/>
                                                <Card.Title>{board['board_name']}</Card.Title>
                                                <Card.Text>
                                                    <small>
                                                        <FontAwesomeIcon style={{marginRight: "5px",  color: "#acacac"}} icon={faClock}/>
                                                        {board['date_created']}
                                                    </small>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Link>
                                </Col>
                            )}
                        </Row>
                    </div>

                    <Modal show={show} onHide={handleClose} animation={false}>
                        <Modal.Header closeButton>
                            <Modal.Title>Create new board</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group controlId="boardname">
                                <Form.Label>Board name</Form.Label>
                                <Form.Control type="text" onChange={e => setBoardName(e.target.value)}/>
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="info" onClick={handleSaveBoard}>
                                Add
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <div style={{marginTop: "3rem"}}>
                        <div>
                            <span style={{fontSize: "30px"}}>Shared Boards</span>
                        </div>

                        <Row>
                            {sharedBoards.map(board =>
                                <Col xs>
                                    <Link className="link" to={'/detail/' + board['id']}>
                                        <Card className="mycard">
                                            <Card.Body>
                                                <Card.Title>{board['board_name']}</Card.Title>
                                                <Card.Text>
                                                    <FontAwesomeIcon style={{marginRight: "5px", color: "#acacac"}} icon={faUser}/>
                                                    User Created: {board['username']}
                                                </Card.Text>
                                                <Card.Text>
                                                    <FontAwesomeIcon style={{marginRight: "5px",  color: "#acacac"}} icon={faClock}/>
                                                    {board['date_created']}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Link>
                                </Col>
                            )}
                        </Row>
                    </div>
                </Container>
            </Container>
        );
    } else {
        return (<Redirect to="/login"/>);
    }
}

export default Home;

import {callAPI, checkTokenValid, getCookie, quickCheckToken, setCookie} from "../helpers/api";
import {BrowserRouter, Redirect, Link} from 'react-router-dom';
import {Container, Row, Col, Card, Navbar, Nav, Modal, Button, Form} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {config} from "../config";
import Header from "./header";


function Home() {
    const logined = quickCheckToken();
    const [boards, setBoards] = useState([]);
    const [boardName, setBoardName] = useState("");

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSaveBoard = (id) =>{
        const params = new FormData();
        params.append('board_name', boardName);
        params.append('user_id', getCookie(config.cookie_user_id));
        params.append('token', getCookie(config.cookie_name));

        callAPI('saveBoard', params, function (res) {
            console.log(res);
            if (res.success) {
                setShow(false);
                setBoards(res.data);
            } else {
                alert('Failed');
            }
        });
    };

    const handleDelete = (id) =>{
        const params = new FormData();
        params.append('id', id);
        params.append('user_id', getCookie(config.cookie_user_id));
        params.append('token', getCookie(config.cookie_name));

        callAPI('deleteBoard', params, function (res) {
            console.log(res);
            if (res.success) {
                setShow(false);
                setBoards(res.data);
            } else {
                alert('Failed');
            }
        });
    };

    useEffect(() => {
        let mounted = true;

        const params = new FormData();
        params.append('token', getCookie(config.cookie_name));
        params.append('user_id', getCookie(config.cookie_user_id));

        callAPI('getBoards', params, function (res) {
            if (res.success) {
                console.log(res);
                if (mounted) {
                    setBoards(res.data);
                }
            }
        });

        return () => {
            mounted = false;
        };
    },[]);

    if (logined) {
        return (
            <Container fluid>
               <Header />

               <div style={{margin:"20px 30px"}}>
                   <div>
                       <span style={{fontSize: "30px"}}>My Boards</span>
                       <Button style={{fontSize: "10px", margin: "10px 0 20px 30px"}} variant="outline-primary" onClick={handleShow}>New board</Button>
                   </div>

                    <Row>
                        {boards.map( board =>
                            <Col xs>
                                <Card style={{ width: '18rem',marginTop:"1rem" }}>
                                    <Card.Body>
                                        <Card.Title>{board['board_name']}</Card.Title>
                                        <Card.Text>
                                            Date Created: {board['date_created']}
                                        </Card.Text>
                                        <Link to={'/detail/'+board['id']} style={{marginRight:"10px"}}>
                                            <Button variant="link" type="button">
                                                More
                                            </Button>
                                        </Link>
                                        <Button variant="link" type="button" onClick={()=>handleDelete(board['id'])}>Delete</Button>
                                    </Card.Body>
                                </Card>
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
                            <Form.Control type="text"  onChange={e => setBoardName(e.target.value)}/>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleSaveBoard}>
                            Add
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        );
    } else {
        return (<Redirect to="/login"/>);
    }
}

export default Home;

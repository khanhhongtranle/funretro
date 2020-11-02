import {callAPI, checkTokenValid, getCookie, quickCheckToken, setCookie} from "../helpers/api";
import {BrowserRouter, Redirect} from 'react-router-dom';
import {Container, Row, Col, Card, Navbar, Nav, Button} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {config} from "../config";
import Header from "./header";


function moreHandler() {
    window.location.href = "/detail";
}

function Home() {
    const logined = quickCheckToken();
    const [boards, setBoards] = useState([]);

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
                       <Button style={{fontSize: "10px", margin: "10px 0 20px 30px"}} variant="outline-primary">New board</Button>
                   </div>

                    <Row>
                        {boards.map( board =>
                            <Col xs>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Body>
                                        <Card.Title>{board['board_name']}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                                        <Card.Text>
                                            Date Created: {board['date_created']}
                                        </Card.Text>
                                        <Button variant="link" onClick={moreHandler}>More</Button>
                                        <Card.Link>
                                            Share Link
                                        </Card.Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )}
                    </Row>
               </div>
            </Container>
        );
    } else {
        return (<Redirect to="/login"/>);
    }
}

export default Home;

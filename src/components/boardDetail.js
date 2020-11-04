import {callAPI, getCookie, quickCheckToken} from "../helpers/api";
import {Redirect} from 'react-router-dom';
import {Container, Row, Button, Modal, Form} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {config} from "../config";
import Header from "./header";
import Board from 'react-trello';

function BoardDetail(props) {
    const logined = quickCheckToken();

    const [board, setBoard] = useState({
        lanes: [
            {
                id: "went well",
                title: "Went Well",
                cards: []
            },
            {
                id: "to improve",
                title: "To Improve",
                cards: []
            },
            {
                id: "action items",
                title: "Action Items",
                cards: []
            },
        ]
    });

    const [boardName, setBoardName] = useState('Board Name');
    const [newBoardName, setNewBoardName] = useState('');

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        let mounted = true;

        const params = new FormData();
        params.append('token', getCookie(config.cookie_name));
        params.append('board_id', props.match.params.id);

        callAPI('getBoardDetail', params, function (res) {
            if (res.success) {
                console.log(res.data);
                let board_detail = board;
                for (let d of res.data['board_details']) {
                    if (d.type === 'went well') {
                        let objectCard = {
                            id: d.id,
                            title: d.title,
                            description: d.description
                        };
                        board_detail.lanes[0].cards.push(objectCard);
                    } else if (d.type === 'to improve') {
                        let objectCard = {
                            id: d.id,
                            title: d.title,
                            description: d.description
                        };
                        board_detail.lanes[1].cards.push(objectCard);
                    } else if (d.type === 'action items') {
                        let objectCard = {
                            id: d.id,
                            title: d.title,
                            description: d.description
                        };
                        board_detail.lanes[2].cards.push(objectCard);
                    }
                }
                if (mounted) {
                    setBoard(board_detail);
                    setBoardName(res.data['board_name']);
                    setNewBoardName(res.data['board_name']);
                }
            }
        });

        return () => {
            mounted = false;
        };

    }, []);

    const handleSaveBoard = () => {
        const params = new FormData();
        params.append('token', getCookie(config.cookie_name));
        params.append('board_id', props.match.params.id);
        params.append('board_name', newBoardName);

        callAPI('editBoard', params, function (res) {
            if (res.success) {
                setShow(false);
                setBoardName(newBoardName);
            }
        });
    }

    function handleCardAdd(card, land_id) {
        console.log(card);
        console.log(land_id);
        const params = new FormData();
        params.append('token', getCookie(config.cookie_name));
        params.append('board_id', props.match.params.id);
        params.append('type', land_id);
        params.append('title', card.title);
        params.append('description', card.description);

        callAPI('addNewCard', params, function (res) {
            console.log(res);
        });
    }

    if (logined) {
        return (
            <Container fluid>
                <Header/>
                <div style={{margin: "20px 30px"}}>
                    <div>
                        <span style={{fontSize: "30px"}}>{boardName}</span>
                        <Button style={{margin: "10px 0 20px 30px"}} variant="link" onClick={() => handleShow()}>Edit</Button>
                        <Button style={{fontSize: "10px", margin: "10px 0 20px 30px"}} variant="outline-primary">Share board</Button>
                    </div>

                    <Row>
                        <Board
                            editable
                            data={board}
                            onCardAdd={handleCardAdd}
                        />
                    </Row>
                </div>

                <Modal show={show} onHide={handleClose} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit board</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group controlId="boardname">
                            <Form.Label>Board name</Form.Label>
                            <Form.Control type="text" value={newBoardName} onChange={e => setNewBoardName(e.target.value)}/>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleSaveBoard}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        );
    } else {
        return (<Redirect to="/login"/>);
    }
}

export default BoardDetail;

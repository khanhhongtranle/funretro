import React, {useEffect, useState} from "react";
import Board from "react-trello";
import {Container, Button, Modal, Form, Row} from "react-bootstrap";
import Header from "./header";
import {callAPI, getCookie, quickCheckToken} from "../helpers/api";
import {Redirect} from "react-router-dom";
import {config} from "../config";

const initData = {
    "lanes": [
        {
            "id": "WENTWELL",
            "title": "WENT WELL",
            "cards": [

            ]
        },
        {
            "id": "TOIMPROVE",
            "title": "TO IMPROVE",
            "cards": [

            ]
        },
        {
            "id": "ACTIONITEMS",
            "title": "ACTION ITEMS",
            "cards": []
        }
    ]
}


export function BoardDetail (props) {

    const logined = quickCheckToken();

    const [data, setData] = useState(initData);
    const [boardName, setBoardName] = useState("board name");
    const [show, setShow] = useState(false);
    const [newBoardName, setNewBoardName] = useState("")

    useEffect(() => {
        let mounted = true;

        const params = new FormData();
        params.append('token', getCookie(config.cookie_name));
        params.append('board_id', props.match.params.id);
        callAPI("getBoardDetail", params, function (res) {
            if (res.success){
                let boardDetails = res.data['board_details'];
                let copyData = initData;
                for (let record of boardDetails){
                    let newCard = {
                        id: record.id.toString() ,
                        title: record.title,
                        description: record.description,
                    }
                    copyData.lanes.find(col => col.id === record['type']).cards.push(newCard);
                }

                if (mounted){
                    setData(copyData);
                    setBoardName(res.data['board_name']);
                    setNewBoardName(res.data['board_name']);
                }
            }
        });

        return () => { mounted = false };
    },[]);

    function handleCardAdd(card, laneId){
        let params = new FormData();
        params.append('token', getCookie(config.cookie_name));
        params.append('board_id', props.match.params.id);
        params.append('title', card.title);
        params.append('description', card.description);
        params.append('type', laneId);
        callAPI('addCard', params, res => {
            if (res.success){
                console.log(1);
            }
        })
    }

    function handleCardDelete(cardId, laneId){
        let params = new FormData();
        params.append('token', getCookie(config.cookie_name));
        params.append('card_id', cardId);
        callAPI('deleteCard', params, res => {
            if (res.success){
                console.log(1);
            }
        })
    }

    function handleSaveBoard() {
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

    function handleMoveCard(fromLaneId, toLaneId, cardId, index){
        console.log(fromLaneId);
        console.log(toLaneId);
        console.log(cardId);
        console.log(index);
    }

    if (logined) {
        return (
            <Container fluid>
                <Header/>
                <div style={{margin: "20px 30px"}}>
                    <div>
                        <span style={{fontSize: "30px"}}>{boardName}</span>
                        <Button style={{margin: "10px 0 20px 30px"}} variant="link" onClick={ ()=> {setShow(true)}}>Edit</Button>
                        <Button style={{fontSize: "10px", margin: "10px 0 20px 30px"}} variant="outline-primary">Share board</Button>
                    </div>

                    <Row>
                        <Board
                            cardDraggable={true}
                            laneDraggable={false}
                            draggable={true}
                            editable={true}
                            onCardAdd={handleCardAdd}
                            onCardDelete={handleCardDelete}
                            onCardMoveAcrossLanes={handleMoveCard}
                            style={{backgroundColor: 'white'}}
                            data={data}
                        />
                    </Row>
                </div>

                <Modal show={show} onHide={() => {setShow(false)}} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit board</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group controlId="boardname">
                            <Form.Label>Board name</Form.Label>
                            <Form.Control type="text" value={newBoardName} onChange = {e => setNewBoardName(e.target.value)} />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => {setShow(false)}}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => handleSaveBoard()}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        );
    }
    else {
            return (
                <Redirect to ="/login"/>
            )
    }
}

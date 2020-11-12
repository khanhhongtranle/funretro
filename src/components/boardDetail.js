import React, {useEffect, useState} from "react";
import Board from "react-trello";
import {Button, Container, Form, Modal, Row, OverlayTrigger, Tooltip} from "react-bootstrap";
import Header from "./header";
import {callAPI, getCookie, quickCheckToken} from "../helpers/api";
import {Redirect} from "react-router-dom";
import {config} from "../config";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import {initData} from "./data";

export function BoardDetail(props) {

    const logined = quickCheckToken();

    const [data, setData] = useState(initData);

    const [boardName, setBoardName] = useState("board name");
    const [newBoardName, setNewBoardName] = useState("");

    const [editingCard, setEditingCard] = useState({});

    const [showEditBoardModal, setShowEditBoardModal] = useState(false);
    const [showEditCardModal, setShowEditCardModal] = useState(false);
    const [showShareBoardModal, setShowShareBoardModal] = useState(false);

    const [sharedEmail, setSharedEmail] = useState("");
    const [mounted, setMounted] = useState(true);

    useEffect(() => {
        if(mounted) {
            const params = new FormData();
            params.append('token', getCookie(config.cookie_name));
            params.append('board_id', props.match.params.id);
            callAPI("getBoardDetail", params, res =>{
                if (res.success) {
                    let boardDetails = res.data['board_details'];
                    let copyData = initData;
                    for (let record of boardDetails) {
                        let newCard = {
                            id: record.id.toString(),
                            title: record.title,
                            description: record.description,
                        }
                        copyData.lanes.find(col => col.id === record['type']).cards.push(newCard);
                    }

                    setData(copyData);
                    setBoardName(res.data['board_name']);
                    setNewBoardName(res.data['board_name']);
                    setMounted(false);
                }
            });
        }
    }, [data]);

    function handleCardAdd(card, laneId) {
        let params = new FormData();
        params.append('token', getCookie(config.cookie_name));
        params.append('board_id', props.match.params.id);
        params.append('title', card.title);
        params.append('description', card.description);
        params.append('type', laneId);
        callAPI('addCard', params, res => {
            if (res.success) {
                console.log(1);
            }
        })
    }

    function handleCardDelete(cardId, laneId) {
        let params = new FormData();
        params.append('token', getCookie(config.cookie_name));
        params.append('card_id', cardId);
        callAPI('deleteCard', params, res => {
            if (res.success) {
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
                setShowEditBoardModal(false);
                setBoardName(newBoardName);
            }
        });
    }

    function handleMoveCard(fromLaneId, toLaneId, cardId, index) {
        console.log(fromLaneId);
        console.log(toLaneId);
        console.log(cardId);
        console.log(index);
    }

    function handleCardClick(cardId, metadata, laneId) {
        const params = new FormData();
        params.append('token', getCookie(config.cookie_name));
        params.append('card_id', cardId);
        callAPI('getCard', params, res => {
            if (res.success && res.data.length > 0) {
                setShowEditCardModal(true);
                const gotCard = {
                    id: res.data[0].id,
                    title: res.data[0].title,
                    description: res.data[0].description
                };

                setEditingCard(gotCard);
            }
        });
    }

    function handleSaveCard(cardId) {
        const params = new FormData();
        params.append('token', getCookie(config.cookie_name));
        params.append('card_id', cardId);
        params.append('title', editingCard.title);
        params.append('description', editingCard.description);

        callAPI('updateCard', params, res => {
            if (res.success) {

                //update board data
                let newData = initData;
                for (let lane of data.lanes) {
                    for (let card of lane.cards) {
                        if (card.id === res.data.id) {
                            newData.lanes.find(col => col.id === lane.id).cards.push(res.data);
                        }else{
                            newData.lanes.find(col => col.id === lane.id).cards.push(card);
                        }
                    }
                }
                setData(newData);
                setShowEditCardModal(false);
            }
        });
    }

    function handleChangeCardTitle(newTitle) {
        setEditingCard({
            id: editingCard.id,
            title: newTitle,
            description: editingCard.description
        });
    }

    function handleChangeCardDescription(newDes) {
        setEditingCard({
            id: editingCard.id,
            title: editingCard.title,
            description: newDes
        });
    }

    function HelperTooltip() {
        return (<>
            {['top'].map((placement) => (
                <OverlayTrigger
                    key='top'
                    placement='top'
                    overlay={
                        <Tooltip id={`tooltip-'top`}>
                            Enter "All": Share for all users. <br/>
                            Each line for one email to share.
                        </Tooltip>
                    }
                >
                    <FontAwesomeIcon icon={faInfoCircle}/>
                </OverlayTrigger>
            ))}
        </>);
    }

    function handleShare() {
        const params = new FormData();
        params.append('token', getCookie(config.cookie_name));
        params.append('board_id', props.match.params.id);
        callAPI('getsharedEmails', params, res => {
            //console.log(res);
            if (res.success) {
                setSharedEmail(res.data);

                setShowShareBoardModal(true);
            }
        })
    }

    function handleSubmitShare() {
        let params = new FormData();
        params.append('token', getCookie(config.cookie_name));
        params.append('board_id', props.match.params.id);
        params.append('emails', sharedEmail);
        callAPI('shareBoard', params, res => {
            //console.log(res);
            if (res.success) {
                console.log(1);
            }

            setShowShareBoardModal(false);
        })
    }

    function HelperBoard() {
        return (
            <Board
                cardDraggable={true}
                laneDraggable={false}
                draggable={true}
                editable={true}
                onCardAdd={handleCardAdd}
                onCardDelete={handleCardDelete}
                onCardMoveAcrossLanes={handleMoveCard}
                onCardClick={handleCardClick}
                style={{backgroundColor: 'white'}}
                data={data}
                onDataChange={() => {
                    //console.log(data)
                }}
            />
        )
    }

    if (logined) {
        return (
            <Container fluid>
                <Header/>
                <div style={{margin: "20px 30px"}}>
                    <div>
                        <span style={{fontSize: "30px"}}>{boardName}</span>
                        <Button style={{margin: "10px 0 20px 30px"}} variant="link" onClick={() => {
                            setShowEditBoardModal(true)
                        }}>Edit</Button>
                        <Button style={{fontSize: "10px", margin: "10px 0 20px 30px"}} variant="outline-primary"
                                onClick={handleShare}>
                            Share board
                        </Button>
                    </div>

                    <Row>
                        <HelperBoard/>
                    </Row>
                </div>

                <Modal show={showEditBoardModal} onHide={() => {
                    setShowEditBoardModal(false)
                }} animation={false}>
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
                        <Button variant="secondary" onClick={() => {
                            setShowEditBoardModal(false)
                        }}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => handleSaveBoard()}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showEditCardModal} onHide={() => {
                    setShowEditCardModal(false)
                }} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit card</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group controlId="cardtitle">
                            <Form.Label>Card title</Form.Label>
                            <Form.Control type="text" value={editingCard.title} onChange={e => {
                                handleChangeCardTitle(e.target.value)
                            }}/>
                        </Form.Group>
                        <Form.Group controlId="carddescription">
                            <Form.Label>Card description</Form.Label>
                            <Form.Control type="text" value={editingCard.description} onChange={e => {
                                handleChangeCardDescription(e.target.value)
                            }}/>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => {
                            setShowEditCardModal(false)
                        }}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => handleSaveCard(editingCard.id)}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showShareBoardModal} onHide={() => {
                    setShowShareBoardModal(false)
                }} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Share board with</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group controlId="shareEmail">
                            <Form.Label>
                                Enter email you want to share this board
                            </Form.Label>
                            <HelperTooltip/>
                            <Form.Control as="textarea" type="text" rows="7" value={sharedEmail} onChange={(e) => setSharedEmail(e.target.value)}/>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => {
                            setShowShareBoardModal(false)
                        }}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleSubmitShare}>
                            Submit
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        );
    } else {
        return (
            <Redirect to="/login"/>
        )
    }
}

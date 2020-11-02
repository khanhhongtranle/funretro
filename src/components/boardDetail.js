import {callAPI, getCookie, quickCheckToken} from "../helpers/api";
import { Redirect} from 'react-router-dom';
import {Container, Row, Button} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {config} from "../config";
import Header from "./header";
import Board, { moveCard, addColumn } from "@lourenci/react-kanban";
import "@lourenci/react-kanban/dist/styles.css";

const board = {
    columns: [
        {
            id: 1,
            title: "Went Well",
            cards: [

            ]
        },
        {
            id: 2,
            title: "To Improve",
            cards: [

            ]
        },
        {
            id: 3,
            title: "Action Items",
            cards: [

            ]
        },
    ]
};

function BoardDetail() {
    const logined = quickCheckToken();
    const [detail, setDetail] = useState([]);

    useEffect(() => {
        let mounted = true;

        const params = new FormData();
        params.append('token', getCookie(config.cookie_name));
        //params.append('board_id', getCookie(config.cookie_user_id));

        callAPI('getBoardDetail', params, function (res) {
            if (res.success) {
                let board_detail = board;
                for (let d of res.data ) {
                    if (d.type === 'went well') {
                        let objectCard = {
                            id: d.id,
                            title: d.description,
                            description: d.description,
                        };
                        board_detail.columns[0].cards.push(objectCard);
                    } else if (d.type === 'to improve') {
                        let objectCard = {
                            id: d.id,
                            title: d.description,
                            description: d.description,
                        };
                        board_detail.columns[1].cards.push(objectCard);
                    } else if (d.type === 'action items') {
                        let objectCard = {
                            id: d.id,
                            title: d.description,
                            description: d.description,
                        };
                        board_detail.columns[2].cards.push(objectCard);
                    }
                }
                if (mounted) {
                    setDetail(board_detail);
                }
            }
        });

        return () => {
            mounted = false;
        };

    },[detail]);


    function UncontrolledBoard() {
        return (
            <Board
                allowRemoveLane
                allowRenameColumn
                allowRemoveCard
                onLaneRemove={console.log}
                onCardRemove={console.log}
                onLaneRename={console.log}
                initialBoard={board}
                allowAddCard={{ on: "top" }}
                onNewCardConfirm={draftCard => ({
                    id: new Date().getTime(),
                    ...draftCard
                })}
                onCardNew={console.log}
            />
        );
    }
    
    if (logined) {
        return (
            <Container fluid>
                <Header />
                <div style={{margin:"20px 30px"}}>
                    <div>
                        <span style={{fontSize: "30px"}}>Board's Name</span>
                        <Button style={{fontSize: "10px", margin: "10px 0 20px 30px"}} variant="outline-primary">Share board</Button>
                    </div>

                    <Row>
                        <UncontrolledBoard />
                    </Row>
                </div>
            </Container>
        );
    } else {
        return (<Redirect to="/login"/>);
    }
}

export default BoardDetail;

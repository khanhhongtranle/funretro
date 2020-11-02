import {callAPI, checkTokenValid, getCookie, quickCheckToken, setCookie} from "../helpers/api";
import {BrowserRouter, Redirect} from 'react-router-dom';
import {Container, Row, Col, Card, Navbar, Nav, Button} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {config} from "../config";
import Header from "./header";
import Board, { moveCard } from "@lourenci/react-kanban";
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

function BoardDetail() {
    const logined = quickCheckToken();
    const [detail, setDetail] = useState([]);

    useEffect(() => {
        // let mounted = true;
        //
        // const params = new FormData();
        // params.append('token', getCookie(config.cookie_name));
        // params.append('board_id', getCookie(config.cookie_user_id));
        //
        // callAPI('getBoards', params, function (res) {
        //     if (res.success) {
        //         console.log(res);
        //         if (mounted) {
        //             //setBoards(res.data);
        //         }
        //     }
        // });
        //
        // return () => {
        //     mounted = false;
        // };

    },[]);

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

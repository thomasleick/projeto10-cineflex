import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled from "styled-components"
import HomePage from "./pages/HomePage/HomePage"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"

export default function App() {
    return (
        <>
            <NavContainer>CINEFLEX</NavContainer>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/assentos/:id" element={<SeatsPage />} />
                    <Route path="/sessoes/:id" element={<SessionsPage />} />
                    <Route path="/aaa/" element={<SuccessPage />} />
                </Routes>
            </Router>
        </>
      );
    }

const NavContainer = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #C3CFD9;
    color: #E8833A;
    font-family: 'Roboto', sans-serif;
    font-size: 34px;
    position: fixed;
    top: 0;
    a {
        text-decoration: none;
        color: #E8833A;
    }
`

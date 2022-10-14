import { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import GlobalStyle from "./assets/css/GlobalStyle"
import NavBar from "./components/NavBar/NavBar"
import HomePage from "./pages/HomePage/HomePage"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"

export default function App() {
    const [successInfo, setSuccessInfo] = useState(undefined)

    return (
        <BrowserRouter>
            <GlobalStyle />
            <NavBar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/sessoes/:movieId" element={<SessionsPage />} />
                <Route path="/assentos/:sessionId" element={<SeatsPage setSuccessInfo={setSuccessInfo} />} />
                <Route path="/sucesso" element={<SuccessPage successInfo={successInfo} />} />
            </Routes>
        </BrowserRouter>
    )
}
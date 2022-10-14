import { useEffect, useState } from "react"
import axios from "axios"
import styled from "styled-components"
import { useParams } from "react-router-dom"
import { textColor } from "../../constants/colors"
import MovieFooter from "../../components/MovieFooter/MovieFooter"
import Seat from "../../components/Seat/Seat"
import BuyerForm from "./BuyerForm"
import { BASE_URL } from "../../constants/urls"
import SeatsCaption from "./SeatsCaption"

export default function SeatsPage({ setSuccessInfo }) {
    const [session, setSession] = useState(undefined)
    const [selectedSeats, setSelectedSeats] = useState([])
    const { sessionId } = useParams()

    useEffect(() => {
        axios.get(`${BASE_URL}/showtimes/${sessionId}/seats`)
            .then((res) => setSession(res.data))
            .catch((err) => console.log(err.response.data))
    }, [sessionId])

    function handleSeat(seat) {
        if (!seat.isAvailable) {
            alert("Assento não está disponível")
        } else {
            const isSelected = selectedSeats.some((s) => s.id === seat.id)

            if (isSelected) {
                const newList = selectedSeats.filter((s) => s.id !== seat.id)
                setSelectedSeats(newList)
            } else {
                setSelectedSeats([...selectedSeats, seat])
            }
        }
    }

    if (!session) {
        return <div>Carregando...</div>
    }

    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>
                {session.seats.map((seat) => (
                    <Seat
                        key={seat.id}
                        seat={seat}
                        isSelected={selectedSeats.some((s) => seat.id === s.id)}
                        handleSeat={handleSeat}
                    />
                ))}
            </SeatsContainer>

            <SeatsCaption />

            <BuyerForm 
                selectedSeats={selectedSeats} 
                session={session}
                setSuccessInfo={setSuccessInfo}
            />

            <MovieFooter
                title={session.movie.title}
                poster={session.movie.posterURL}
                weekday={session.day.weekday}
                hour={session.name}
            />
        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: ${textColor};
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
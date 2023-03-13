import { useLocation, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { useEffect, useState } from "react"
import { useReserveSeat } from "../../APIs"

export default function SuccessPage() {
    const location = useLocation()
    const state = location.state
    const [params, setParams] = useState({})
    const nav = useNavigate()

    useEffect(() => {
        const ids = []
        state.seats.map(seat => ids.push(seat.id))
        const newParams = { 
            "ids": ids,
            "compradores": state.seatsInfo
        }
        setParams(newParams)
    }, [state.seats, state.seatsInfo])

    const { data, fetchError, isLoading } = useReserveSeat(params)

    return (
        
        <PageContainer>
            {isLoading && <StatusMsg><p>Efetuando a compra...</p></StatusMsg>}
            {!isLoading && fetchError && <StatusMsg><p style={{ color: "red" }}>{fetchError}</p></StatusMsg>}
            {!isLoading && !fetchError && (data === "OK!" ?
            <> 
                <h1>Pedido feito <br /> com sucesso!</h1>

                <TextContainer data-test="movie-info">
                    <strong><p>Filme e sessão</p></strong>
                    <p>{state.movieInfo.title}</p>
                    <p>{`${state.movieInfo.date} - ${state.movieInfo.time}`}</p>
                </TextContainer>

                <TextContainer data-test="seats-info">
                    <strong><p>Ingressos</p></strong>
                    {state.seats.map(seat => <p key={`seat${seat.id}`}>Assento {seat.number}</p>)}
                </TextContainer>

                <TextContainer data-test="client-info">
                    <strong><p>{state.seats.length > 1 ? "Compradores" : "Comprador"}</p></strong>
                    {state.seatsInfo.map((seat, id) => 
                        <div key={`seatInfo${seat.idAssento}`}>
                            <p>{`Nome: ${seat.nome} - Assento ${state.seats[id].number}`}</p>
                            <p>{`CPF: ${seat.cpf}`}</p>
                            <br />
                        </div>
                    )}
                </TextContainer>

                <button data-test="go-home-btn" onClick={() => nav(`/`)}>Voltar para Home</button>
            </>
            :
            <StatusMsg><p>Algum erro aconteceu...</p></StatusMsg>)}
        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    color: #293845;
    margin: 30px 20px;
    padding-bottom: 120px;
    padding-top: 70px;
    a {
        text-decoration: none;
    }
    button {
        margin-top: 50px;
    }
    h1 {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #247A6B;
    }
`
const TextContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 30px;
    strong {
        font-weight: bold;
        margin-bottom: 10px;
    }
`
const StatusMsg = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    p {
        font-weight: 700
    }
`
import { useLocation } from "react-router-dom"
import styled from "styled-components"

export default function SuccessPage() {

    const location = useLocation()
    const state = location.state
    console.log(state)

    return (
        <PageContainer>
            <h1>Pedido feito <br /> com sucesso!</h1>

            <TextContainer>
                <strong><p>Filme e sessão</p></strong>
                <p>{state.movieInfo.title}</p>
                <p>{`${state.movieInfo.date} - ${state.movieInfo.time}`}</p>
            </TextContainer>

            <TextContainer>
                <strong><p>Ingressos</p></strong>
                {state.seats.map(seat => <p key={`seat${seat.id}`}>Assento {seat.number}</p>)}
            </TextContainer>

            <TextContainer>
                <strong><p>{state.seats.length > 1 ? "Compradores" : "Comprador"}</p></strong>
                {state.seatsInfo.map((seat, id) => 
                    <div key={`seatInfo${seat.idAssento}`}>
                        <p>{`Nome: ${seat.nome} - Assento ${state.seats[id].number}`}</p>
                        <p>{`CPF: ${seat.cpf}`}</p>
                        <br />
                    </div>
                )}
            </TextContainer>

            <button>Voltar para Home</button>
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
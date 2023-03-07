import { useState } from "react"
import { useParams, useLocation } from "react-router-dom"
import styled from "styled-components"
import { useGetSeatList } from "../../APIs"

export default function SeatsPage() {
    const params = useParams()
    const location = useLocation()
    const state = location.state
    const { data, fetchError, isLoading } = useGetSeatList(params.id)
    const [seats, setSeats] = useState([])
    
    const addSeat = (id, name) => {
        const newSeats = [...seats, { "id": id, "number": name }]
        setSeats(newSeats)
    }

    const removeSeat = (id, name) => {
        const newSeats = [...seats]
        let index = -1;
        newSeats.some((e, i) => {
            if (e.id === id)
                return (index = i)
        })
        if (index > -1) {
            newSeats.splice(index, 1)
        }
        setSeats(newSeats)
    }

    //console.log(data)
    console.log(seats)

    return (
        <PageContainer>
            {isLoading && <StatusMsg><p>Carregando horários...</p></StatusMsg>}
            {!isLoading && fetchError && <StatusMsg><p style={{ color: "red" }}>{fetchError}</p></StatusMsg>}
            {!isLoading && !fetchError && (data?.seats?.length ? 
                <>
                    Selecione o(s) assento(s)

                    <SeatsContainer>
                        {data.seats.map(seat => <SeatItem 
                            key={seat.id}
                            status={seats.some(e => e.id === seat.id) ? 2 : seat.isAvailable ? 1 : 0}
                            onClick={seats.some(e => e.id === seat.id) ? () => removeSeat(seat.id, seat.name) : () => addSeat(seat.id, seat.name)}
                        >
                            {seat.name}
                        </SeatItem>)}
                    </SeatsContainer>

                    <CaptionContainer>
                        <CaptionItem>
                            <CaptionCircle status={2}/>
                            Selecionado
                        </CaptionItem>
                        <CaptionItem>
                            <CaptionCircle status={1}/>
                            Disponível
                        </CaptionItem>
                        <CaptionItem>
                            <CaptionCircle status={0}/>
                            Indisponível
                        </CaptionItem>
                    </CaptionContainer>

                    
                    {seats?.length > 0 ? 
                        <FormContainer>
                            {seats.map(seat => { 
                                console.log(seat)
                                return (
                                    <div key={`form${seat.id}`}>
                                        <h1>{`Assento ${seat.number}`}</h1>
                                        <br /> 
                                        Nome do Comprador:
                                        <input placeholder="Digite seu nome..." />

                                        CPF do Comprador:
                                        <input placeholder="Digite seu CPF..." />
                                    </div>
                                )
                            })}
                            <button>Reservar Assento(s)</button>
                        </FormContainer>    
                    :
                        <StatusMsg><br /><br /><br /><br /><p>Escolha sua(s) poltrona(s)</p></StatusMsg>
                    }
                    
                </>
            : 
            <StatusMsg><p>Não existem dados sobre esta sessão...</p></StatusMsg>)}
    
            <FooterContainer>
                <div>
                    <img src={state.url} alt="poster" />
                </div>
                <div>
                    <p>{state.title}</p>
                    <p>{`${state.weekday} - ${state.time}`}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const colors = [
    {
        borders: "#F7C52B",
        background: "#FBE192"
    },
    {
        borders: "#808F9D",
        background: "#C3CFD9"
    },
    {
        borders: "#0E7D71",
        background: "#1AAE9E"
    }
]

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.div`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
    h1 {
        font-weight: 700
    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircle = styled.div`
    border: 1px solid ${props => colors[props.status].borders};
    background-color: ${props => colors[props.status].background};
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`
const SeatItem = styled.div`
    border: 1px solid ${props => colors[props.status].borders};
    background-color: ${props => colors[props.status].background};
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
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
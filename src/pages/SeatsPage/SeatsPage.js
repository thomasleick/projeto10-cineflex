import { useState } from "react"
import { useParams, useLocation, Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { useGetSeatList } from "../../APIs"
import * as url from "../../images/back.svg"

export default function SeatsPage() {
    const nav = useNavigate()
    const params = useParams()
    const location = useLocation()
    const state = location.state
    const { data, fetchError, isLoading } = useGetSeatList(params.id)
    const [seats, setSeats] = useState([])
    const [seatsInfo, setSeatsInfo] = useState([])
    const selected = 2
    const avaible = 1
    const unavaible = 0
    
    const addSeat = (id, name) => {
        const newSeats = [...seats, { "id": id, "number": name }]
        const newSeatsInfo = [...seatsInfo, { "idAssento": id, "nome": "", "cpf": "" }]
        if (newSeats.length > 1) {
            newSeats.sort((a, b) => a.id - b.id);
            newSeatsInfo.sort((a, b) => a.idAssento - b.idAssento)
            }
        setSeats(newSeats)
        setSeatsInfo(newSeatsInfo)
    }

    const removeSeat = (id, name) => {

        if (!window.confirm(`Você realmente deseja desmarcar o assento ${name} e apagar todos os dados fornecidos para ele?`))
            return 0

        const newSeats = [...seats]
        const newSeatsInfo = [...seatsInfo]
        let index = -1;
        newSeats.some((e, i) => {
            if (e.id === id) {
                index = i
                return true
            }
            return false
        })
        if (index > -1) {
            newSeats.splice(index, 1)
            newSeatsInfo.splice(index, 1)
        }
        setSeats(newSeats)
        setSeatsInfo(newSeatsInfo)
    }

    const handleChange = (value, prop, index) => {
        const newSeatsInfo = [...seatsInfo]
        newSeatsInfo[index][prop] = value
        setSeatsInfo(newSeatsInfo)
    }

    return (
        <PageContainer>
            {isLoading && <StatusMsg><p>Carregando horários...</p></StatusMsg>}
            {!isLoading && fetchError && <StatusMsg><p style={{ color: "red" }}>{fetchError}</p></StatusMsg>}
            {!isLoading && !fetchError && (data?.seats?.length ? 
                <>
                    <Img src={url.default} onClick={() => nav(-1)} data-test="go-home-header-btn" />
                    Selecione o(s) assento(s)

                    <SeatsContainer>
                        {data.seats.map(seat => <SeatItem 
                            key={seat.id}
                            data-test="seat"
                            status={seats.some(e => e.id === seat.id) ? selected : seat.isAvailable ? avaible : unavaible}
                            onClick={
                                seat.isAvailable ? 
                                    seats.some(e => e.id === seat.id) ? 
                                        () => removeSeat(seat.id, seat.name) 
                                    : 
                                        () => addSeat(seat.id, seat.name) 
                                : 
                                    () => window.alert("Esse assento não está disponível.")
                                }
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
                            {seats.map((seat, index) => { 
                                return (
                                    <div key={`form${seat.id}`}>
                                        <h1>{`Assento ${seat.number}`}</h1>
                                        <br /> 
                                        Nome:
                                        <input
                                            data-test="client-name" 
                                            placeholder="Digite o nome completo..." 
                                            onChange={(e) => handleChange(e.target.value, "nome", index)}
                                        />

                                        CPF:
                                        <input 
                                            data-test="client-cpf"
                                            placeholder="Digite o CPF..." 
                                            onChange={(e) => handleChange(e.target.value, "cpf", index)}
                                        />
                                    </div>
                                )
                            })}
                            <Link
                                data-test="book-seat-btn"
                                to={"/sucesso"} 
                                state={{"movieInfo": state, "seatsInfo": seatsInfo, "seats": seats}} 
                                style={linkStyle}
                            >
                                <button>Reservar Assento(s)</button>
                            </Link>
                        </FormContainer>    
                    :
                        <StatusMsg><br /><br /><br /><br /><p>Escolha sua(s) poltrona(s)</p></StatusMsg>
                    }
                    
                </>
            : 
            <StatusMsg><p>Não existem dados sobre esta sessão...</p></StatusMsg>)}
    
            <FooterContainer data-test="footer">
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

const linkStyle = {
    textDecoration: "none"
}

const Img = styled.img`
    position: fixed;
    top: 20px;
    left: 12px;
    width: 24px;
    height: 24px;
`
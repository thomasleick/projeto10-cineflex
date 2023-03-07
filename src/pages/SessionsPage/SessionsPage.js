import styled from "styled-components"
import { useLocation, useParams, Link } from "react-router-dom"
import { useGetMovieSchedule } from "../../APIs"

export default function SessionsPage(props) {

    const location = useLocation()
    const state = location.state
    const { id } = useParams()
    const { data, fetchError, isLoading } = useGetMovieSchedule(id)
    //console.log(data.days)

    return (
        <PageContainer>
            {isLoading && <StatusMsg><p>Carregando horários...</p></StatusMsg>}
            {!isLoading && fetchError && <StatusMsg><p style={{ color: "red" }}>{fetchError}</p></StatusMsg>}
            {!isLoading && !fetchError && (data?.days?.length ? 
                <>
                    Selecione o horário
                    
                    {data.days.map(day =>
                        <SessionContainer key={day.id}>
                            {`${day.weekday} - ${day.date}`}
                            <ButtonsContainer>
                                {day.showtimes.map(session => <Link to={`/assentos/${session.id}`}><button key={session.id}>{session.name}</button></Link>)}
                            </ButtonsContainer>
                        </SessionContainer>
                    )}
                    
                </>
            : 
            <p className="statusMsg">Não há horários disponíveis...</p>)}
           
            <FooterContainer>
                <div>
                    <img src={state.url} alt="poster" />
                </div>
                <div>
                    <p>{state.title}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
    div {
        margin-top: 20px;
    }
`
const SessionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-family: 'Roboto';
    font-size: 20px;
    color: #293845;
    padding: 0 20px;
`
const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px 0;
    button {
        margin-right: 20px;
    }
    a {
        text-decoration: none;
    }
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
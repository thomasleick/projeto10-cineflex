import { Link } from "react-router-dom"
import styled from "styled-components"
import { textColor } from "../../constants/colors"

export default function SessionCard({ movie }) {
    return (
        <SessionContainer>
            {movie.weekday} - {movie.date}
            <ButtonsContainer>
                {movie.showtimes.map((t) => (
                    <Link to={`/assentos/${t.id}`} key={t.id}>
                        <button>{t.name}</button>
                    </Link>
                ))}
            </ButtonsContainer>
        </SessionContainer>
    )
}

const SessionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-family: 'Roboto';
    font-size: 20px;
    color: ${textColor};
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
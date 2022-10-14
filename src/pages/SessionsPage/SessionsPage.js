import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import MovieFooter from "../../components/MovieFooter/MovieFooter"
import SessionCard from "../../components/SessionCard/SessionCard"
import { textColor } from "../../constants/colors"
import { BASE_URL } from "../../constants/urls"

export default function SessionsPage() {
    const [movie, setMovie] = useState({})
    const { movieId } = useParams()

    useEffect(() => {
        axios.get(`${BASE_URL}/movies/${movieId}/showtimes`)
            .then((res) => setMovie(res.data))
            .catch((err) => console.log(err.response.data))
    }, [movieId])

    if (!movie) {
        return <div>Carregando...</div>
    }

    return (
        <PageContainer>
            Selecione o horário
            <ListContainer>
                {movie.days && movie.days.map((m) => (
                    <SessionCard key={m.id} movie={m} />
                ))}
            </ListContainer>
            <MovieFooter poster={movie.posterURL} title={movie.title} />
        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: ${textColor};
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const ListContainer = styled.div`
    margin-top: 30px;
`
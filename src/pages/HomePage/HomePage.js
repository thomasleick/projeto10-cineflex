import { useState, useEffect } from "react"
import axios from "axios"
import styled from "styled-components"
import { Link } from "react-router-dom"
import MovieCard from "../../components/MovieCard/MovieCard"
import { textColor } from "../../constants/colors"
import { BASE_URL } from "../../constants/urls"

export default function HomePage() {
    const [movies, setMovies] = useState(undefined)

    useEffect(() => {
        axios.get(`${BASE_URL}/movies`)
            .then((res) => setMovies(res.data))
            .catch((err) => console.log(err.response.data))
    }, [])

    if (!movies) {
        return <div>Carregando...</div>
    }

    return (
        <PageContainer>
            Selecione o filme
            <ListContainer>
                {movies.map((m) => (
                    <Link to={`/sessoes/${m.id}`} key={m.id} data-test="movie">
                        <MovieCard posterURL={m.posterURL} />
                    </Link>
                ))}
            </ListContainer>
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
    padding-top: 70px;
`
const ListContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    padding: 10px;
`
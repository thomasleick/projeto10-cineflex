import styled from "styled-components"
import MovieComponent from './MovieComponent'
import { useGetMovies } from '../../APIs'

export default function HomePage() {
    const { data, fetchError, isLoading } = useGetMovies()

    return (
        <PageContainer>
            {isLoading && <StatusMsg><p>Carregando filmes...</p></StatusMsg>}
            {!isLoading && fetchError && <StatusMsg><p style={{ color: "red" }}>{fetchError}</p></StatusMsg>}
            {!isLoading && !fetchError && (data?.length ? 
                <>
                    Selecione o filme
                    <ListContainer>
                        {data.map(movie => 
                            <MovieComponent 
                                id={movie.id} 
                                posterURL={movie.posterURL} 
                                title={movie.title} 
                                key={`Movie ${movie.id}`}
                                data-test="movie"
                            />
                        )}
                    </ListContainer>
                </>
            : 
            <StatusMsg><p>Não há filmes disponíveis...</p></StatusMsg>)}
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
    color: #293845;
    margin-top: 30px;
    padding-top: 70px;
`
const ListContainer = styled.div`
    width: 330px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    padding: 10px;
`
const StatusMsg = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    p {
        font-weight: 700
    }
`
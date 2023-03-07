import styled from "styled-components"
import MovieComponent from './MovieComponent'
import useAxiosFetch from '../../hooks/useAxiosFetch'

export default function HomePage() {
    const { data, fetchError, isLoading } = useAxiosFetch("https://mock-api.driven.com.br/api/v8/cineflex/movies")
    return (
        <PageContainer>
            {isLoading && <StatusMsg><p>Carregando filmes...</p></StatusMsg>}
            {!isLoading && fetchError && <p className="statusMsg" style={{ color: "red" }}>{fetchError}</p>}
            {!isLoading && !fetchError && (data.length ? 
                <>
                    Selecione o filme
                    <ListContainer>
                        {data.map(movie => <MovieComponent id={movie.id} posterURL={movie.posterURL} key={`Movie ${movie.id}`}/>)}
                    </ListContainer>
                </>
            : 
                <p className="statusMsg">Não há filmes disponíveis...</p>)}
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
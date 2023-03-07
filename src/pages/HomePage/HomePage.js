import styled from "styled-components"
import MovieComponent from './MovieComponent'
import useAxiosFetch from '../../hooks/useAxiosFetch'

export default function HomePage() {
    const { data, fetchError, isLoading } = useAxiosFetch("https://mock-api.driven.com.br/api/v8/cineflex/movies")
    return (
        <PageContainer>
            Selecione o filme

            <ListContainer>
                {data.map(movie => <MovieComponent movie={movie} />)}
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
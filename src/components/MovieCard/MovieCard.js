import styled from "styled-components"

export default function MovieCard({posterURL}) {
    return (
        <MovieContainer>
            <MovieImage src={posterURL} />
        </MovieContainer>
    )
}

const MovieContainer = styled.div`
    width: 145px;
    height: 210px;
    box-shadow: 0px 2px 4px 2px #0000001A;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
`
const MovieImage = styled.img`
    width: 130px;
    height: 190px;

`
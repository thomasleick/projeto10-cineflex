import styled from "styled-components"
import { baseColor } from "../../constants/colors"

export default function MovieFooter({ poster, title, weekday, hour }) {
    return (
        <Footer data-test="footer">
            <PosterContainer>
                <Poster src={poster} alt="poster" />
            </PosterContainer>
            <TitleContainer>
                <p>{title}</p>
                {weekday && hour && <p>{weekday} - {hour}</p>}
            </TitleContainer>
        </Footer>
    )
}

const Footer = styled.div`
    width: 100%;
    height: 120px;
    background-color: ${baseColor};
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;
`
const PosterContainer = styled.div`
    box-shadow: 0px 2px 4px 2px #0000001A;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    margin: 12px;
`
const Poster = styled.img`
    width: 50px;
    height: 70px;
    padding: 8px;
`
const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    p:nth-child(2) {
        margin-top: 10px;
    }
`
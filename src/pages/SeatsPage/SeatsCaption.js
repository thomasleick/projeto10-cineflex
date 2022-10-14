import styled from "styled-components"
import { seatColors } from "../../constants/colors"

export default function SeatsCaption() {
    return (
        <CaptionContainer>
            <CaptionItem>
                <CaptionCircle status="selected" />
                Selecionado
            </CaptionItem>
            <CaptionItem>
                <CaptionCircle status="available" />
                Disponível
            </CaptionItem>
            <CaptionItem>
                <CaptionCircle status="unavailable" />
                Indisponível
            </CaptionItem>
        </CaptionContainer>
    )
}

const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 70%;
    justify-content: space-between;
    margin: 10px;
`
const CaptionCircle = styled.div`
    border: 1px solid ${props => seatColors[props.status].border};
    background-color: ${props => seatColors[props.status].background};
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
    cursor: ${props => props.status === "unavailable" ? "none" : "pointer"};
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`
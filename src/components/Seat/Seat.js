import { useEffect, useState } from "react"
import styled from "styled-components"
import { seatColors } from "../../constants/colors"

export default function Seat({ seat, handleSeat, isSelected }) {
    const [status, setStatus] = useState("available")

    useEffect(() => {
        if (isSelected) {
            setStatus("selected")
        } else if (seat.isAvailable) {
            setStatus("available")
        } else {
            setStatus("unavailable")
        }
    }, [isSelected, seat])

    return (
        <SeatItem status={status} onClick={() => handleSeat(seat)}>
            {seat.name}
        </SeatItem>
    )
}

const SeatItem = styled.div`
    border: 1px solid ${props => seatColors[props.status].border};
    background-color: ${props => seatColors[props.status].background};
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
    cursor: ${props => props.status === "unavailable" ? "none" : "pointer"};
`
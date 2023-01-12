import styled from "styled-components"
import { useNavigate, } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { BASE_URL } from "../../constants/urls"

export default function BuyerForm({ selectedSeats, setSuccessInfo, session }) {
    const [form, setForm] = useState({ name: "", cpf: "" })
    const [disableButton, setDisableButton] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        if (form.name && form.cpf && selectedSeats.length > 0){
            setDisableButton(false)
        } else {
            setDisableButton(true)
        }
    }, [form, selectedSeats])

    function handleForm(e) {
        const { value, name } = e.target
        setForm({ ...form, [name]: value })
    }

    function buyTickets(e) {
        e.preventDefault()
        const ids = selectedSeats.map((s) => s.id)
        const body = { ...form, ids }

        axios.post(`${BASE_URL}/seats/book-many`, body)
            .then(() => {
                const info = {
                    movie: session.movie.title,
                    date: session.day.date,
                    hour: session.name,
                    buyer: form.name,
                    cpf: form.cpf,
                    seats: selectedSeats.map(s => s.name)
                }
                setSuccessInfo(info)
                navigate("/sucesso")
            })
            .catch((err) => console.log(err))
    }

    return (
        <Form onSubmit={buyTickets}>
            Nome do Comprador:
            <input
                name="name"
                value={form.name}
                onChange={handleForm}
                placeholder="Digite seu nome..."
                type="text"
                data-test="client-name"
            />

            CPF do Comprador:
            <input
                name="cpf"
                value={form.cpf}
                onChange={handleForm}
                placeholder="Digite seu CPF..."
                type="number"
                data-test="client-cpf"
            />
            <button disabled={disableButton} type="submit" data-test="book-seat-btn">Reservar Assento(s)</button>
        </Form>
    )
}

const Form = styled.form`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`
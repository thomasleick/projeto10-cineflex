import axios from "axios"

const getMovies = async () => {
    try {
        const response = await axios.get("https://mock-api.driven.com.br/api/v8/cineflex/movies")
        console.log(response)
        return response
    }
    catch (err) {
        console.log(err)
        return err
    }
}

const getMovieSchedule = async (id) => {
    try {
        const response = await axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/movies/${id}/showtimes`)
        console.log(response)
        return response
    }
    catch (err) {
        console.log(err)
        return err
    }
}

const getSeatList = async (id) => {
    try {
        const response = await axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${id}/seats`)
        console.log(response)
        return response
    }
    catch (err) {
        console.log(err)
        return err
    }
}

const reserveSeat = async (ids, name, cpf) => {

    const seats = [ ...ids ]

    const params = { ids: seats, name: `${name}`, cpf: `${cpf}` }

    console.log(params)

    try {
        const response = await axios.post("https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many", params)
        console.log(response)
        return response
    }
    catch (err) {
        console.log(err)
        return err
    }
}

export default { getMovies, getMovieSchedule, getSeatList, reserveSeat }
import axios from "axios"

const getMovies = async () => {
    try {
        const response = await axios.get("https://mock-api.driven.com.br/api/v8/cineflex/movies")
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
        return response
    }
    catch (err) {
        console.log(err)
        return err
    }
}

const reserveSeat = async (req) => {

    const params = {
        ids: `${req.ids}`,
        name: `${req.name}`,
        cpf: `${req.cpf}`
    }

    try {
        const response = await axios.post("https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many", params)
        return response
    }
    catch (err) {
        console.log(err)
        return err
    }
}

export default { getMovies, getMovieSchedule, getSeatList, reserveSeat }
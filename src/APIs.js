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
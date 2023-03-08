import useAxiosFetch from './hooks/useAxiosFetch'
import axios from 'axios'


const useGetMovies = () => {
    const { data, fetchError, isLoading } = useAxiosFetch("https://mock-api.driven.com.br/api/v8/cineflex/movies", true)
    return { data, fetchError, isLoading }
}

const useGetMovieSchedule = (id) => {
    const { data, fetchError, isLoading } = useAxiosFetch(`https://mock-api.driven.com.br/api/v8/cineflex/movies/${id}/showtimes`, true)
    return { data, fetchError, isLoading }
}

const useGetSeatList = (id) => {
    const { data, fetchError, isLoading } = useAxiosFetch(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${id}/seats`, true)
    return { data, fetchError, isLoading }
}

const useReserveSeat = (params) => {
    const { data, fetchError, isLoading } = useAxiosFetch("https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many", false, params)
    return { data, fetchError, isLoading }

/*     try {
        const response = await axios.post("https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many", params)
        console.log(response)
        return response
    }
    catch (err) {
        console.log(err)
        return err
    } */
}

export { useGetMovies, useGetMovieSchedule, useGetSeatList, useReserveSeat }
import { useState, useEffect } from "react";
import axios from "axios";

const useAxiosFetch = (dataUrl, isGet, params) => {
    const [data, setData] = useState([])
    const [fetchError, setFetchError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        let isMounted = true
        const source = axios.CancelToken.source()

        const fetchData = async (url) => {
            setIsLoading(true)
            try {
                let response
                if (isGet) {                
                    response = await axios.get(url, {
                        cancelToken: source.token
                    })
                }
                else {
                    response = await axios.post(url, params, {
                        cancelToken: source.token
                    })
                }
                if (isMounted) {
                    setData(response.data)
                    setFetchError(null)
                }
            } catch (err) {
                if (isMounted) {
                    setFetchError(err.message)
                    setData([])
                }
            } finally {
                isMounted && setIsLoading(false)
            }

        }
    
        fetchData(dataUrl)

        const cleanUp = () => {
            isMounted = false
            source.cancel()
        }

        return cleanUp
    }, [dataUrl, isGet, params])

    return { data, fetchError, isLoading }
}

export default useAxiosFetch
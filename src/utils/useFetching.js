import {useState} from "react";

export const useFetching = (callback) => {
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    const fetching = async () => {
        try {
            setIsError(false)
            setIsLoading(true)
            await callback()
        } catch (e) {
            console.log(e)
            setIsError(true)
        } finally {
            setIsLoading(false)
        }
    }

    return [fetching, isLoading, isError]
}
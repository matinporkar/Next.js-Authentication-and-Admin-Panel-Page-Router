import { useEffect } from "react"
import { clearToken } from "../../../../store/authSlice"
import { useAppDispatch } from "../../.."

export const useVerifyTimeout = (pathname: string) => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(clearToken())
            if (pathname == "/auth/phone/verifyPhone") {
                alert("Timed Out. Please Login Again")
            }
        }, 60000)
        
        return () => clearTimeout(timer)
    }, [])

}
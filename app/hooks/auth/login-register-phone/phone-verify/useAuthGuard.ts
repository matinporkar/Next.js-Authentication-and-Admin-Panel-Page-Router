import Router from "next/router"
import { useEffect } from "react"

export const useAuthGuard = (token: string | null) => {
    useEffect(() => {
        if (!token) {
            Router.replace("/auth/phone/login")
        }
    }, [token])
}
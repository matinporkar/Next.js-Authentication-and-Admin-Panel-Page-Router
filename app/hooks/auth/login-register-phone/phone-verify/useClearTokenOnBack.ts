import Router from "next/router"
import { useEffect } from "react"
import { clearToken } from "../../../../store/authSlice"
import { useAppDispatch } from "../../.."

export const useClearTokenOnBack = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        Router.beforePopState(() => {
            dispatch(clearToken())
            return true
        })
        
        return () => {
            Router.beforePopState(() => true)
        }
    })

}
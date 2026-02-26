import { useRouter } from "next/router";
import { useEffect, ReactNode, useState } from "react";
import { useCookies } from "react-cookie";
import useAuth from "../../hooks/useAuth";

interface Props {
    children: ReactNode;
    mode : "protected" | "publicOnly"
}

export default function AuthLayout({ children , mode }: Props) {

    const router = useRouter();
    const {userData , isLoading } = useAuth()

    useEffect(() => {
        if (isLoading) return

        if (mode==="protected" && !userData) {
            router.replace("/auth/login") 
        }

        if (mode==="publicOnly" && userData) {
            router.replace("/userPanel") 
        }

    }, [userData, isLoading, mode])

    if (isLoading) return null

    return <>{children}</>
}
import { useRouter } from "next/router";
import { useEffect, ReactNode, useState } from "react";
import { useCookies } from "react-cookie";

interface Props {
    children: ReactNode;
    mode : "protected" | "publicOnly"
}

export default function AuthLayout({ children , mode }: Props) {

    const router = useRouter();
    const [checking, setChecking] = useState(true);
    const [cookies] = useCookies(["shop-token"])

    useEffect(() => {
        if (mode==="protected" && !cookies["shop-token"]) {
            router.replace("/auth/login") 
        }

        if (mode==="publicOnly" && cookies["shop-token"]) {
            console.log("llll")
            router.replace("/userPanel") 
        }

        setChecking(false)
    }, [cookies["shop-token"]])

    if (checking) return null

    return <>{children}</>
}
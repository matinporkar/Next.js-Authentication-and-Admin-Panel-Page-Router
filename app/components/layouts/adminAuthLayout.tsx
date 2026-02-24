import { useRouter } from "next/router";
import { useEffect, ReactNode, useState } from "react";
import { useCookies } from "react-cookie";

interface Props {
    children: ReactNode;
}

export default function AdminAuthLayout({ children }: Props) {

    const router = useRouter();
    const [checking, setChecking] = useState(true);
    const [cookies] = useCookies(["admin-token"])

    useEffect(() => {
        if (!cookies["admin-token"]) {
            router.replace("/auth/login") 
        }

        setChecking(false)
    }, [cookies["admin-token"]])

    if (checking) return null

    return <>{children}</>
}
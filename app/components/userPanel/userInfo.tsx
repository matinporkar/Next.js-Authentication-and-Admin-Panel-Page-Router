import { useRouter } from "next/router"
import useAuth from "../../hooks/useAuth"

const UserInfo = () => {

    const { userData } = useAuth()

    const router = useRouter()
    const logOutHandler = async () => {
        await fetch("/api/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
        router.replace("/")
    }

    return (
        <>
            <h1>userName : {userData?.user.name}</h1> <br /> <br />
            <button onClick={logOutHandler}>logout</button>
        </>
    )

}

export default UserInfo
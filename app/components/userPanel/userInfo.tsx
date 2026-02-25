import useAuth from "../../hooks/useAuth"

const UserInfo = () => {

    const {userData} = useAuth()

    return (
        <>
            <h1>userName : {userData?.user.name}</h1>
        </>
    )

}

export default UserInfo
import useAuth from "../auth/user-panel/useAuth"

export default function useAdminAccess(accessItem) {

    let access = []

    const { userData, isLoading } = useAuth()
    const permissions = userData?.user.permissions

    if (!isLoading) {
        access = permissions.filter(permission => permission === accessItem)
    }

    return access;
}
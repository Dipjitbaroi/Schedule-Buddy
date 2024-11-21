import { useContext } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import { Navigate, Outlet } from "react-router";

const AuthPageChecker = () => {
    const { authStatus } = useContext(AuthContext)
    console.log(authStatus)
    return (authStatus === 'unauthenticated' ? <>
        <Outlet />
    </> : <Navigate to={'/'} />);
}

export default AuthPageChecker;
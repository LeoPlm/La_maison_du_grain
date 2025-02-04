import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const { auth } = useContext(AuthContext);

    if (!auth || auth.role !== "admin") {
        return (
            <div>
                <h1>Nothing here</h1>
                <Link to="/">Click here 😥</Link>
            </div>
        )
    }

    return <Outlet/>
}

export default ProtectedRoute
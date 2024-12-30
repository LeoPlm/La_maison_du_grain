import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const { auth } = useContext(AuthContext);

    if (!auth || auth.role !== "admin") {
        return (
            <div>
                <h1>Nothing here</h1>
                <Link to="/">Click here 😥</Link>
            </div>
        );
    }

    return children;
}

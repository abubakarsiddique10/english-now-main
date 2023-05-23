
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AppContext } from "../App";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ children }) => {
    const location = useLocation();
    const { user } = useContext(AppContext);

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    return children;
}
export default RequireAuth
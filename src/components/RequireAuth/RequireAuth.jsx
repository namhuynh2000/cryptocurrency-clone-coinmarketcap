import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const RequireAuth = ({ children }) => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.value);

    useEffect(() => {
        if (!user.uid) {
            navigate("/");
        }
    }, [user, navigate])

    return children;
};

export default RequireAuth;

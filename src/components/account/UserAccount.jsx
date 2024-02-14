import { removeUser } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom"
import { useAuth } from '../../hooks/use-auth';
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const UserAccount = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isAuth, email } = useAuth();

    useEffect(() => {
        if (!isAuth) {
            setTimeout(() => navigate('/login'), 500)
        }
    }, [isAuth, navigate]);

    return isAuth && (
        <div className="text-center">
            <h1>Welcome Dear User !!!</h1>
            Log out from ---  <button onClick={() => dispatch(removeUser())}>{email}</button>
        </div>
    );
};

export default UserAccount;
import { selectAuthData, setLoading, setSignInErrMsg, setUser, setUserEmail, setUserPwd } from "../../../features/auth/authSlice";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Alert, Box, Button, CircularProgress, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const SignIn = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { userEmail, pwd, signInErrMsg, loading } = useSelector(selectAuthData)

    const handleSignIn = async (email, password) => {
        setLoading(true);
        const auth = getAuth();
        try {
            const { user } = await signInWithEmailAndPassword(auth, email, password);
            console.log(user);
            dispatch(setUser({
                email: user.email,
                id: user.uid,
                token: user.accessToken,
            }));
            navigate('/');
        } catch (err) {
            let errorMessage = '';
            if (err.code === 'auth/invalid-email') {
                errorMessage = "Invalid email or empty field. Please try again.";
            } else if (err.code === 'auth/invalid-credential') {
                errorMessage = "Invalid credentials. Please try again.";
            } else if (err.code === 'auth/too-many-requests') {
                errorMessage = "Too many requests. Please try again later.";
            } else errorMessage = "An unexpected error occurred. Please try again.";

            console.warn(err);
            dispatch(setSignInErrMsg(errorMessage));
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            {signInErrMsg && <Alert sx={{ fontSize: 19, mb: 4 }} variant="filled" severity="error">{signInErrMsg}</Alert>}
            <Box sx={{ marginBottom: 4, display: "grid", gap: 3 }}>
                <TextField
                    fullWidth
                    variant="filled"
                    label="Email"
                    type="email"
                    value={userEmail}
                    onChange={(e) => dispatch(setUserEmail(e.target.value))}
                />
                <TextField
                    fullWidth
                    variant="filled"
                    label="Password"
                    type="password"
                    value={pwd}
                    onChange={(e) => dispatch(setUserPwd(e.target.value))}
                />
            </Box>
            <Box className="flex justify-center items-center gap-4">
                <Button
                    onClick={() => handleSignIn(userEmail, pwd)}
                    variant="contained"
                    color="success"
                >
                    {loading ? <CircularProgress color="inherit" size={35} /> : "Log In"}
                </Button>
                OR
                <Button sx={{}} variant="outlined" color="success">
                    <Link to="/register">Sign up</Link>
                </Button>
            </Box>

        </>
    )
}

export default SignIn
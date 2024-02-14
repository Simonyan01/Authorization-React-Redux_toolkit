import { selectAuthData, setUser, setUserPwd, setUserEmail, setSignUpErrMsg, setLoading } from "../../../features/auth/authSlice";
import { Alert, Button, CircularProgress, Stack, TextField, Typography } from '@mui/material';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { signUpErrMsg, userEmail, pwd, loading } = useSelector(selectAuthData)

    const handleSignUp = async (email, password) => {
        setLoading(true);
        const auth = getAuth();
        try {
            const { user } = await createUserWithEmailAndPassword(auth, email, password);
            console.log(user);
            dispatch(setUser({
                email: user.email,
                id: user.uid,
                token: user.accessToken,
            }));
            navigate('/');
            dispatch(setUserEmail(""));
            dispatch(setUserPwd(""));
        } catch (err) {
            let errorMessage = "";
            if (err.code === 'auth/email-already-in-use') {
                errorMessage = "Email already exists. Please choose another one.";
            } else if (err.code === 'auth/weak-password') {
                errorMessage = "Password should be at least 6 characters";
            } else if (err.code === 'auth/invalid-email') {
                errorMessage = "Invalid email or empty field. Please try again.";
            } else errorMessage = "An unexpected error occurred. Please try again.";

            console.warn(err);
            dispatch(setSignUpErrMsg(errorMessage));
        } finally {
            setLoading(false);
        }
    };

    return (
        loading ? <CircularProgress /> : (
            <>
                <Typography
                    variant="h5"
                    color="red"
                    letterSpacing={1}
                >
                    {signUpErrMsg && <Alert sx={{ fontSize: 19, mb: 4 }} variant="filled" severity="error">{signUpErrMsg}</Alert>}
                </Typography>
                <Stack spacing={3}>
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
                </Stack>
                <Button
                    fullWidth
                    sx={{ marginY: 3 }}
                    color="success"
                    variant="contained"
                    onClick={() => handleSignUp(userEmail, pwd)}
                >
                    {loading ? <CircularProgress color="inherit" size={35} /> : "Register"}
                </Button>
                <Typography variant="body1" sx={{ letterSpacing: 1 }}>
                    Already registered?
                    <Button
                        onClick={() => navigate("/login")}
                        sx={{ marginLeft: 2 }}
                        color="success"
                        variant="contained"
                    >
                        Sign In
                    </Button>
                </Typography>
            </>
        )
    )
}

export default SignUp
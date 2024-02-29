import { selectData, setErrMsg, setLoading, setUserEmail, setUserPwd, setOpen, saveCreatedUser } from 'features/auth/sign_up/signUpSlice';
import { Alert, Box, Button, CircularProgress, Snackbar, Stack, TextField, Typography } from '@mui/material';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { useAuth } from 'hooks/use-auth';
import { auth } from 'utils/firebase';

const SignUp = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { isAuth } = useAuth()

    const { errMsg, userEmail, userPwd, loading, open } = useSelector(selectData)

    const closeSnackbar = (_, reason) => {
        if (reason === 'clickaway') return

        dispatch(setOpen(false))
    };

    const handleSignUp = async (email, password) => {
        dispatch(setLoading(true))
        setTimeout(() => {
            dispatch(setOpen(true));
        }, 1000);

        try {
            const { user } = await createUserWithEmailAndPassword(auth, email, password);
            localStorage.setItem("user", JSON.stringify({ email }));

            dispatch(saveCreatedUser({
                email: user.email,
                id: user.uid,
                token: user.accessToken,
            }));
            navigate('/');
            dispatch(setUserEmail(""));
            dispatch(setUserPwd(""))
        } catch (err) {
            let errorMessage = "";
            if (err.code === 'auth/email-already-in-use') {
                errorMessage = "Email already exists. Please choose another one.";
            } else if (err.code === 'auth/weak-password') {
                errorMessage = "Password should be at least 6 characters";
            } else if (err.code === 'auth/missing-password') {
                errorMessage = "The Password is missing";
            } else if (err.code === 'auth/invalid-email') {
                errorMessage = "Invalid email or empty field. Please try again.";
            } else errorMessage = "An unexpected error occurred. Please try again.";

            dispatch(setErrMsg(errorMessage));
            dispatch(setUserPwd(""))
            console.warn(err);
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        loading ? (
            <Box className="bg-white/65 p-5 rounded-3xl shadow-lg">
                <CircularProgress color="success" size={50} />
            </Box>
        ) : (
            <Box className="bg-white/60 p-7 rounded-xl shadow-lg">
                {errMsg && (
                    <Snackbar open={open} autoHideDuration={3000} onClose={closeSnackbar}>
                        <Alert
                            onClose={closeSnackbar}
                            severity="error"
                            variant="filled"
                            sx={{ fontSize: 18, mb: 4 }}
                        >
                            {errMsg}
                        </Alert>
                    </Snackbar>
                )}
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
                        value={userPwd}
                        onChange={(e) => dispatch(setUserPwd(e.target.value))}
                    />
                </Stack>
                <Button
                    fullWidth
                    sx={{ marginTop: 5, marginBottom: 4 }}
                    color="success"
                    variant="contained"
                    onClick={() => handleSignUp(userEmail, userPwd)}
                >
                    Register
                </Button>
                <Typography variant="body1" sx={{ letterSpacing: 1.5 }}>
                    Already registered?
                    <Button
                        onClick={() => !isAuth ? navigate("/login") : navigate("/")}
                        sx={{ marginLeft: 2 }}
                        color="success"
                        variant="outlined"
                    >
                        {!isAuth ? "Sign In" : "Return to account"}
                    </Button>
                </Typography>
            </Box>
        )
    )
}

export default SignUp
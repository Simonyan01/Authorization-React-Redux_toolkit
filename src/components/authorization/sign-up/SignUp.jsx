import { selectData, setErrMsg, setLoading, saveCreatedUser, setUserEmail, setUserPwd, setOpen } from 'features/auth/sign_up/signUpSlice';
import { Alert, Button, CircularProgress, Snackbar, Stack, TextField, Typography } from '@mui/material';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { errMsg, userEmail, userPwd, loading, open } = useSelector(selectData)

    const closeSnackbar = (_, reason) => {
        if (reason === 'clickaway') return

        dispatch(setOpen(false))
    };

    const openSnackbar = () => {
        dispatch(setOpen(true));
    };

    const handleSignUp = async (email, password) => {
        dispatch(setLoading(true))
        const auth = getAuth();

        try {
            const { user } = await createUserWithEmailAndPassword(auth, email, password);
            localStorage.setItem("user", JSON.stringify({ email }));

            dispatch(saveCreatedUser({
                email: user.email,
                id: user.uid,
                token: user.accessToken,
            }));
            navigate('/login');
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

            dispatch(setErrMsg(errorMessage));
            console.warn(err);
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        loading ? <CircularProgress /> : <>
            <Snackbar open={open} autoHideDuration={3500} onClose={closeSnackbar}>
                <Alert
                    onClose={closeSnackbar}
                    severity="error"
                    variant="filled"
                    sx={{ fontSize: 18, mb: 4 }}
                >
                    {errMsg}
                </Alert>
            </Snackbar>
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
                sx={{ marginY: 3 }}
                color="success"
                variant="contained"
                onClick={() => {
                    handleSignUp(userEmail, userPwd)
                    openSnackbar()
                }}
            >
                Register
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
}

export default SignUp
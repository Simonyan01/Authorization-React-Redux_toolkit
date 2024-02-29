import { selectData, setErrMsg, setLoading, setOpen, setUserEmail, setUserPwd } from "features/auth/sign_in/signInSlice";
import { Alert, Box, Button, CircularProgress, Snackbar, Stack, TextField } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "context/useAuth";
import { auth } from "utils/firebase";

const SignIn = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { signInWithGoogle } = useAuth()
    const { userEmail, userPwd, errMsg, loading, open } = useSelector(selectData)

    const closeSnackbar = (_, reason) => {
        if (reason === 'clickaway') return

        dispatch(setOpen(false))
    };

    const handleSignInWithGoogle = async () => {
        try {
            const userCredential = await signInWithGoogle();
            const user = userCredential.user;
            localStorage.setItem("user", JSON.stringify({ email: user.email }));
            navigate("/");
        } catch (err) {
            let errorMessage = '';
            if (err.code === 'auth/popup-closed-by-user') {
                errorMessage = "Google sign-in popup was closed.";
            } else errorMessage = "An unexpected error occurred. Please try again.";

            dispatch(setErrMsg(errorMessage));
            console.warn(err);
        }
    }

    const handleSignIn = async (email, password) => {
        dispatch(setLoading(true))
        setTimeout(() => {
            dispatch(setOpen(true));
        }, 1000);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            localStorage.setItem("user", JSON.stringify({ email }));

            navigate('/');
            dispatch(setUserEmail(""));
            dispatch(setUserPwd(""));
        } catch (err) {
            let errorMessage = '';
            if (err.code === 'auth/invalid-email') {
                errorMessage = "Invalid email or empty field. Please try again.";
            } else if (err.code === 'auth/invalid-credential') {
                errorMessage = "Invalid credentials. Please try again.";
                dispatch(setUserPwd(""));
            } else if (err.code === 'auth/too-many-requests') {
                errorMessage = "Too many requests. Please try again later.";
                dispatch(setUserEmail(""));
                dispatch(setUserPwd(""));
            } else errorMessage = "An unexpected error occurred. Please try again.";

            dispatch(setErrMsg(errorMessage));
            console.warn(err);
        } finally {
            dispatch(setLoading(false))
        }
    }

    return (
        loading ? (
            <Box className="bg-white/65 p-5 rounded-3xl shadow-lg">
                <CircularProgress color="success" size={50} />
            </Box>
        ) : (
            <Box className="bg-white/60 p-10 rounded-xl shadow-lg">
                {errMsg && (
                    <Snackbar open={open} autoHideDuration={3000} onClose={closeSnackbar}>
                        <Alert
                            severity="error"
                            variant="filled"
                            sx={{ fontSize: 18, mb: 4 }}
                        >
                            {errMsg}
                        </Alert>
                    </Snackbar>
                )}
                <Stack sx={{ marginBottom: 4, gap: 3 }}>
                    <TextField
                        fullWidth
                        variant="filled"
                        label="Email"
                        type="email"
                        autoComplete="email"
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
                <Box className="flex justify-center items-center gap-4">
                    <Button
                        onClick={() => handleSignIn(userEmail, userPwd)}
                        variant="contained"
                        color="success"
                    >
                        {loading ? <CircularProgress color="inherit" size={30} /> : "Log In"}
                    </Button>
                    OR
                    <Button variant="outlined" color="success">
                        <Link to="/register">Sign up</Link>
                    </Button>
                </Box>
                <Box className="grid place-items-center gap-3 relative top-6">
                    <Button
                        color="success"
                        variant="outlined"
                        sx={{ paddingY: 0.6, paddingX: 3 }}
                    >
                        <Link className="tracking-widest" to="/forgot-password"> Forgot Password?</Link>
                    </Button>
                    <Button
                        sx={{ letterSpacing: 2 }}
                        color="error"
                        variant='outlined'
                        onClick={handleSignInWithGoogle}
                    >
                        <img className="mr-2 w-5" src="/src/assets/google.png" alt="Google Icon" />
                        Sign in with Google
                    </Button>
                </Box>
            </Box>
        )
    )
}

export default SignIn
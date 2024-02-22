import { selectData, setErrMsg, setLoading, setOpen, setUserEmail, setUserPwd } from "features/auth/sign_in/signInSlice";
import { Alert, Box, Button, CircularProgress, Snackbar, TextField } from "@mui/material";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { userEmail, userPwd, errMsg, loading, open } = useSelector(selectData)

    const closeSnackbar = (_, reason) => {
        if (reason === 'clickaway') return

        dispatch(setOpen(false))
    };

    const handleSignIn = async (email, password) => {
        const auth = getAuth();

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
            } else if (err.code === 'auth/too-many-requests') {
                errorMessage = "Too many requests. Please try again later.";
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
            <Box className="bg-white/65 p-8 rounded-xl shadow-lg">
                {errMsg && (
                    <Snackbar open={open} autoHideDuration={4000} onClose={closeSnackbar}>
                        <Alert
                            severity="error"
                            variant="filled"
                            sx={{ fontSize: 18, mb: 4 }}
                        >
                            {errMsg}
                        </Alert>
                    </Snackbar>
                )}
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
                        value={userPwd}
                        onChange={(e) => dispatch(setUserPwd(e.target.value))}
                    />
                </Box>
                <Box className="flex justify-center items-center gap-4">
                    <Button
                        onClick={() => {
                            handleSignIn(userEmail, userPwd)
                        }}
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
            </Box>
        )
    )
}

export default SignIn
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

    // const openSnackbar = () => {
    //     dispatch(setOpen(true));
    // };

    const handleSignIn = async (email, password) => {
        dispatch(setLoading(true));
        const auth = getAuth();

        try {
            await signInWithEmailAndPassword(auth, email, password);
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
            dispatch(setLoading(false));
        }
    }

    return <>
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
                    // openSnackbar()
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
    </>
}

export default SignIn
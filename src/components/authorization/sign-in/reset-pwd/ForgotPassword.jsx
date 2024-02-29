import { Alert, Box, Button, CircularProgress, Snackbar, Stack, TextField } from '@mui/material'
import { selectData, setEmail, setErrMsg, setIsLoading, setIsOpen, setSuccessMsg } from 'features/main/mainSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth } from 'context/useAuth'

const ForgotPassword = () => {
    const dispatch = useDispatch()

    const { forgotPassword } = useAuth()
    const { loading, email, errMsg, isOpen, successMsg } = useSelector(selectData)

    const closeSnackbar = (_, reason) => {
        if (reason === 'clickaway') return

        dispatch(setIsOpen(false))
    };

    const handleForgotPassword = async () => {
        dispatch(setIsLoading(true))

        setTimeout(() => {
            dispatch(setIsOpen(true));
        }, 1000);

        try {
            await forgotPassword(email)
            dispatch(setSuccessMsg("Password reset email sent successfully."));
            dispatch(setEmail(""))
        } catch (err) {
            let errorMessage = '';
            if (err.code === 'auth/missing-email') {
                errorMessage = "Empty field. Please try again.";
            } else if (err.code === 'auth/invalid-email') {
                errorMessage = "Invalid email. Please try again.";
            } else errorMessage = "An unexpected error occurred. Please try again.";

            dispatch(setErrMsg(errorMessage));
            console.warn(err);
        } finally {
            dispatch(setIsLoading(false))
        }
    }

    return (
        <Box className="bg-white/65 p-8 rounded-xl w-max lg:w-[450px] shadow-lg">
            {errMsg && (
                <Snackbar open={isOpen} autoHideDuration={4000} onClose={closeSnackbar}>
                    <Alert
                        severity="error"
                        variant="filled"
                        sx={{ fontSize: 18, mb: 4 }}
                    >
                        {errMsg}
                    </Alert>
                </Snackbar>
            )}
            {successMsg && (
                <Snackbar open={isOpen} autoHideDuration={4500} onClose={closeSnackbar}>
                    <Alert severity="success" variant="filled" sx={{ fontSize: 18, mb: 4 }}>
                        {successMsg}
                    </Alert>
                </Snackbar>
            )}
            <Stack spacing={3}>
                <TextField
                    fullWidth
                    variant="filled"
                    label="Email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => dispatch(setEmail(e.target.value))}
                />
                <Button
                    color='success'
                    variant='contained'
                    type='submit'
                    onClick={handleForgotPassword}
                >
                    {loading ? <CircularProgress color="inherit" size={30} /> : "Submit"}
                </Button>
            </Stack>
        </Box>
    )
}

export default ForgotPassword
import { selectData, setPassword } from 'features/main/mainSlice'
import { Box, Button, Stack, TextField } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth } from 'context/useAuth'

const useQuery = () => new URLSearchParams(useLocation().search)

const ResetPassword = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const query = useQuery()

    const { resetPassword } = useAuth()
    const { password } = useSelector(selectData)

    const handleResetPassword = async () => {
        try {
            resetPassword(query.get('oobCode'), password)
            navigate("/login")
            dispatch(setPassword(""))
        } catch (err) {
            console.warn(err);
        }
    }

    // console.log(query.get('mode'), query.get('oobCode'))

    return (
        <Box sx={{ width: 400 }} className="bg-white/65 p-6 rounded-xl shadow-lg">
            <Stack spacing={2}>
                <TextField
                    required
                    type='password'
                    label='New password'
                    variant='outlined'
                    color='success'
                    value={password}
                    onChange={e => dispatch(setPassword(e.target.value))}
                />
                <Button
                    color='success'
                    variant='contained'
                    type='submit'
                    onClick={handleResetPassword}
                >
                    Reset password
                </Button>
            </Stack>
        </Box>
    )
}

export default ResetPassword
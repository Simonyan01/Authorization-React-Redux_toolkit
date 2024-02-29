import { AppBar, Box, IconButton, ListItemIcon, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { removeUser, saveCreatedUser } from "features/auth/sign_up/signUpSlice";
import { selectData, setAnchorEl } from "features/main/mainSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReact } from '@fortawesome/free-brands-svg-icons'
import { useDispatch, useSelector } from "react-redux";
import PersonAdd from '@mui/icons-material/PersonAdd';
import { AccountCircle } from "@mui/icons-material";
import LoginIcon from '@mui/icons-material/Login';
import Logout from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom"
import { useAuth } from 'hooks/use-auth';
import { useEffect } from "react";
import Upload from "./Upload";

const UserAccount = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { anchorEl } = useSelector(selectData)
    const { isAuth, email } = useAuth();
    const open = Boolean(anchorEl);

    const handleClose = () => {
        dispatch(setAnchorEl(null))
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        dispatch(removeUser());
        navigate('/login')
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('user');

        storedUser && dispatch(saveCreatedUser(JSON.parse(storedUser)));
    }, [dispatch, navigate]);

    return (
        <>
            <AppBar position="fixed" color="success">
                <Toolbar>
                    <FontAwesomeIcon icon={faReact} className="text-4xl mr-6 ml-2 animate-spin-slow delay-75" />
                    <Typography letterSpacing={2} variant="h6" sx={{ flexGrow: 1 }}>
                        User account
                    </Typography>
                    {!isAuth ? (
                        <MenuItem onClick={() => navigate('/login')}>
                            <ListItemIcon>
                                <LoginIcon fontSize="small" letterSpacing="20px" />
                            </ListItemIcon>
                            Sign In
                        </MenuItem>
                    ) : (
                        <Box>
                            <IconButton
                                size="large"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={(e) => dispatch(setAnchorEl(e.currentTarget))}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                onClick={handleClose}
                                PaperProps={{
                                    elevation: 0,
                                    sx: {
                                        overflow: 'visible',
                                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                        mt: 1.5,
                                        '& .MuiAvatar-root': {
                                            width: 32,
                                            height: 32,
                                            ml: -0.5,
                                            mr: 1,
                                        },
                                        '&::before': {
                                            content: '""',
                                            display: 'block',
                                            position: 'absolute',
                                            top: 0,
                                            right: 14,
                                            width: 10,
                                            height: 10,
                                            bgcolor: 'background.paper',
                                            transform: 'translateY(-50%) rotate(45deg)',
                                            zIndex: 0,
                                        },
                                    },
                                }}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            >
                                <MenuItem onClick={() => navigate('/register')}>
                                    <ListItemIcon>
                                        <PersonAdd fontSize="small" />
                                    </ListItemIcon>
                                    Add another account
                                </MenuItem>
                                <MenuItem onClick={handleLogout}>
                                    <ListItemIcon>
                                        <Logout fontSize="small" />
                                    </ListItemIcon>
                                    Sign out from {email}
                                </MenuItem>
                            </Menu>
                        </Box>
                    )}
                </Toolbar>
            </AppBar>
            {isAuth && <Upload />}
        </>
    );
};

export default UserAccount;
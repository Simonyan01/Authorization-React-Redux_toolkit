import { AppBar, Box, IconButton, ListItemIcon, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { removeUser, saveCreatedUser } from "features/auth/sign_up/signUpSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReact } from '@fortawesome/free-brands-svg-icons'
import PersonAdd from '@mui/icons-material/PersonAdd';
import { AccountCircle } from "@mui/icons-material";
import LoginIcon from '@mui/icons-material/Login';
import Logout from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAuth } from 'hooks/use-auth';
import Upload from "./Upload";

const UserAccount = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null)
    const { isAuth, email } = useAuth();
    const open = Boolean(anchorEl);

    const handleClose = () => {
        setAnchorEl(null)
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
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={(e) => setAnchorEl(e.currentTarget)}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                id="account-menu"
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
            <Box className="flex items-center justify-center h-full object-cover">
                <Upload />
            </Box>
        </>
    );
};

export default UserAccount;



// import { Box, Button, Card, CardContent, Modal, TextField, Zoom } from '@mui/material';
// import ImageUploading from 'react-images-uploading';
// import { ref, storage } from 'api/firebase';
// import { useEffect, useState } from 'react';
// import { v4 } from 'uuid';
// import { getDownloadURL, listAll, uploadBytes } from 'firebase/storage';

// const Upload = () => {
//     const [addedData, setAddedData] = useState([]);
//     const [isOpen, setIsOpen] = useState(false);
//     const [img, setImg] = useState("");
//     // const [text, setText] = useState("");
//     const maxNumber = 10;

//     const onImageUpload = () => {
//         if (img) {
//             const imgRef = ref(storage, `images/${v4()}`)
//             uploadBytes(imgRef, img).then(() => {
//                 console.log("Image uploaded successfully!");
//                 setImg("")
//             }).catch(error => {
//                 console.error("Error uploading image:", error);
//             });
//         }
//     }

//     const onChange = (imageList) => {
//         setImg(imageList.target.files[0])
//     };

//     const handleToggle = () => {
//         setIsOpen(prev => !prev)
//     };

//     useEffect(() => {
//         listAll(ref(storage, "files")).then(img => {
//             console.log(img)
//             img.items.forEach(val => getDownloadURL(val).then(url => setAddedData(data => [...data, url])))
//         })
//     }, [])

//     console.log("Data:", addedData)

//     return (
//         <Box className="w-full flex flex-col justify-between items-center gap-16">
//             <Button variant='contained' color='success' onClick={handleToggle}>
//                 Create a publication
//             </Button>
//             <Modal
//                 open={isOpen}
//                 onClose={handleToggle}
//                 className='flex items-center justify-center'
//             >
//                 <Zoom in={isOpen}>
//                     <Card sx={{ width: 600, borderRadius: "20px" }}>
//                         <CardContent className='bg-[#262626]'>
//                             <svg
//                                 aria-label="Значок, соответствующий медиафайлам, например изображениям или видео"
//                                 className="x1lliihq x1n2onr6 x5n08af m-auto relative top-24 text-white"
//                                 fill="currentColor"
//                                 height="77"
//                                 role="img"
//                                 viewBox="0 0 97.6 77.3"
//                                 width="96">
//                                 <title>Значок, соответствующий медиафайлам, например изображениям или видео</title>
//                                 <path d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z" fill="currentColor"></path>
//                                 <path d="M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z" fill="currentColor"></path>
//                                 <path d="M78.2 41.6 61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z" fill="currentColor"></path>
//                             </svg>
//                             <ImageUploading
//                                 value={img}
//                                 onChange={onChange}
//                                 maxNumber={maxNumber}
//                                 dataURLKey="data_url"
//                             >
//                                 {({
//                                     imageList,

//                                     onImageUpdate,
//                                     onImageRemove,
//                                     isDragging,
//                                     dragProps,
//                                 }) => (
//                                     <>
//                                         <Box className="flex justify-center items-center absolute top-2/4 pl-36 flex-wrap">
//                                             <Button
//                                                 style={isDragging ? { color: 'red' } : undefined}
//                                                 onClick={onImageUpload}
//                                                 {...dragProps}
//                                             >
//                                                 Drag photos here
//                                             </Button>
//                                         </Box>
//                                         <Box className="flex overflow-y-auto h-72 gap-6 pl-6">
//                                             {imageList.map((image, i) => (
//                                                 <Box key={i} className="flex items-center gap-1">
//                                                     <Box className='cursor-grabbing'>
//                                                         <img src={image['data_url']} alt="img list" width="450" />
//                                                         {/* <span className='text-xl tracking-wider'>{text}</span> */}
//                                                         {/* <Box className="flex items-center justify-center">
//                                                             <Button variant='text' onClick={() => onImageUpdate(i)}>Update</Button>
//                                                             <Button variant='text' onClick={() => onImageRemove(i)}>Remove</Button>
//                                                         </Box> */}
//                                                     </Box>
//                                                     <Box className='flex flex-col justify-center items-center'>
//                                                         {/* <TextField
//                                                             className='w-[90%]'
//                                                             value={text}
//                                                             variant="filled"
//                                                             label="Add description"
//                                                             placeholder="Some beautiful text"
//                                                             onChange={(e) => setText(e.target.value)}
//                                                         />
//                                                         <Button
//                                                             onClick={() => {
//                                                                 text.trim() && setImages([...images, {
//                                                                     id: Math.random(),
//                                                                     title: text,
//                                                                     image: image['data_url']
//                                                                 }])
//                                                                 setText('')
//                                                                 onImageRemove(i)
//                                                                 handleToggle()
//                                                             }}
//                                                             variant="contained"
//                                                             sx={{ paddingX: 4 }} >
//                                                             Add
//                                                         </Button> */}
//                                                     </Box>
//                                                 </Box>
//                                             ))}
//                                         </Box>
//                                     </>
//                                 )}
//                             </ImageUploading>
//                         </CardContent>
//                     </Card>
//                 </Zoom>
//             </Modal>
//             {/* <Box className="flex flex-wrap gap-5 justify-evenly w-full px-4">
//                 {images.map(({ id, title, image }) => (
//                     <Box className='bg-[rgba(0,0,0,0.22)] text-center rounded-2xl' key={id}>
//                         <img src={image} alt={title} width="150" />
//                         <Button sx={{ color: "white" }} variant='text'>{title}</Button>
//                     </Box>
//                 ))}
//             </Box> */}
//         </Box>
//     );
// }


// export default Upload
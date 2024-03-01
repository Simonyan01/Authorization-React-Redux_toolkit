import { deleteUserData, getUserPosts, postUserData, selectData, setAddedData, setDescription, setIsOpen, updateUserData } from 'features/main/mainSlice';
import { Box, Button, Card, CardContent, Divider, Modal, TextField, Zoom } from '@mui/material';
import FavoriteBorderSharpIcon from '@mui/icons-material/FavoriteBorderSharp';
import { Delete, RefreshRounded } from '@mui/icons-material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useDispatch, useSelector } from 'react-redux';
import ImageUploading from 'react-images-uploading';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel } from 'swiper/modules';
import { useEffect } from 'react';
import 'swiper/css/pagination';
import 'swiper/css';

const Upload = () => {
    const dispatch = useDispatch()
    const maxNumber = 10;

    const { isOpen, description, addedData, images } = useSelector(selectData)

    const onChange = (imageList) => {
        dispatch(setAddedData(imageList));
    };

    const handleAddPost = (text, image, onImageRemove, i) => {
        if (!text) {
            alert("Text is missing")
            return;
        }
        dispatch(postUserData({
            title: text.trim(),
            image: image['data_url'],
            isLiked: false
        }))

        setTimeout(() => {
            dispatch(getUserPosts())
        }, 100)

        handleDescriptionChange(i, "")
        onImageRemove(i);
        handleToggle();
    };

    const handleDescriptionChange = (i, val) => {
        const updatedDescriptions = [...description];
        updatedDescriptions[i] = val;
        dispatch(setDescription(updatedDescriptions));
    };

    const handleToggle = () => dispatch(setIsOpen(!isOpen))

    const handleLikeToggle = (image) => {
        dispatch(updateUserData({
            image: image,
        }))
    }

    useEffect(() => {
        dispatch(getUserPosts())
    }, [dispatch])

    return (
        <Box className="w-full flex flex-col items-center gap-14 ">
            <Button variant='contained' color='success' onClick={handleToggle}>
                Create a publication
            </Button>
            <Modal
                open={isOpen}
                onClose={handleToggle}
                className='flex items-center justify-center'
            >
                <Zoom in={isOpen}>
                    <Card sx={{ width: 580, height: 600, borderRadius: "14px", outline: "none", backgroundColor: "#262626", position: "relative" }}>
                        <Box className="text-[#F5F5F5] p-2 text-center w-full text-ellipsis text-sm font-sans">Create publications</Box>
                        <Divider color="#4b4b4b" />
                        <CardContent className="relative top-6">
                            <svg
                                aria-label="Значок, соответствующий медиафайлам, например изображениям или видео"
                                className="x1lliihq x1n2onr6 x5n08af mx-auto z-0 text-[#aeadad] "
                                fill="currentColor"
                                height="77"
                                role="img"
                                viewBox="0 0 97.6 77.3"
                                width="96">
                                <title>Значок, соответствующий медиафайлам, например изображениям или видео</title>
                                <path d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z" fill="currentColor"></path>
                                <path d="M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z" fill="currentColor"></path>
                                <path d="M78.2 41.6 61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z" fill="currentColor"></path>
                            </svg>
                            <ImageUploading
                                multiple
                                value={addedData}
                                onChange={onChange}
                                maxNumber={maxNumber}
                                dataURLKey="data_url"
                            >
                                {({
                                    imageList,
                                    onImageUpload,
                                    onImageUpdate,
                                    onImageRemove,
                                    onImageRemoveAll,
                                    isDragging,
                                    dragProps,
                                    errors
                                }) => (
                                    <>
                                        {errors && (
                                            <Box className="text-center animate-bounce relative top-3 text-red-500">
                                                {errors.maxNumber && <span>Number of selected images exceed {maxNumber}</span>}
                                                {errors.acceptType && <span>Your selected file type is not allowed {`[jpg, gif, png]`}</span>}
                                                {errors.maxFileSize && <span>Selected file size exceed max file size</span>}
                                                {errors.resolution && <span>Selected file is not match your desired resolution</span>}
                                            </Box>
                                        )}
                                        <Box className="flex justify-center items-center mt-4 z-0 mx-auto">
                                            <Button
                                                style={{ letterSpacing: 1, color: isDragging ? 'red' : 'white' }}
                                                onClick={onImageUpload}
                                                {...dragProps}
                                            >
                                                drag or select from pc
                                            </Button>
                                        </Box>
                                        <RefreshRounded
                                            onClick={() => onImageRemoveAll()}
                                            className="text-white cursor-pointer float-right relative bottom-1"
                                        />
                                        <Box className="mt-7">
                                            <Swiper
                                                slidesPerView={3}
                                                spaceBetween={15}
                                                direction={'horizontal'}
                                                mousewheel={true}
                                                modules={[Mousewheel]}
                                            >
                                                {imageList.map((image, i) => (
                                                    <SwiperSlide key={i}>
                                                        <Box className="flex text-white bg-black/20 p-3 rounded-lg">
                                                            <Button
                                                                variant='text'
                                                                color='inherit'
                                                                style={{ position: "absolute", top: 10, right: 0, fontSize: 24, padding: 0, margin: 0 }}
                                                                onClick={() => onImageRemove(i)}
                                                            >
                                                                &times;
                                                            </Button>
                                                            <img
                                                                className='object-center w-full h-[130px]'
                                                                src={image['data_url']}
                                                                alt="img list"
                                                            />
                                                        </Box>
                                                        <Box className='grid place-items-center w-full'>
                                                            <TextField
                                                                sx={{
                                                                    paddingY: 1,
                                                                    '& .MuiFormLabel-root': {
                                                                        color: '#1976D2',
                                                                    },
                                                                    '& .MuiInputBase-root': {
                                                                        color: 'whiteSmoke',
                                                                        fontSize: 17,
                                                                    }
                                                                }}
                                                                label="Add description"
                                                                variant="filled"
                                                                color='primary'
                                                                value={description[i] || ''}
                                                                onChange={(e) => handleDescriptionChange(i, e.target.value)}
                                                            />
                                                            <Button
                                                                onClick={() => {
                                                                    handleAddPost(description[i], image, onImageRemove, i)
                                                                }}
                                                                variant="contained"
                                                                sx={{ paddingX: 3, paddingY: 0.2, marginBottom: 1.3, marginTop: 0.4 }}>
                                                                Add
                                                            </Button>
                                                            <Button
                                                                onClick={() => onImageUpdate(i)}
                                                                variant="contained"
                                                                sx={{ paddingX: 3, paddingY: 0.2 }}>
                                                                UPDATE
                                                            </Button>
                                                        </Box>
                                                    </SwiperSlide>
                                                ))}
                                            </Swiper>
                                        </Box>
                                    </>
                                )}
                            </ImageUploading>
                        </CardContent>
                    </Card>
                </Zoom>
            </Modal>
            <Box className="flex flex-wrap gap-5 justify-evenly  w-full h-full">
                {images.map((imageItem) => {
                    const { id, title, image, isLiked } = imageItem;
                    return (
                        <Box className='relative text-center bg-black/5 rounded-md flex flex-col select-none' key={id}>
                            <button className='absolute right-0 m-2 outline-none' onClick={() => handleLikeToggle({ ...imageItem, isLiked: !isLiked })}>
                                {isLiked ? (
                                    <FavoriteIcon className='text-red-600' />
                                ) : (
                                    <FavoriteBorderSharpIcon className='text-white' />
                                )}
                            </button>
                            <img className='flex flex-grow object-center object-cover' src={image} alt={title} width="250" />
                            <Box className='w-full flex justify-between items-center px-2 py-1 text-slate-900 shadow-md'>
                                <span>{title}</span>
                                <span className='cursor-pointer'>
                                    <Delete
                                        className='hover:text-white hover:transition-all hover:duration-200'
                                        onClick={() => dispatch(deleteUserData(id))}
                                    />
                                </span>
                            </Box>
                        </Box>
                    )
                })}
            </Box>
        </Box>
    );
}

export default Upload
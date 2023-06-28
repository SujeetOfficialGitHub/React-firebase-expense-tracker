import React, { useEffect, useState } from 'react'
import { Form, Button, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import classes from './Profile.module.css'
import Helmet from '../../components/utils/Helmet'
import { getProfileData, updateProfile } from '../../app/features/authSlice'

const default_image = 'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG-Pic.png';
const Profile = () => {
    const title = "Profile"

    const [imageUrl, setImageUrl] = useState('');
    const [showImage, setShowImage] = useState('')
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [readMode, setReadMode] = useState(true);



    const {token, loading} = useSelector(state => state.auth)
    const dispatch = useDispatch();

    
    const saveprofileDataHandler = async(e) => {
        console.log("clidked")
        e.preventDefault()
        const enteredData = {
            displayName: name,
            photoUrl: imageUrl,
            idToken: token
        }
        try{
            await dispatch(updateProfile({enteredData})).unwrap()
            const res = await dispatch(getProfileData({token})).unwrap();
            if (res.users){
                // console.log(res.users[0])
                setName(res.users[0].displayName)
                setShowImage(res.users[0].photoUrl)
            }
            setImageUrl('')
            setReadMode(true)
        }catch(error){
            // console.log(error)
        }
    }

    useEffect(() => {
        const fetchData = async() => {
            try {
                const res = await dispatch(getProfileData({token})).unwrap();
                if (res.users){
                    setName(res.users[0].displayName)
                    setShowImage(res.users[0].photoUrl)
                    setEmail(res.users[0].email)

                }
            } catch (error) {
                // console.log(error)
            }
        }
        fetchData()
    }, [dispatch, token])

    const profileModeHandler = () => {
        setReadMode(false)
    }
    const cancelProfileUpdateHandler = () => {
        setReadMode(true)
    }

  return (
    <Helmet className={classes.profile} title={title}>
        <h2 className='text-center'>Profile</h2>
        <hr />
        <Form onSubmit={saveprofileDataHandler}>
            <div className={classes['profile-image']}>
                <Image src={showImage ? showImage : default_image} className='fs-3' alt='Profile Photo'/>
            </div>
            {!readMode && <Form.Group className={`mb-3 ${classes['profile-image__url']}`} controlId="upload-profile__image.ControlInput1" >
                <Form.Label className='fs-3'>Image URL</Form.Label>
                <Form.Control  type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className='fs-3'placeholder='Enter image url' readOnly={readMode}/>
            </Form.Group>
            }
            <Form.Group className="mb-3" controlId="name.ControlInput1">
                <Form.Label className='fs-3'>Name</Form.Label>
                <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} className='fs-3' placeholder="Enter your name" readOnly={readMode} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email.ControlInput1">
                <Form.Label className='fs-3'>Email</Form.Label>
                <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='fs-3' readOnly />
            </Form.Group>

            {readMode && <Button className='fs-4' onClick={profileModeHandler} type="submit" disabled={loading}>Edit</Button>}
            {!readMode && <Button className='fs-4' type="submit" disabled={loading}>Update</Button>}
            {!readMode && <Button className='fs-4 mt-2' onClick={cancelProfileUpdateHandler} type="submit" disabled={loading}>Cancle</Button>}
        </Form>
    </Helmet>
  )
}

export default Profile
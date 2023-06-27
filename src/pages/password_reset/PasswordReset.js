import React, {useState} from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import classes from './PasswordReset.module.css'
import Helmet from '../../components/utils/Helmet'
import { passwordReset } from '../../app/features/authSlice'

const PasswordReset = () => {
    const title = "Password Reset"
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [messageColor, setMessageColor] = useState('')

    const dispatch = useDispatch();
    const loading = useSelector(state => state.auth.loading)
    

    const passwordResetHander = async(e) => {
        e.preventDefault()
        try{
            const res = await dispatch(passwordReset({email})).unwrap()
            if (res.email){
              setMessage("Password Reset Email Send Successfully");
              setMessageColor('success');
              setEmail('')
            }else{
            }
            console.log(res)
          }catch(error){
            setMessage(error.message)
            setMessageColor('danger')
            console.log(error)
        }
        
    }
    if (message){
      setTimeout(() => {
        setMessage('')
      }, 10000)
    }
  return (
    <Helmet className={classes.password_reset} title={title}>
        <h2 className='text-center'>Send Password Reset Mail</h2>
        <hr />
        {message && <p className={`bg-${messageColor} fs-3 text-light text-center p-1`}>{message}</p>}
        <Form onSubmit={passwordResetHander}>
            <Form.Group className="mb-3" controlId="email.ControlInput1">
                <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)}className='fs-3' placeholder="Enter your email" />
            </Form.Group>
            <Button type="submit"  className='fs-4' disabled={loading}>Send</Button>
        </Form>
    </Helmet>
  )
}

export default PasswordReset
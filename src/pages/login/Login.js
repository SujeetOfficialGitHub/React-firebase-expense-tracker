import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import classes from './Login.module.css'
import Helmet from '../../components/utils/Helmet'
import { login } from '../../app/features/authSlice'

const Login = () => {
    const title = "Login"

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch();
    
    const enteredPasswordHandler = (e) => {
        setPassword(e.target.value)
    }
    const loginHander = async(e) => {
        e.preventDefault()
        const enteredData = {
            email,
            password
        }
        try{
            await dispatch(login({enteredData})).unwrap()
        }catch(error){
            console.log(error)
        }
    }
  return (
    <Helmet className={classes.login} title={title}>
        <h2 className='text-center'>Login</h2>
        <hr />
        <Form onSubmit={loginHander}>
            <Form.Group className="mb-3" controlId="email.ControlInput1">
                <Form.Label className='fs-3'>Email</Form.Label>
                <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='fs-3' placeholder="Enter your email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password.ControlInput1">
                <Form.Label className='fs-3'>Password</Form.Label>
                <Form.Control type="password" value={password} onChange={enteredPasswordHandler} className='fs-3' placeholder="Enter your password" />
            </Form.Group>

            <Button className='fs-4' type="submit">Login</Button>
        </Form>

        <p className='fs-4 mt-4 border p-3 text-center'>
            Don't have an account 
            <Link to="/signup"> Sign up here</Link>
        </p>
    </Helmet>
  )
}

export default Login
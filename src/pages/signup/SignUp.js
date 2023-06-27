import React, {useState} from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


import classes from './SignUp.module.css';
import Helmet from '../../components/utils/Helmet';
import { signup } from '../../app/features/authSlice';

const SignUp = () => {
    const title = "Sign up"
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {loading} = useSelector(state => state.auth);
    
    const enteredPasswordHandler = (e) => {
        setPassword(e.target.value)
    }
    const signupHander = async(e) => {
        e.preventDefault()
        const enteredData = {
            email,
            password
        }
        try{
            await dispatch(signup({enteredData})).unwrap()
            setEmail('')
            setPassword('')
            navigate('/')
        }catch(error){
            setError(error.message)
            // console.log(error)
        }  
    }
    if (error){
        setTimeout(() => {
            setError('')
        }, 10000);
    }
  return (
    <Helmet className={classes.signup} title={title}>
        <h2 className='text-center'>Sign Up</h2>
        <hr />
        {error && <p className='fs-4 p-1 text-center text-light bg-danger'>{error}</p>}
        <Form onSubmit={signupHander}>
            <Form.Group className="mb-3" controlId="email.ControlInput1">
                <Form.Label className='fs-3'>Email</Form.Label>
                <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)}className='fs-3' placeholder="Enter your email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password.ControlInput1">
                <Form.Label className='fs-3'>Password</Form.Label>
                <Form.Control type="password" value={password} onChange={enteredPasswordHandler} className='fs-3' placeholder="Enter your password" />
            </Form.Group>

            <Button type="submit" className='fs-4' disabled={loading}>{!loading ? "Sign Up" : <Spinner animation="border" variant="secodary" />}</Button>
        </Form>
        <hr />
        <p className='fs-4 mt-4 border p-3 text-center'>
            Already have an account 
            <Link to="/login"> Login here</Link>
        </p>
    </Helmet>
  )
}

export default SignUp
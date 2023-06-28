import React from 'react'
import { Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import classes from './Premium.module.css'
import { themeColor } from '../../app/features/themeSlice';

const Premium = ({color}) => {
    const dispatch = useDispatch();
    const selectedColor = useSelector(state => state.theme.color)

  return (
        <Form className={classes['theme-options']}>
            <Form.Check 
                type="switch"
                label={'Theme ' + color.charAt(0).toUpperCase()+color.slice(1)}
                name = 'themeColor'
                checked={color===selectedColor}
                onChange={e => dispatch(themeColor({color: color}))}
            />
        </Form>
  )
}

export default Premium
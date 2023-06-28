import React from 'react'
import { Button } from 'react-bootstrap'
import classes from './Expense.module.css'
import ExpenseDate from '../expense_date/ExpenseDate'
import {FaTrash} from 'react-icons/fa'
import {BiEdit} from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { deleteExpense } from '../../app/features/expenseSlice'
const Expense = ({id, name, category,amount, date, onPopulateToForm}) => {
  const dispatch = useDispatch();
  const email = useSelector(state => state.auth.email);

  const deleteHander = async() => {
    try {
      await dispatch(deleteExpense({email, id}))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={classes.expense}>
        <ExpenseDate date={date} />
        <div className={classes['expense-content']}>
            <div className={classes.name}>{name}</div>
            <div className={classes.category}>{category}</div>
            <div className={classes.amount}>{amount}</div>
        </div>
        <div className={classes.action}>
            <Button onClick={deleteHander} className='bg-danger text-light fs-3'><FaTrash/></Button>
            <Button onClick={() => onPopulateToForm({id, name, category, amount, date})} className='bg-warning text-light fs-3'><BiEdit/></Button>
        </div>
    </div>
  )
}

export default Expense
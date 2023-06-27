import React from 'react'
import classes from './Expense.module.css'
import ExpenseDate from '../expense_date/ExpenseDate'
import {FaTrash} from 'react-icons/fa'
import {BiEdit} from 'react-icons/bi'
const Expense = ({id, name, category,amount, date}) => {
  return (
    <div className={classes.expense}>
        <ExpenseDate date={date} />
        <div className={classes['expense-content']}>
            <div className={classes.name}>{name}</div>
            <div className={classes.category}>{category}</div>
            <div className={classes.amount}>{amount}</div>
        </div>
        <div className={classes.action}>
            <span className='bg-danger text-light'><FaTrash/></span>
            <span className='bg-warning text-light'><BiEdit/></span>
        </div>
    </div>
  )
}

export default Expense
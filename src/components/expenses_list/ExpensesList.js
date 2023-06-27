import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Spinner } from 'react-bootstrap'

import classes from './ExpensesList.module.css'
import Expense from '../expense/Expense'
import { fetchExpense } from '../../app/features/expenseSlice'



const ExpensesList = () => {
  const dispatch = useDispatch();
  const email = useSelector(state => state.auth.email);

  useEffect(() => {
    const fetchExpenses = async() => {
      try {
        await dispatch(fetchExpense({email}))
      } catch (error) {
        console.log(error)
      }
    }
    fetchExpenses()
  },[dispatch, email])

  const expenses = useSelector(state => state.expense.expenses);

  return (
    <div className={classes['expense-list']}>
      {!expenses ? (<Spinner animation="border" className='d-block mx-auto m-3' variant="primary" />
      ) : (
      expenses.map(expense => (
        <Expense
          key={expense.id} 
          id = {expense.id}
          name = {expense.name}
          category = {expense.category}
          amount = {expense.amount}
          date = {expense.date}
        />
      ))
      )}
    </div>
  )
}

export default ExpensesList
import React, { useState } from 'react'
import { Form , Button, Spinner} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';

import classes from './Home.module.css'
import Helmet from '../../components/utils/Helmet'
import ExpensesList from '../../components/expenses_list/ExpensesList';
import { addExpense, updateExpense } from '../../app/features/expenseSlice';
const Home = () => {
  const title = "Home";
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState('')
  const [message, setMessage] = useState('')
  const [id, setId] = useState('');

  const dispatch = useDispatch();
  const email = useSelector(state => state.auth.email);
  const {loading} = useSelector(state => state.expense);

  const addExpenseHandler  = async(e) => {
      e.preventDefault()
      const enteredData = {
          name,
          category,
          amount,
          date
      }
      try{
        if (id){
          await dispatch(updateExpense({enteredData, email, id})).unwrap();
          setMessage('Expense Updated Successfully')
              setName('')
              setCategory('')
              setAmount('')
              setDate('')
        }else{
          const res = await dispatch(addExpense({enteredData, email})).unwrap();
          if (res.id){
              setMessage('Expense Added Successfully')
              setName('')
              setCategory('')
              setAmount('')
              setDate('')
          }
        }
      }catch(error){
          // console.log(error)
      }
  }
  const populateToForm = (expense) => {
    setId(expense.id)
    setIsFormOpen(true)
    setName(expense.name)
    setCategory(expense.category)
    setAmount(expense.amount)
    setDate(expense.date)
  }

  if (message){
    setTimeout(() => {
      setMessage('')
    }, 10000);
  }
  return (
    <Helmet title={title}>
        <div className={classes['add-expenses']}>
          <h2 className='text-center text-light'>Add Your Daily Expenses</h2>
          <hr />
          {message && <p className={`bg-success fs-3 text-light text-center p-1`}>{message}</p>}
          {!isFormOpen && <Button className='fs-3 d-block mx-auto p-3' onClick={() => setIsFormOpen(true)}>Add Expenses</Button>}
          {isFormOpen && 
          <Form onSubmit={addExpenseHandler}>
              <Form.Group className={`mb-3 ${classes['input-box']}`} controlId="formBasicName">
                  <Form.Label className='fs-4'>Expense Name</Form.Label>
                  <Form.Control className='fs-4' type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your expense name" />
              </Form.Group>
              <Form.Group className={`mb-3 ${classes['input-box']}`} controlId="formBasicCategory">
                  <Form.Label className='fs-4'>Expense Category</Form.Label>
                  <Form.Select className='fs-4' value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Default select example">
                      <option>Select Category</option>
                      <option value="Traval">Traval</option>
                      <option value="Bill">Bill</option>
                      <option value="Maintenance">Maintenance</option>
                      <option value="Food">Food</option>
                  </Form.Select>
              </Form.Group>
              <Form.Group className={`mb-3 ${classes['input-box']}`} controlId="formBasicAmount">
                  <Form.Label className='fs-4'>Expense Amount</Form.Label>
                  <Form.Control className='fs-4' type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter your expense amount" />
              </Form.Group>
              <Form.Group className={`mb-3 ${classes['input-box']}`} controlId="formBasicDate">
                  <Form.Label className='fs-4'>Expense Date</Form.Label>
                  <Form.Control className='fs-4' type="date"  value={date} onChange={(e) => setDate(e.target.value)}/>
              </Form.Group>
              {!id && <Button type='submit' className="fs-3" variant='success' disabled={loading}>{!loading ? "Add" : <Spinner animation="border" variant="light" />}</Button>}
              {id && <Button type='submit' className="fs-3" variant='success' disabled={loading}>{!loading ? "Update" : <Spinner animation="border" variant="light" />}</Button>}
              <Button className="fs-3" onClick={() => setIsFormOpen(false)} variant='danger' disabled={loading}>Close</Button>
          </Form>
          }
      </div>
      <ExpensesList onPopulateToForm={populateToForm}/>
    </Helmet>
  )
}

export default Home
import React from 'react'
import AddExpensesForm from '../../components/add_expenses_form/AddExpensesForm'
import Helmet from '../../components/utils/Helmet'
import ExpensesList from '../../components/expenses_list/ExpensesList';
const Home = () => {
  const title = "Home";
  
  return (
    <Helmet title={title}>
      <AddExpensesForm />
      <ExpensesList />
    </Helmet>
  )
}

export default Home
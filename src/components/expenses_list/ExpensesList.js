import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';

import classes from './ExpensesList.module.css';
import Expense from '../expense/Expense';
import { fetchExpense } from '../../app/features/expenseSlice';
import FilterExpenses from '../filter_expenses/FilterExpenses';

const ExpensesList = (props) => {
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');

    const dispatch = useDispatch();
    const email = useSelector(state => state.auth.email);
    const {expenses, loading} = useSelector(state => state.expense);
    const [filteredData, setFilteredData] = useState(expenses);

    useEffect(() => {
        const fetchExpenses = async () => {
        try {
            await dispatch(fetchExpense({ email })).unwrap();
        } catch (error) {
            console.log(error);
        }
        };

        fetchExpenses();
    }, [dispatch, email]);

    useEffect(() => {
        let filteredExpenses = expenses;

        if (selectedYear && selectedYear !== 'all') {
        filteredExpenses = filteredExpenses.filter(expense => {
            const itemYear = new Date(expense.date).getFullYear();
            return itemYear.toString() === selectedYear;
        });
        }

        if (selectedMonth && selectedMonth !== 'all') {
        filteredExpenses = filteredExpenses.filter(expense => {
            const itemMonth = (new Date(expense.date).getMonth() + 1).toString().padStart(2, '0');
            return itemMonth === selectedMonth;
        });
        }

        setFilteredData(filteredExpenses);
    }, [expenses, selectedYear, selectedMonth]);

    const handleYearChange = (selectedYear) => {
        setSelectedYear(selectedYear);
    };

    const handleMonthChange = (selectedMonth) => {
        setSelectedMonth(selectedMonth);
    };

    return (
        <div className={classes['expense-list']}>
            <FilterExpenses onYearChange={handleYearChange} onMonthChange={handleMonthChange} />
        
            {loading ? (<Spinner animation="border" className="d-block mx-auto m-3" variant="primary" />
                ):(
                !expenses || filteredData.length === 0) ? (
                    <p className={classes['not-found']}>No expenses found for the selected filters.</p>
                    ) : (
                    filteredData.map(expense => (
                    <Expense
                        key={expense.id}
                        id={expense.id}
                        name={expense.name}
                        category={expense.category}
                        amount={expense.amount}
                        date={expense.date}
                        onPopulateToForm={props.onPopulateToForm}
                    />
                    ))
            )}
        </div>
  );
};

export default ExpensesList;

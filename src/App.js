import React, { useState, useEffect } from 'react';
import Table from './Tables/Table';
import AddTransactionsForm from './CRUD/AddTransactionsForm';
import AddCategoryForm from './CRUD/AddCategoryForm';
import FilterForm from "./CRUD/FilterForm";
import EditDeleteCategoryForm from "./CRUD/EditDeleteCategoryForm";
import FilterByType from "./CRUD/FilterByType";
import axios from 'axios';

function App() {
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = () => {
        axios.get('https://localhost:5177/api/TransactionResult')
            .then((response) => {
                setTransactions(response.data);
            })
            .catch((error) => {
                console.error('Error fetching transactions:', error);
            });
    };

    return (
        <div className={"app-container"} align={"center"}>
            <h1>Micro Accounting</h1>
            <AddTransactionsForm/>
            <AddCategoryForm/>
            <EditDeleteCategoryForm/>
            <FilterForm/>
            <FilterByType
                transactions={transactions}
                setFilteredTransactions={setFilteredTransactions}
            />
            {filteredTransactions.length > 0 ? (
                <Table transactions={filteredTransactions}/>
            ) : (
                <Table transactions={transactions} setTransactions={setTransactions}/>
            )}
        </div>
    );
}

export default App;

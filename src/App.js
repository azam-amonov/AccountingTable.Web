import React, { useState, useEffect } from 'react';
import Table from './Tables/Table';
import AddTransactionsForm from './CRUD/AddTransactionsForm';
import AddCategoryForm from './CRUD/AddCategoryForm';
import EditDeleteCategoryForm from "./CRUD/EditDeleteCategoryForm";
import SelectCategoriesFilter from "./CRUD/SelectCategoriesFilter";
import axios from 'axios';
import FilterByDate from "./CRUD/FilterByDate";
import FilterByType from "./CRUD/FilterByType";
import BASE_URL from "./configuration/apiConfig";

function App() {
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);

    const fetchTransactions = () => {
        axios.get(`${BASE_URL}/TransactionResult`)
            .then((response) => {
                setTransactions(response.data);
            })
            .catch((error) => {
                console.error('Error fetching transactions:', error);
            });
    };
    useEffect(() => {
        fetchTransactions();
    }, []);
    return (
        <div className={"app-container"} align={"center"}>
            <h1>Micro Accounting</h1>
            <AddTransactionsForm/>
            <AddCategoryForm/>
            <EditDeleteCategoryForm/>
            <SelectCategoriesFilter
                transactions={transactions}
                setFilteredTransactions={setFilteredTransactions}
            />
            <FilterByDate transactions={transactions} />
            <FilterByType
                transactions={transactions}
                setFilteredTransactions={setFilteredTransactions}
            />
            {filteredTransactions.length > 0 ? (
                <Table transactions={filteredTransactions}/>
            ) : (
                <Table transactions={transactions}/>
            )}
        </div>
    );
}

export default App;

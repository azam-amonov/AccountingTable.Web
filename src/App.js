import React, { useState, useEffect } from 'react';
import Table from './Tables/Table';
import AddTransactionsForm from './CRUD/AddTransactionsForm';
import AddCategoryForm from './CRUD/AddCategoryForm';
import EditDeleteCategoryForm from "./CRUD/EditDeleteCategoryForm";
import SelectCategoriesFilter from "./CRUD/SelectCategoriesFilter";
import {TransactionProvider} from "./Context/TransactionsContext";
import FilterByType from "./CRUD/FilterByType";

function App() {
    return (
        <TransactionProvider>
            <div className={"app-container"} align={"center"}>
                <h1>Micro Accounting</h1>
                <AddTransactionsForm/>
                <AddCategoryForm/>
                <EditDeleteCategoryForm/>
                <FilterByType/>
            
                {/*<SelectCategoriesFilter />*/}
                {/*<FilterByDate/>*/}
                <Table/>
            </div>
        </TransactionProvider>
    );
}

export default App;

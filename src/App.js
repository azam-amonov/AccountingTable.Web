import React from 'react';
import Table from './Tables/Table';
import AddTransactionsForm from './copmonents/AddTransaction/AddTransactionsForm';
import AddCategoryForm from './copmonents/AddCategory/AddCategoryForm';
import DeleteCategoryForm from "./copmonents/DeleteCategory/DeleteCategoryForm";
import SelectCategoriesFilter from "./CRUD/SelectCategoriesFilter";
import {TransactionProvider} from "./Context/TransactionsContext";
import FilterByType from "./CRUD/FilterByType";
import FilterByDate from "./copmonents/TransactionsList/FilterByDate";
import {CategoryProvider} from "./Context/CategoryContext";

function App() {
    return (
        <TransactionProvider>
            <CategoryProvider>
            <div className={"app-container"} align={"center"}>
                <h1>Micro Accounting</h1>
                <AddTransactionsForm/>
                <AddCategoryForm/>
                <DeleteCategoryForm/>
                <FilterByType/>
                <FilterByDate/>
                <SelectCategoriesFilter/>
                <Table/>
            </div>
            </CategoryProvider>
        </TransactionProvider>
    );
}

export default App;

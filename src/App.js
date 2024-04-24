import React from 'react';
import Table from './tables/Table';
import AddTransactionsForm from './copmonents/AddTransaction/AddTransactionsForm';
import AddCategoryForm from './copmonents/AddCategory/AddCategoryForm';
import DeleteCategoryForm from "./copmonents/DeleteCategory/DeleteCategoryForm";
import FilterByCategory from "./copmonents/TransactionsList/FilterByCategory";
import {TransactionResultProvider} from "./context/TransactionResultContext";
import FilterByType from "./copmonents/TransactionsList/FilterByType";
import FilterByDate from "./copmonents/TransactionsList/FilterByDate";
import {CategoryProvider} from "./context/CategoryContext";

function App() {
    return (
        <TransactionResultProvider>
            <CategoryProvider>
            <div className={"app-container"} align={"center"}>
                <h1>Micro Accounting</h1>
                <AddTransactionsForm/>
                <AddCategoryForm/>
                <DeleteCategoryForm/>
                <FilterByType/>
                <FilterByDate/>
                <FilterByCategory/>
                <Table/>
            </div>
            </CategoryProvider>
        </TransactionResultProvider>
    );
}

export default App;

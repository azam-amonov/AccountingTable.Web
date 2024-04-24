import React from 'react';
import TransactionResultTable from './tables/TransactionResultTable';
import AddTransactionsForm from './copmonents/AddTransaction/AddTransactionsForm';
import AddCategoryForm from './copmonents/AddCategory/AddCategoryForm';
import DeleteCategoryForm from "./copmonents/DeleteCategory/DeleteCategoryForm";
import FilterByCategory from "./copmonents/TransactionsList/FilterByCategory";
import {TransactionResultProvider} from "./context/TransactionResultContext";
import FilterByType from "./copmonents/TransactionsList/FilterByType";
import FilterByDate from "./copmonents/TransactionsList/FilterByDate";
import {CategoryProvider} from "./context/CategoryContext";
import {TransactionProvider} from "./context/TransactionContext";

function App() {
    return (
        <TransactionResultProvider>
            <TransactionProvider>
            <CategoryProvider>
            <div className={"app-container"} align={"center"}>
                <h1>Micro Accounting</h1>
                <AddTransactionsForm/>
                <AddCategoryForm/>
                <DeleteCategoryForm/>
                <FilterByType/>
                <FilterByDate/>
                <FilterByCategory/>
                <TransactionResultTable/>
            </div>
            </CategoryProvider>
            </TransactionProvider>
        </TransactionResultProvider>
    );
}

export default App;

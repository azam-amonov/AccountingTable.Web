// App.js
import React, { useState } from 'react';
import Table from './Tables/Table';
import AddTransactionsForm from './CRUD/AddTransactionsForm';
import AddCategoryForm from './CRUD/AddCategoryForm';
import FilterForm from "./CRUD/FilterForm";
import EditDeleteCategoryForm from "./CRUD/EditDeleteCategoryForm";
import FilterByType from "./CRUD/FilterByType";

function App() {
  const filter = () => {
    
  }
  return (
      <div className={"app-container"} align={"center"}>
        <h1>Micro Accounting</h1>
          <div className= "cneter-contanier" align={"center"}>
              <AddTransactionsForm/>
              <AddCategoryForm />
              
              <EditDeleteCategoryForm/>
              
              <FilterForm filters={filter}/>
              
              <FilterByType/>
              <Table/>
          </div>
      </div>
  );
}

export default App;

// App.js
import React, { useState } from 'react';
import Table from './Tables/Table';
import AddTransactionsForm from './CRUD/AddTransactionsForm';
import AddCategoryForm from './CRUD/AddCategoryForm';
import FilterForm from "./CRUD/FilterForm";
import EditDeleteCategoryForm from "./CRUD/EditDeleteCategoryForm";

function App() {
  const [data, setData] = useState([]);

  const addRecord = (record) => {
    setData([...data, record]);
  };

  const deleteRecord = (id) => {
    setData(data.filter((record) => record.id !== id));
  };
  
  const addCategory = () => {
    setData(data.filter((record) => record.id));
  }
  
  const filter = () => {
    
  }
  return (
      <div className={"app-container"} align={"center"}>
        <h1>Micro Accounting</h1>
          <div className= "cneter-contanier" align={"center"}>
              <AddTransactionsForm addRecord={addRecord} />
              <AddCategoryForm addCategory = {addCategory}/>
              <EditDeleteCategoryForm/>
              <FilterForm filters={filter}/>
              {/*<RecordTable data={data} deleteRecord={deleteRecord} />*/}
              <Table data={data} deleteRecord={deleteRecord} />
              {/*<CategoryTable data={data} deleteRecord={deleteRecord}/>*/}
              
          </div>
        
      </div>
  );
}

export default App;

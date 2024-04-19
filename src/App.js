// App.js
import React, { useState } from 'react';
import Table from './Tables/Table';
import AddRecordForm from './CRUD/AddRecordForm';
import AddCategoryForm from './CRUD/AddCategoryForm';
import CategoryTable from './Tables/CategoryTable';
import RecordTable from './Tables/RecordTable';
import FilterForm from "./CRUD/FilterForm";

function App() {
  const [data, setData] = useState([]);

  const addRecord = (record) => {
    setData([...data, record]);
  };

  const deleteRecord = (id) => {
    setData(data.filter((record) => record.id !== id));
  };
  
  const addCategory = (id) => {
    setData(data.filter((record) => record.id));
  }
  
  const filter = () => {
    
  }
  return (
      <div className={"app-container"} align={"center"}>
        <h1>CRUD Table</h1>
          <div className= "cneter-contanier" align={"center"}>
              <AddRecordForm addRecord={addRecord} />
              <AddCategoryForm addCategory = {addCategory}/>
              <FilterForm filters={filter}/>
              {/*<RecordTable data={data} deleteRecord={deleteRecord} />*/}
              <Table data={data} deleteRecord={deleteRecord} />
              {/*<CategoryTable data={data} deleteRecord={deleteRecord}/>*/}
              
          </div>
        
      </div>
  );
}

export default App;

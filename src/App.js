// App.js
import React, { useState } from 'react';
import Table from './Tables/./Table';
import AddRecordForm from './CRUD/AddRecordForm';

function App() {
  const [data, setData] = useState([]);

  const addRecord = (record) => {
    setData([...data, record]);
  };

  const deleteRecord = (id) => {
    setData(data.filter((record) => record.id !== id));
  };

  return (
      <div className={"app-container"} align={"center"}>
        <h1>CRUD Table</h1>
          <div className= "cneter-contanier" align={"center"}>
              <AddRecordForm addRecord={addRecord} />
              <Table data={data} deleteRecord={deleteRecord} />
          </div>
        
      </div>
  );
}

export default App;

import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../api/apiConfig";

const TransactionContext = createContext();

const TransactionProvider = ({children}) => {
    const [transactions, setTransactions] = useState([]);
    
    useEffect(() => {
        fetchTransaction();
    }, []);
    
    const fetchTransaction = () => {
        axios.get(`${BASE_URL}/Transaction`)
            .then(response =>{
                setTransactions(response.data)
            })
            .catch(error => {
                console.error('Error fetching transaction', error);
            })
    }
    
    const addTransaction = async (transaction) => {
        await axios.post(`${BASE_URL}/Transaction`, transaction)
            .catch((error) => {
                console.error('Error add transaction', error);
            });
    }

    const deleteTransactionById = (id) => {
        axios.delete(`${BASE_URL}/Transaction/${id}`)
            .catch((error) => {
                console.error('Error deleting transaction:', error);
            });
    }
    
    return (
      <TransactionContext.Provider value={{
          transactions,
          setTransactions,
          fetchTransaction,
          addTransaction,
          deleteTransactionById}}>
          {children}
      </TransactionContext.Provider>  
    );
};

export { TransactionProvider, TransactionContext }
import React,{createContext, useState, useEffect} from "react";
import axios from "axios";
import BASE_URL from "../api/apiConfig";

const TransactionsContext = createContext();

const TransactionProvider = ({children}) => {
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    
    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = () => {
        axios.get(`${BASE_URL}/TransactionResult`)
            .then(response => {
                setTransactions(response.data);
            })
            .catch(error => {
                console.error('Error fetching transactions:', error);
            });
    };
    
    const deleteTransactionsById = (id) => {
        axios.delete(`${BASE_URL}/Transaction/${id}`)
            .then(() => {
                fetchTransactions();
            })
            .catch((error) => {
                console.error('Error deleting transaction:', error);
            });
    }

    const filterTransactionsByType = (type) => {
        axios.get(`${BASE_URL}/TransactionResult/type/${type}`)
            .then(response => {
                setFilteredTransactions(response.data);
            })
            .catch(error => {
                console.error('Error filtering transactions by type:', error);
            });
    };
    
    const  filterTransactionsByDate =(startDate, endDate) => {
        const formattedStartDate = startDate.toISOString().split('T')[0];
        const formattedEndDate = endDate.toISOString().split('T')[0];
        axios.get(`${BASE_URL}/TransactionResult/between/date?startDate=${formattedStartDate}&endDate=${formattedEndDate}`)
            .then(response => {
                setFilteredTransactions(response.data);
            })
            .catch((error) => {
                console.error('Error getting transaction', error);
            })
    }
    
    const filterTransactionsByCategories = (categories) => {
        axios.get(`${BASE_URL}/TransactionResult/names?${categories}`)
            .then(response => {
                setFilteredTransactions(response.data);
            })
            .catch((error) => {
                console.error('Error:', error);
            })
    }
    
    return (
        <TransactionsContext.Provider value={{
            transactions, 
            fetchTransactions,
            deleteTransactionsById,
            filteredTransactions, 
            filterTransactionsByType,
            filterTransactionsByDate,
            filterTransactionsByCategories}}>
            {children}
        </TransactionsContext.Provider>
    );
};

export {TransactionProvider, TransactionsContext};
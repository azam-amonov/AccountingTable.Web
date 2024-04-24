import React,{createContext, useState, useEffect} from "react";
import axios from "axios";
import BASE_URL from "../api/apiConfig";

const TransactionResultContext = createContext();

const TransactionResultProvider = ({children}) => {
    const [transactionResults, setTransactionResults] = useState([]);
    const [filteredTransactionResults, setFilteredTransactionResults] = useState([]);
    
    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = () => {
        axios.get(`${BASE_URL}/TransactionResult`)
            .then(response => {
                setTransactionResults(response.data);
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
                setFilteredTransactionResults(response.data);
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
                setFilteredTransactionResults(response.data);
            })
            .catch((error) => {
                console.error('Error getting transaction', error);
            })
    }
    
    const filterTransactionsByCategories = (categories) => {
        axios.get(`${BASE_URL}/TransactionResult/names?${categories}`)
            .then(response => {
                setFilteredTransactionResults(response.data);
            })
            .catch((error) => {
                console.error('Error:', error);
            })
    }
    
    return (
        <TransactionResultContext.Provider value={{
            transactions: transactionResults,
            setTransactions: setTransactionResults,
            fetchTransactions,
            deleteTransactionsById,
            filteredTransactions: filteredTransactionResults, 
            filterTransactionsByType,
            filterTransactionsByDate,
            filterTransactionsByCategories}}>
            {children}
        </TransactionResultContext.Provider>
    );
};

export {TransactionResultProvider, TransactionResultContext};
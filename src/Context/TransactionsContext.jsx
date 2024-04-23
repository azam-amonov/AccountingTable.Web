import React,{createContext, useState, useEffect} from "react";
import axios from "axios";
import BASE_URL from "../configuration/apiConfig";

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

    const filterTransactionsByType = (type) => {
        axios.get(`${BASE_URL}/TransactionResult/type/${type}`)
            .then(response => {
                setFilteredTransactions(response.data);
            })
            .catch(error => {
                console.error('Error filtering transactions by type:', error);
            });
    };
    
    return (
        <TransactionsContext.Provider value={{
            transactions, 
            fetchTransactions, 
            filteredTransactions, 
            filterTransactionsByType}}>
            {children}
        </TransactionsContext.Provider>
    );
};

export {TransactionProvider, TransactionsContext};
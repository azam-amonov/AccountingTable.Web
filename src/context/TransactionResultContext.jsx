import React,{createContext, useState, useEffect} from "react";
import axios from "axios";
import BASE_URL from "../api/apiConfig";

const TransactionResultContext = createContext();

const TransactionResultProvider = ({children}) => {
    const [transactionResults, setTransactionResults] = useState([]);
    const [filteredTransactionResults, setFilteredTransactionResults] = useState([]);
    
    useEffect(() => {
        fetchTransactionResult();
    }, []);

    const fetchTransactionResult = () => {
        axios.get(`${BASE_URL}/TransactionResult`)
            .then(response => {
                setTransactionResults(response.data);
            })
            .catch(error => {
                console.error('Error fetching transactions:', error);
            });
    };

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
                console.error('Error getting transaction result', error);
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
            transactionResults,
            setTransactionResults,
            fetchTransactionResult,
            filteredTransactionResults, 
            filterTransactionsByType,
            filterTransactionsByDate,
            filterTransactionsByCategories}}>
            {children}
        </TransactionResultContext.Provider>
    );
};

export {TransactionResultProvider, TransactionResultContext};
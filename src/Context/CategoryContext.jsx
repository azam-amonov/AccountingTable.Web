import React,{createContext, useState, useEffect} from "react";
import axios from "axios";
import BASE_URL from "../configuration/apiConfig";

const CategoryContext = createContext();
const CategoryProvider = ({children}) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories()
    }, []);

    const fetchCategories = () => {
        axios.get(`${BASE_URL}/Category`)
            .then((response) => {
                setCategories(response.data);
            }).catch(error => {
            console.error('Error fetching Categories: ', error)
        })
    }

    return (
        <CategoryContext.Provider value={{
            categories,
            fetchCategories
        }}>
            {children}
        </CategoryContext.Provider>);
};

export {CategoryProvider, CategoryContext };

    
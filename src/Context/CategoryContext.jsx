import React,{createContext, useState, useEffect} from "react";
import axios from "axios";
import BASE_URL from "../configuration/apiConfig";

const CategoryContext = createContext();
const CategoryProvider = ({children}) => {
    const [category, setCategory] = useState([]);

    useEffect(() => {
        fetchCategories()
    }, []);

    const fetchCategories = () => {
        axios.get(`${BASE_URL}/Category`)
            .then((response) => {
                setCategory(response.data);
            }).catch(error => {
            console.error('Error fetching Categories: ', error)
        })
    }

    return (
        <CategoryContext.Provider value={{
            category,
            fetchCategories
        }}>
            {children}
        </CategoryContext.Provider>);
};

export {CategoryContext, CategoryProvider};

    
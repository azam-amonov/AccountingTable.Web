import React,{createContext, useState, useEffect} from "react";
import axios from "axios";
import BASE_URL from "../api/apiConfig";

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
    const deleteCategoryById = (id) =>{
        axios.delete(`${BASE_URL}/Category/${id}`)
            .then(() => {
                fetchCategories();
            })
            .catch((error) => {
                console.error('Error deleting category:', error);
            });
    }

    return (
        <CategoryContext.Provider value={{
            categories,
            fetchCategories,
            deleteCategoryById
        }}>
            {children}
        </CategoryContext.Provider>);
};

export {CategoryProvider, CategoryContext };

    
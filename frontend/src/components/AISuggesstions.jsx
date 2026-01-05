import React, { useState, useEffect } from "react";

import API from "../utils/axios";
const AISuggestions = () => {
    const [suggestions, setSuggestions] = useState([]);
    useEffect(() => {
        const fetchSuggestions = async () => {
            try {
                const response = await API.get('/ai-suggestions/',{
                    headers:{
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                    }
                });
                setSuggestions(response.data.suggestions);
                console.log(response.data);
            } catch (error) {
                console.error("Failed to fetch AI suggestions:", error);
            }
        };
        fetchSuggestions();
    }, []);
    return (
        <div className="ai-suggestions-container">
            <h2>AI Suggestions</h2>
            <p>{suggestions}</p>
        </div> 
    );  

}

export default AISuggestions;
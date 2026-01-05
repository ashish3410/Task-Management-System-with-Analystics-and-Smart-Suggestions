import React, {useEffect} from "react";
import API from "../utils/axios";
const ProgressBar = ({ progress }) => {
    const [data, setData] = React.useState({});
     useEffect(()=>{
           const getAnalyticsData = async () => {
        try {
            const response = await API.get('/project-progress/',{
                headers:{
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                }
            });
            setData(response.data.project_summaries);
            console.log(response.data);
        } catch (error) {
            console.error("Failed to fetch analytics data:", error);
            return null;
        }
    };
    getAnalyticsData();
    },[])   
    return (
        <div className="mt-6 w-full">
            <div className="bg-gray-700 h-3 rounded-full w-full">
                <div className="bg-indigo-500 h-3 rounded-full" style={{ width: `${data?.progress_percent}`}}></div>
            </div>
        </div>
    )
};

export default ProgressBar;

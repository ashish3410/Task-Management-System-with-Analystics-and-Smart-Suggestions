import React, { useEffect, useState } from "react";
import API from "../utils/axios";

export default function AnalyticsCard() {
    const [data, setData]=useState(null)
 
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
        <div style={{
            display:"grid",
            gridTemplateColumns:"repeat(3, 1fr)",
            gap:"20px",
            margin:"20px 0"
        }}>
            <div style={{
                backgroundColor:"#f0f2f5",
                padding:"20px",

                borderRadius:"8px",
                boxShadow:"0 2px 4px rgba(0,0,0,0.1)",
                textAlign:"center"
            }}>
                <h3>Total Tasks</h3>
                <p style={{ fontSize: "24px", fontWeight: "bold" }}>{data?.total_tasks || 0}</p>
            </div>
            <div style={{
                backgroundColor:"#f0f2f5",
                padding:"20px",
                borderRadius:"8px",
                boxShadow:"0 2px 4px rgba(0,0,0,0.1)",
                textAlign:"center"
            }}>
                <h3>Completed Tasks</h3>
                <p style={{ fontSize: "24px", fontWeight: "bold" }}>{data?.completed_tasks || 0}</p>
            </div>
            <div style={{
                backgroundColor:"#f0f2f5",
                padding:"20px",
                borderRadius:"8px",
                boxShadow:"0 2px 4px rgba(0,0,0,0.1)",
                textAlign:"center"
            }}> 
                <h3>High_priority Tasks</h3>
                <p style={{ fontSize: "24px", fontWeight: "bold" }}>{data?.completed_tasks || 0}</p>
            </div>
            <div style={{
                backgroundColor:"#f0f2f5",
                padding:"20px",
                borderRadius:"8px",
                boxShadow:"0 2px 4px rgba(0,0,0,0.1)",
                textAlign:"center"
            }}> 
                <h3>Overdue Tasks</h3>
                <p style={{ fontSize: "24px", fontWeight: "bold" }}>{data?.overdue_tasks || 0}</p>
            </div>
            <div style={{
                backgroundColor:"#f0f2f5",
                padding:"20px",
                borderRadius:"8px",
                boxShadow:"0 2px 4px rgba(0,0,0,0.1)",
                textAlign:"center"
            }}> 
                <h3>Pending Tasks</h3>
                <p style={{ fontSize: "24px", fontWeight: "bold" }}>{data?.pending_tasks || 0}</p>
            </div>
            <div style={{
                backgroundColor:"#f0f2f5",
                padding:"20px",
                borderRadius:"8px",
                boxShadow:"0 2px 4px rgba(0,0,0,0.1)",
                textAlign:"center"
            }}> 
                <h3>In Progress Tasks</h3>
                <p style={{ fontSize: "24px", fontWeight: "bold" }}>{data?.in_progress || 0}</p>
            </div>

        </div>
    )

}
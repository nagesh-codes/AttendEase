import React, { useEffect, useState } from 'react'
import { apiClient } from '../../API/apiClient';

const SystemAdmin = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const getDate = async () => {
            try {
                const response = await apiClient.get("/api/systemadmin/pendingCollegeApplications");
                setData(response.data);
                console.log(response.data);
            } catch (error) {
                console.error(error)
            }
        }
        getDate()
    }, [])

    return (
        <div className="sys-admin">
            
        </div>
    )
}

export default SystemAdmin

import React from 'react';
import { useState, useEffect, useContext } from "react";
import TableSpace from './TableSpace/TableSpace';
import { Cookies } from 'react-cookie';
import { SERVER_URL } from "../../EditableStuff/Config";
import axios from "axios";
import { Context } from "../../Context/Context";

const Users = () => {
    const { user, logged_in } = useContext(Context);
    const [tableData, setTableData] = useState([])
    const getUsers = async () => {
        const cookies = new Cookies();

        try {
            const data = await axios.get(`${SERVER_URL}/employees`, {
                headers: {
                    "Authorization": `Bearer ${cookies.get('token')}`,
                    "Content-Type": "application/json"
                }
            });
            setTableData(data.data);
        } catch (err) {

        }
    }

    useEffect(() => {
        getUsers();
    }, logged_in);
    return (
        <div className='table-container adjust'>
            <TableSpace tableData={tableData} />
        </div>
    );
}

export default Users;
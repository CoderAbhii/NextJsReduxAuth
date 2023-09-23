"use client"

import UserItem from '@/components/UserItem'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { getAllUsers } from '@/apiConfig/apiCall'

const Users = () => {

    const [users, setUsers] = useState([]);

    const getAllUsersFunc = async () => {
        const response = await getAllUsers();
        console.log(response.data.allUsers);
        setUsers(response.data.allUsers);
    }

    useEffect(() => {
        getAllUsersFunc();
    }, [])

    return (
        <>
            <div className="user">
                <h1 className="title text-center">
                    All Users
                </h1>
                <div className="d-flex flx-wrap justify-content-center">
                    {
                        users.map((data, index) => (
                            <UserItem key={data._id} index={index} data={data} />
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default Users
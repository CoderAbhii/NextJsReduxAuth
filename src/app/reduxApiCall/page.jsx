"use client"

import ReduxApiCallItem from '@/components/ReduxApiCallItem';
import { getAllUsersDataFnc } from '@/redux-toolkit/features/users/usersSlice';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const ReduxApiCall = () => {

    const dispatch = useDispatch();

    const catchData = useSelector(state => state.userData)
    const {data} = catchData;

    useEffect(() => { 
        dispatch(getAllUsersDataFnc());
    }, [dispatch]);

   const filteredData = data.allUsers;
    return (
        <>
            <div className="user">
                <h1 className="title text-center">
                    All Users Redux Api Call
                </h1>
                <div className="d-flex flx-wrap justify-content-center">
                    {
                       filteredData && filteredData.map((data, index) => (
                            <ReduxApiCallItem key={data._id} index={index} data={data} />
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default ReduxApiCall
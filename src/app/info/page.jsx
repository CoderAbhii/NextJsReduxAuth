"use client"

import { getUserInfo } from '@/apiConfig/apiCall'
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Button, Card, ListGroup } from 'react-bootstrap'
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

const UserInfo = () => {

    const router = useRouter();

    const [userDetails, setUserDetails] = useState({});
    const [isClient, setIsClient] = useState(false);

    const getUserDetails = async () => {
        const response = await getUserInfo();
        if (response.status === 200) {
            setUserDetails(response.data.user);
        }
        else if (response.status === 401) {
            router.push('/');
            toast.error(response.data.message)
        }
    }

    const handleLogout = () => {
        Cookies.remove('x-http-core');
        router.push('/');
        toast.success("Logout Successfully");
    }

    useEffect(() => {
        getUserDetails();
        setIsClient(true);
    }, [userDetails])


    return (
        <>
            <div className="wrapper">
                <div className="info">
                    <Card style={{ width: '30rem' }}>
                        <ListGroup variant="flush">
                            <ListGroup.Item>Id : {userDetails._id}</ListGroup.Item>
                            <ListGroup.Item>Name : {userDetails.name}</ListGroup.Item>
                            <ListGroup.Item>Email : {userDetails.email}</ListGroup.Item>
                            <ListGroup.Item>Role : {userDetails.role}</ListGroup.Item>
                            <ListGroup.Item> Account Created On :
                                {isClient ? moment(userDetails.createdAt).format('MMMM Do YYYY, h:mm:ss a') : 'loading..'}
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>

                    <Button className='mt-3' variant="primary" onClick={handleLogout}>
                        Logout
                    </Button>
                </div>
            </div>
        </>
    )
}

export default UserInfo
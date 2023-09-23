"use client"

import { forgotPassword } from '@/apiConfig/apiCall';
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const Login = () => {

    const router = useRouter();

    const [inputValues, setInputValues] = useState({ email: ""});

    const handleChange = (event) => {
        setInputValues({ ...inputValues, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { email } = inputValues;

        if (email === "") {
            toast.error("Please enter a email")
        }
        else {
            const data = new FormData();
            data.append("email", email);

            const apiResponse = await forgotPassword(data);
            if (apiResponse.status === 200) {
                toast.success(apiResponse.data.message);
                // router.push('/info');
            }
            else if (apiResponse.status === 401) {
                toast.error(apiResponse.data.message);
            }
            else {
                toast.error("Some Error Occured");
            }
        }
    }


    return (
        <>
            <div className="wrapper">
                <div className="login boxShadow">
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" name='email' placeholder="Enter email" autoComplete='off' value={inputValues.email} onChange={(e) => handleChange(e)} />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                        <Button variant="primary" type="submit"  onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default Login
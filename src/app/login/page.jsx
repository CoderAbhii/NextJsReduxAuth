"use client"

import { loginUser } from '@/apiConfig/apiCall';
import Cookies from 'js-cookie';
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Login = () => {

    const router = useRouter();

    const [inputValues, setInputValues] = useState({ email: "", password: "" });

    const handleChange = (event) => {
        setInputValues({ ...inputValues, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { email, password } = inputValues;

        if (email === "") {
            toast.error("Please enter a email")
        }
        else if (password === "") {
            toast.error("Password cannot be blank")
        }
        else if (password.length < 5) {
            toast.error("Password must be contain 5 or more character")
        }
        else {
            const data = new FormData();
            data.append("email", email);
            data.append("password", password);

            const apiResponse = await loginUser(data);
            if (apiResponse.status === 200) {
                Cookies.set('x-http-core', apiResponse.data.token, { expires: 1 });
                toast.success(apiResponse.data.message);
                router.push('/info');
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

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name='password' placeholder="Enter password" autoComplete='off' value={inputValues.password} onChange={(e) => handleChange(e)} />
                        </Form.Group>

                        <div className="forgot-link d-flex justify-content-end">
                        <Link href={'/forgot-password'}>Forgot password</Link>
                        </div>
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
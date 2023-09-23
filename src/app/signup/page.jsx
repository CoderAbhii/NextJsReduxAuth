"use client"

import { signupUser } from '@/apiConfig/apiCall';
import Cookies from 'js-cookie';
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const Signup = () => {

    const router = useRouter();

    const [inputValues, setInputValues] = useState({ name: "", email: "", password: "" });

    const handleChange = (event) => {
        setInputValues({ ...inputValues, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { name,  email, password } = inputValues;
        if(name == ""){
            toast.error("Please enter name")
        }
        else if (email === "") {
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
            data.append("name", name);
            data.append("email", email);
            data.append("password", password);

            const apiResponse = await signupUser(data);
            if (apiResponse.status === 201) {
                Cookies.set('x-http-core', apiResponse.data.token, { expires: 1 });
                toast.success(apiResponse.data.message);
                router.push('/info');
            }
            else if (apiResponse.status === 400) {
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
                    <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Yor Name</Form.Label>
                            <Form.Control type="text" name='name' placeholder="Enter name" autoComplete='off' value={inputValues.name} onChange={(e) => handleChange(e)} />
                        </Form.Group>

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
                        <Button variant="primary" type="submit"  onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default Signup
"use client"

import { passwordUpdate } from '@/apiConfig/apiCall';
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const Login = () => {

    const router = useRouter();

    const [inputValues, setInputValues] = useState({ oldPassword: "",newPassword: "", confirmPassword: "" });

    const handleChange = (event) => {
        setInputValues({ ...inputValues, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { oldPassword, newPassword, confirmPassword } = inputValues;

        if(oldPassword === ""){
            toast.error("Please enter password")
        }
        else if (newPassword === "") {
            toast.error("Please enter password")
        }
        else if (confirmPassword === "") {
            toast.error("Please enter confirm password")
        }
        else {
            const data = new FormData();
            data.append("oldPassword", oldPassword);
            data.append("newPassword", newPassword);
            data.append("confirmPassword", confirmPassword);

            const apiResponse = await passwordUpdate(data);
            if (apiResponse.status === 200) {
                toast.success(apiResponse.data.message);
                router.push('/login');
            }
            else if (apiResponse.status === 400) {
                toast.error(apiResponse.data.message);
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
                    <Form.Group className="mb-3" controlId="formBasicOldPassword">
                            <Form.Label>Enter Old Password</Form.Label>
                            <Form.Control type="password" name='oldPassword' placeholder="Old password" autoComplete='off' value={inputValues.oldPassword} onChange={(e) => handleChange(e)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Enter New Password</Form.Label>
                            <Form.Control type="password" name='newPassword' placeholder="New password" autoComplete='off' value={inputValues.newPassword} onChange={(e) => handleChange(e)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" name='confirmPassword' placeholder="Confirm password" autoComplete='off' value={inputValues.confirmPassword} onChange={(e) => handleChange(e)} />
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default Login
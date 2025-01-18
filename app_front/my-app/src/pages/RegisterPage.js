import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import LoginClientService from '../services/LoginClientService';

const InputField = ({ label, name, type, value, onChange }) => (
    <div className="mb-3">
        <label>{label}</label>
        <input
            type={type}
            name={name}
            className="form-control"
            value={value}
            onChange={onChange}
        />
    </div>
);

const ErrorMessage = ({ message }) => (
    <p className="fs-4 text-center text-danger">{message}</p>
);

function RegisterPage() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        userName: "",
        birth_date: "",
        gender: "MALE",
        email: "",
        phone_number: "",
        password: "",
    });
    const [msg, setMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const handleChange = (e) => {
        const value = e.target.value;
        setUser({ ...user, [e.target.name]: value });
    };

    const validateInputs = () => {
        if (!user.userName || !user.email || !user.phone_number || !user.password || !user.birth_date) {
            setErrorMsg("All fields must be filled");
            return false;
        }

        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(user.email)) {
            setErrorMsg("Please enter a valid email address");
            return false;
        }

        const phonePattern = /^\+?[1-9]\d{1,14}$/;
        if (!phonePattern.test(user.phone_number)) {
            setErrorMsg("Please enter a valid phone number");
            return false;
        }

        setErrorMsg("");
        return true;
    };

    const RegisterUser = (e) => {
        e.preventDefault();
        if (validateInputs()) {
            LoginClientService.saveClient(user)
                .then((res) => {
                    if (res.data === 'wrong email') {
                        alert("Wrong email");
                    } else if (res.data === 'isnull') {
                        alert("Some fields not entered");
                    } else if (res.data === 'wrong phone') {
                        alert("Wrong phone");
                    } else {
                        setMsg("User added successfully");
                        navigate("/login");
                        setUser({
                            userName: "",
                            birth_date: "",
                            gender: "MALE",
                            email: "",
                            phone_number: "",
                            password: "",
                        });
                    }
                }).catch((error) => {
                console.log(error);
                setErrorMsg("An error occurred during registration. Please try again.");
            });
        }
    };

    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card">
                        <div className="card-header fs-3 text-center">
                            Register User
                        </div>
                        {msg && <p className="fs-4 text-center text-success">{msg}</p>}
                        {errorMsg && <ErrorMessage message={errorMsg} />}
                        <div className="card-body">
                            <form onSubmit={RegisterUser}>
                                <InputField
                                    label="Enter UserName"
                                    name="userName"
                                    type="text"
                                    value={user.userName}
                                    onChange={handleChange}
                                />
                                <div className="mb-3">
                                    <label>Enter Birth Date</label>
                                    <TextField
                                        name="birth_date"
                                        className="form-control"
                                        id="birth_date"
                                        type="date"
                                        value={user.birth_date}
                                        onChange={handleChange}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </div>
                                <InputField
                                    label="Enter Email"
                                    name="email"
                                    type="text"
                                    value={user.email}
                                    onChange={handleChange}
                                />
                                <InputField
                                    label="Enter Phone Number"
                                    name="phone_number"
                                    type="text"
                                    value={user.phone_number}
                                    onChange={handleChange}
                                />
                                <div className="mb-3">
                                    <label>Enter Gender</label>
                                    <select
                                        className="form-control"
                                        onChange={handleChange}
                                        value={user.gender}
                                        name="gender"
                                    >
                                        <option value="MALE">MALE</option>
                                        <option value="FEMALE">FEMALE</option>
                                    </select>
                                </div>
                                <InputField
                                    label="Enter Password"
                                    name="password"
                                    type="password"
                                    value={user.password}
                                    onChange={handleChange}
                                />
                                <button className="btn btn-primary col-md-12">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;

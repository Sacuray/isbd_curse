import LoginWorkerService from '../services/LoginWorkerService';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginWorker() {
    const navigate = useNavigate();
    const [user, setUser] = useState({ email: "", passcode: "" });
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const value = e.target.value;
        setUser({ ...user, [e.target.name]: value });
    };

    const validateInput = () => {
        if (!user.email || !user.passcode) {
            setErrorMessage("Please enter both email and password");
            return false;
        }
        setErrorMessage("");
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateInput()) {
            setLoading(true);
            LoginWorkerService.selectClient(user)
                .then((res) => {
                    setLoading(false);
                    if (res.data === "ok") {
                        navigate("/home_worker", { state: { email: user.email } });
                    } else if (res.data === "isnull") {
                        setErrorMessage("Some fields are missing or incorrect");
                    } else {
                        setErrorMessage(res.data);
                    }
                })
                .catch((error) => {
                    setLoading(false);
                    console.error(error);
                    setErrorMessage("An error occurred while logging in.");
                });
        }
    };

    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card">
                        <div className="card-header fs-3 text-center">
                            Worker Login
                        </div>
                        {errorMessage && <p className="fs-4 text-center text-danger">{errorMessage}</p>}
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email">Enter Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="form-control"
                                        onChange={handleChange}
                                        value={user.email}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="passcode">Enter Password</label>
                                    <input
                                        type="password"
                                        name="passcode"
                                        id="passcode"
                                        className="form-control"
                                        onChange={handleChange}
                                        value={user.passcode}
                                        required
                                    />
                                </div>
                                <button className="btn btn-primary col-md-12" disabled={loading}>
                                    {loading ? "Loading..." : "Submit"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginWorker;

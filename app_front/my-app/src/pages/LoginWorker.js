import LoginWorkerService from '../services/LoginWorkerService';
import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import { useNavigate } from 'react-router-dom';


function LoginWorker() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        passcode: "",
    });
    const [msg, setMsg] = useState("")

    const handleChange = (e) => {
        const value = e.target.value;
        setUser({ ...user, [e.target.name]: value })
    }


    const RegisterUser = (e) => {
        e.preventDefault();
        console.log(user);
        LoginWorkerService.selectClient(user)
            .then((res) => {
                if(res.data == "ok"){
                    navigate("/home_worker", {state:{email: user.email}})
                }else if(res.data == "isnull"){
                    alert("Some fields not enter")
                }
                else{
                    alert(res.data);
                }
                
                // navigate("/")
            }).catch((error) => {
                console.log(error);
            });
    }
    return (
        <>
            <div className='container mt-3'>
                <div className='row'>
                    <div className='col-md-6 offset-md-3'>
                        <div className='card'>
                            <div className='card-header fs-3 text-center'>
                                Worker
                            </div>
                            {msg && <p className="fs-4 text-center text-success">{msg}</p>}
                            <div className='card-body'>
                                <form onSubmit={(e) => RegisterUser(e)}>
                                    <div className='mb-3'>
                                        <label>Enter Email</label>
                                        <input type="text" name="email" className='form-control'
                                            onChange={(e) => handleChange(e)}
                                            value={user.email} />
                                    </div>
                                    <div className='mb-3'>
                                        <label>Enter Password</label>
                                        <input type="text" name="passcode" className='form-control'
                                            onChange={(e) => handleChange(e)}
                                            value={user.passcode} />
                                    </div>
                                    <button className="btn btn-primary col-md-12">Submit</button>
                                    
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default LoginWorker;
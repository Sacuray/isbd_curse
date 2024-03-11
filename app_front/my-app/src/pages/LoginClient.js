import LoginClientService from '../services/LoginClientService';
import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import { useNavigate } from 'react-router-dom';


function LoginPage() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const [msg, setMsg] = useState("")

    const handleChange = (e) => {
        const value = e.target.value;
        setUser({ ...user, [e.target.name]: value })
    }

    const move = (e) => {
        navigate("/register")
    }

    const RegisterUser = (e) => {
        e.preventDefault();
        console.log(user);
        console.log("novgorod");
        LoginClientService.selectClient(user)
            .then((res) => {
                console.log(res.data)
                
                if(res.data == "ok"){
                    console.log("piter")
                    console.log(user.email)
                    navigate("/home_client", {state:{email: user.email}})
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
                                Login 
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
                                        <input type="text" name="password" className='form-control'
                                            onChange={(e) => handleChange(e)}
                                            value={user.password} />
                                    </div>
                                    <button className="btn btn-primary col-md-12">Submit</button>
                                    
                                </form>
                                <button className="btn btn-primary col-md-12" onClick={move} style={{marginTop:10}}>Not registed</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default LoginPage;
import LoginClientService from '../services/LoginClientService';
import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import { useNavigate } from 'react-router-dom';


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
    const [msg, setMsg] = useState("")

    const handleChange = (e) => {
        console.log("svdavadvsdv")
        const value = e.target.value;
        setUser({ ...user, [e.target.name]: value })
    }

    const RegisterUser = (e) => {
        e.preventDefault();
        console.log(user);
        LoginClientService.saveClient(user)
            .then((res) => {
                console.log(res.data)
                if(res.data == 'wrong email'){
                    alert("Wrong email")
                }else if(res.data == 'isnull'){
                    alert("Some fields not enter")
                }
                else if(res.data == 'wrong phone'){
                    alert("Wrong phone")
                }
                else{
                    console.log("User Added Successfully");
                    setMsg("Used Added Sucessfully");
                    navigate("/login")
                    setUser({
                        full_name: "",
                        birth_date: "",
                        gender: "",
                        email: "",
                        phone_number: "",
                        password: "",
                    })
                }
                
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
                                Register User
                            </div>
                            {msg && <p className="fs-4 text-center text-success">{msg}</p>}
                            <div className='card-body'>
                                <form onSubmit={(e) => RegisterUser(e)}>
                                    <div className='mb-3'>
                                        <label>Enter UserName</label>
                                        <input type="text" name="full_name" className='form-control' onChange={(e) => handleChange(e)}
                                            value={user.full_name} />
                                    </div>
                                    <div className='mb-3'>
                                        <label>Enter Birth Date</label>
                                        <TextField 
                                            name="birth_date"
                                            className='form-control'
                                            id="birth_date"
                                            type="date"
                                            defaultValue="2017-05-24"
                                            onChange={(e) => handleChange(e)}
                                            value={user.birth_date}
                                            InputLabelProps={{ 
                                              shrink: true, 
                                            }} 
                                          />
                                    </div>
                                    <div className='mb-3'>
                                        <label>Enter Email</label>
                                        <input type="text" name="email" className='form-control'
                                            onChange={(e) => handleChange(e)}
                                            value={user.email} />
                                    </div>
                                    <div className='mb-3'>
                                        <label>Enter phone number No</label>
                                        <input type="text" name="phone_number" className='form-control'
                                            onChange={(e) => handleChange(e)}
                                            value={user.phone_number} />
                                    </div>
                                    <div className='mb-3'>
                                        <label>Enter gender</label>
                                        <select className='form-control'
                                            onChange={(e) => handleChange(e)}
                                            value={user.gender}
                                            name="gender">
                                            <option value="MALE">MALE</option>
                                            <option value="FEMALE">FEMALE</option>
                                        </select>
                                    </div>
                                    <div className='mb-3'>
                                        <label>Enter Password</label>
                                        <input type="text" name="password" className='form-control'
                                            onChange={(e) => handleChange(e)}
                                            value={user.password} />
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
export default RegisterPage;
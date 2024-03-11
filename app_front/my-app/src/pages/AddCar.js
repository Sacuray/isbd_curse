import LoginClientService from '../services/LoginClientService';
import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import { useLocation, useNavigate } from 'react-router-dom';
import ClientService from '../services/ClientService';


function AddCar() {
    const navigate = useNavigate();
    const {state} = useLocation();
    const { email } = state;
    console.log(state.client)
    // console.log(state.email)
    const [car, setCar] = useState({
        email_client: email,
        year_of_release: "",
        model: "BMW_M5_COMPETITION",
        colour: "",
    });
    const [msg, setMsg] = useState("")

    const handleChange = (e) => {
        console.log("svdavadvsdv")
        const value = e.target.value;
        setCar({ ...car, [e.target.name]: value })
    }

    const Add_Car = (e) => {
        e.preventDefault();
        console.log(car);
        console.log(email)
        ClientService.addCars(car)
            .then((res) => {
                if(res.data == "isnull"){
                    alert("Some fields are empty")
                }else{
                    navigate("/home_client", {state:{email: car.email_client}})
                    setCar({
                        year_of_release: "",
                        model: "",
                        colour: "",
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
                                Add Car
                            </div>
                            {msg && <p className="fs-4 text-center text-success">{msg}</p>}
                            <div className='card-body'>
                                <form onSubmit={(e) => Add_Car(e)}>
                                    <div className='mb-3'>
                                        <label>Enter Year of release</label>
                                        <TextField 
                                            name="year_of_release"
                                            className='form-control'
                                            id="year_of_release"
                                            type="date"
                                            defaultValue="2017-05-24"
                                            onChange={(e) => handleChange(e)}
                                            value={car.year_of_release}
                                            InputLabelProps={{ 
                                              shrink: true, 
                                            }} 
                                          />
                                    </div>
                                    <div className='mb-3'>
                                        <label>Enter model</label>
                                        <select className='form-control'
                                            onChange={(e) => handleChange(e)}
                                            value={car.model}
                                            name="model">
                                            <option value="BMW_M5_COMPETITION">BMW_M5_COMPETITION</option>
                                            <option value="BMW_M5_CS">BMW_M5_CS</option>
                                            <option value="BMW_i8">BMW_i8</option>
                                            <option value="BMW_M8_COMPETITION_COUPE">BMW_M8_COMPETITION_COUPE</option>
                                            <option value="BMW_M4_COMPETITION">BMW_M4_COMPETITION</option>
                                        </select>
                                    </div>
                                    <div className='mb-3'>
                                        <label>Enter colour</label>
                                        <input type="text" name="colour" className='form-control'
                                            onChange={(e) => handleChange(e)}
                                            value={car.colour} />
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
export default AddCar;
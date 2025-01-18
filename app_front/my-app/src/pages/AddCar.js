import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ClientService from '../services/ClientService';
import CarTextField from '../components/CarTextField';
import CarModelSelect from '../components/CarModelSelect';
import { Button } from '@mui/material';

function AddCar() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { email } = state;

    const [car, setCar] = useState({
        email_client: email,
        year_of_release: "",
        model: "BMW_M5_COMPETITION",
        colour: "",
    });

    const [msg, setMsg] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCar(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await ClientService.addCars(car);
            if (res.data === "isnull") {
                alert("Some fields are empty");
            } else {
                navigate("/home_client", { state: { email: car.email_client } });
                setCar({
                    year_of_release: "",
                    model: "BMW_M5_COMPETITION",
                    colour: "",
                });
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card">
                        <div className="card-header fs-3 text-center">
                            Add Car
                        </div>
                        {msg && <p className="fs-4 text-center text-success">{msg}</p>}
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <CarTextField
                                    label="Enter Year of Release"
                                    name="year_of_release"
                                    type="date"
                                    value={car.year_of_release}
                                    handleChange={handleChange}
                                />
                                <CarModelSelect
                                    model={car.model}
                                    handleChange={handleChange}
                                />
                                <CarTextField
                                    label="Enter Colour"
                                    name="colour"
                                    value={car.colour}
                                    handleChange={handleChange}
                                />
                                <Button type="submit" variant="contained" fullWidth>Submit</Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddCar;

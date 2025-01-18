import LoginClientService from '../services/LoginClientService';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ClientService from '../services/ClientService';
import ServiceSelect from '../components/ServiceSelect';  // Импорт компонента выбора услуги
import { Button } from '@mui/material';

const AddOrderPage = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const lolemail = state.email;
    const lolcarid = state.car;

    const [carId] = useState(lolcarid);
    const [serviceName, setServiceName] = useState('');
    const [services, setServices] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'service_name') {
            setServiceName(value);
        }
    };

    useEffect(() => {
        ClientService.getServices().then((response) => {
            setServices(response.data);
            if (response.data.length > 0) {
                setServiceName(response.data[0]);
            }
        }).catch((error) => {
            console.error(error);
        });
    }, []);

    const addOrder = (e) => {
        e.preventDefault();
        ClientService.addOrder({ car_id: carId, service_name: serviceName })
            .then(() => {
                navigate("/home_client", { state: { email: lolemail } });
            })
            .catch((error) => {
                console.error(error);
                navigate("/home_client", { state: { email: lolemail } });
            });
    };

    return (
        <div className='container mt-3'>
            <div className='row'>
                <div className='col-md-6 offset-md-3'>
                    <div className='card'>
                        <div className='card-header fs-3 text-center'>
                            Add Order
                        </div>
                        <div className='card-body'>
                            <form onSubmit={addOrder}>
                                <ServiceSelect
                                    services={services}
                                    serviceName={serviceName}
                                    handleChange={handleChange}
                                />
                                {/* Кнопка отправки остается здесь */}
                                <Button type="submit" variant="contained" fullWidth>
                                    Submit
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddOrderPage;

import React, { useState, useEffect } from 'react';
import HomeClientService from '../services/HomeClientService';
import ClientService from '../services/ClientService';
import { useNavigate, useLocation } from 'react-router-dom';

// Компонент для отображения информации о клиенте
const ClientInfo = ({ userData, onAddCar, onExit }) => (
    <div style={{ padding: 5, borderStyle: 'solid', width: "25%", marginLeft: 10 }}>
        <div><p style={{ margin: 0, fontWeight: "bold" }}>Client</p><p>{userData.userName}</p></div>
        <div><p style={{ margin: 0, fontWeight: "bold" }}>Birth date</p><p>{userData.birth_date}</p></div>
        <div><p style={{ margin: 0, fontWeight: "bold" }}>Gender</p><p>{userData.gender}</p></div>
        <div><p style={{ margin: 0, fontWeight: "bold" }}>Email</p><p>{userData.email}</p></div>
        <div><p style={{ margin: 0, fontWeight: "bold" }}>Phone number</p><p>{userData.phone_number}</p></div>
        <button className="btn btn-primary col-md-12" onClick={onAddCar} style={{ marginTop: 10 }}>Add car</button>
        <button className="btn btn-danger col-md-12" onClick={onExit} style={{ marginTop: 10 }}>Exit</button>
    </div>
);

// Компонент для отображения таблицы машин
const CarsTable = ({ cars, onAddOrder, onDeleteCar }) => (
    <div style={{ width: "70%", borderStyle: 'solid', float: 'left', display: 'table-cell' }}>
        <h1 className="text-center">Your cars</h1>
        <table className="table table-striped">
            <thead>
            <tr>
                <td>Year of release</td>
                <td>Model</td>
                <td>Colour</td>
                <td>Add order</td>
                <td>Delete car</td>
            </tr>
            </thead>
            <tbody>
            {cars.map((car) => (
                <tr key={car.id}>
                    <td>{car.year_of_release}</td>
                    <td>{car.model}</td>
                    <td>{car.colour}</td>
                    <td>
                        <button className="btn btn-success col-md-12" onClick={() => onAddOrder(car.id)}>Add order</button>
                    </td>
                    <td>
                        <button className="btn btn-danger col-md-12" onClick={() => onDeleteCar(car.id)}>Delete</button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
);

// Компонент для отображения таблицы заказов
const OrdersTable = ({ orders, onDeleteOrder }) => (
    <div style={{ width: "96%" }}>
        <h1 className="text-center">Your orders</h1>
        <table className="table table-striped">
            <thead>
            <tr>
                <td>Service Name</td>
                <td>Car Model</td>
                <td>Datetime</td>
                <td>Status</td>
                <td>Start</td>
                <td>End</td>
                <td>Name of worker</td>
                <td>Delete order</td>
            </tr>
            </thead>
            <tbody>
            {orders.map((order) => (
                <tr key={order.id}>
                    <td>{order.service_id.nameService}</td>
                    <td>{order.carId.model}</td>
                    <td>{order.datetime_order}</td>
                    <td>{order.status_order}</td>
                    <td>{order.start_time}</td>
                    <td>{order.end_time}</td>
                    <td>{order.employeeId.full_name_employee}</td>
                    <td>
                        <button className="btn btn-danger col-md-12" onClick={() => onDeleteOrder(order.id)}>Delete</button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
);

const HomeClientPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const lolemail = location.state.email;

    const [userData, setUserData] = useState({
        userName: "",
        birth_date: "",
        gender: "MALE",
        email: "",
        phone_number: "",
    });
    const [cars, setCars] = useState([]);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        HomeClientService.getClient({ email: lolemail }).then((response) => setUserData(response.data));
        HomeClientService.getCars({ email: lolemail }).then((response) => setCars(response.data));
        HomeClientService.getOrders({ email: lolemail }).then((response) => setOrders(response.data));
    }, [lolemail]);

    const handleAddCar = () => {
        navigate("/client/add_car", { state: { email: lolemail } });
    };

    const handleDeleteCar = (carId) => {
        ClientService.deleteCar(carId).then(() => {
            setCars(cars.filter((car) => car.id !== carId));
        });
    };

    const handleDeleteOrder = (orderId) => {
        ClientService.deleteOrder(orderId).then(() => {
            setOrders(orders.filter((order) => order.id !== orderId));
        });
    };

    const handleAddOrder = (carId) => {
        navigate("/client/add_order", { state: { email: lolemail, car: carId } });
    };

    return (
        <div className="container">
            <div className="row" style={{ height: "100%" }}>
                <ClientInfo userData={userData} onAddCar={handleAddCar} onExit={() => navigate("/")} />
                <CarsTable cars={cars} onAddOrder={handleAddOrder} onDeleteCar={handleDeleteCar} />
            </div>
            <OrdersTable orders={orders} onDeleteOrder={handleDeleteOrder} />
        </div>
    );
};

export default HomeClientPage;

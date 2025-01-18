import React from 'react';
import { useNavigate } from 'react-router-dom';

// Компонент кнопки
const NavigationButton = ({ label, targetRoute }) => {
    const navigate = useNavigate();
    return (
        <button
            className="btn btn-success col-md-12"
            onClick={() => navigate(targetRoute)}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 200,
                height: 200,
                borderColor: 'black',
                borderStyle: 'solid',
                margin: 100,
            }}
        >
            {label}
        </button>
    );
};

const ChoosePage = () => {
    return (
        <div className='main' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 700 }}>
            <div>
                <NavigationButton label="Client" targetRoute="/login" />
            </div>
            <div>
                <NavigationButton label="Worker" targetRoute="/login_worker" />
            </div>
        </div>
    );
};

export default ChoosePage;

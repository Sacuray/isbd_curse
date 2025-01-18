import React from 'react';

function ServiceSelect({ services, serviceName, handleChange }) {
    return (
        <div className='mb-3'>
            <label>Choose service</label>
            <select
                className='form-control'
                onChange={handleChange}
                name="service_name"
                value={serviceName}
            >
                {services.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
            </select>
        </div>
    );
}

export default ServiceSelect;

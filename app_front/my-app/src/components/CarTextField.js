import React from 'react';
import { TextField } from '@mui/material';

function CarTextField({ label, name, value, handleChange, type = "text" }) {
    return (
        <div className="mb-3">
            <TextField
                label={label}
                name={name}
                type={type}
                value={value}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{
                    shrink: true,
                }}
            />
        </div>
    );
}

export default CarTextField;

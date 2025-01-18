import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function CarModelSelect({ model, handleChange }) {
    return (
        <div className="mb-3">
            <FormControl fullWidth>
                <InputLabel>Model</InputLabel>
                <Select
                    name="model"
                    value={model}
                    onChange={handleChange}
                >
                    <MenuItem value="BMW_M5_COMPETITION">BMW M5 Competition</MenuItem>
                    <MenuItem value="BMW_M5_CS">BMW M5 CS</MenuItem>
                    <MenuItem value="BMW_i8">BMW i8</MenuItem>
                    <MenuItem value="BMW_M8_COMPETITION_COUPE">BMW M8 Competition Coupe</MenuItem>
                    <MenuItem value="BMW_M4_COMPETITION">BMW M4 Competition</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}

export default CarModelSelect;

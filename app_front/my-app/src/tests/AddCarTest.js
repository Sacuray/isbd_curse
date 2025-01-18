import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useLocation, useNavigate } from 'react-router-dom';
import AddCar from './AddCar';
import ClientService from '../services/ClientService';

// Мокируем модули
jest.mock('react-router-dom', () => ({
    useLocation: jest.fn(),
    useNavigate: jest.fn(),
}));

jest.mock('../services/ClientService', () => ({
    addCars: jest.fn(),
}));

describe('AddCar Component', () => {
    let mockNavigate;

    beforeEach(() => {
        // Мокируем useLocation и useNavigate
        mockNavigate = jest.fn();
        useLocation.mockReturnValue({
            state: { email: 'test@example.com' },
        });
        useNavigate.mockReturnValue(mockNavigate);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders AddCar component', () => {
        render(<AddCar />);
        expect(screen.getByText('Add Car')).toBeInTheDocument();
        expect(screen.getByLabelText('Enter Year of Release')).toBeInTheDocument();
        expect(screen.getByLabelText('Enter Colour')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
    });

    test('handles input changes', () => {
        render(<AddCar />);

        const yearInput = screen.getByLabelText('Enter Year of Release');
        const colourInput = screen.getByLabelText('Enter Colour');

        fireEvent.change(yearInput, { target: { value: '2020' } });
        fireEvent.change(colourInput, { target: { value: 'Red' } });

        expect(yearInput.value).toBe('2020');
        expect(colourInput.value).toBe('Red');
    });

    test('submits form successfully', async () => {
        // Мокируем успешный ответ от сервиса
        ClientService.addCars.mockResolvedValue({ data: 'ok' });

        render(<AddCar />);

        const yearInput = screen.getByLabelText('Enter Year of Release');
        const colourInput = screen.getByLabelText('Enter Colour');
        const submitButton = screen.getByRole('button', { name: 'Submit' });

        fireEvent.change(yearInput, { target: { value: '2020' } });
        fireEvent.change(colourInput, { target: { value: 'Red' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(ClientService.addCars).toHaveBeenCalledWith({
                email_client: 'test@example.com',
                year_of_release: '2020',
                model: 'BMW_M5_COMPETITION',
                colour: 'Red',
            });
            expect(mockNavigate).toHaveBeenCalledWith('/home_client', {
                state: { email: 'test@example.com' },
            });
        });
    });

    test('shows error message when fields are empty', async () => {
        // Мокируем ответ с ошибкой
        ClientService.addCars.mockResolvedValue({ data: 'isnull' });

        render(<AddCar />);

        const submitButton = screen.getByRole('button', { name: 'Submit' });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(ClientService.addCars).toHaveBeenCalled();
            expect(screen.getByText('Some fields are empty')).toBeInTheDocument();
        });
    });

    test('handles API error', async () => {
        // Мокируем ошибку API
        ClientService.addCars.mockRejectedValue(new Error('API Error'));

        render(<AddCar />);

        const submitButton = screen.getByRole('button', { name: 'Submit' });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(ClientService.addCars).toHaveBeenCalled();
            expect(console.error).toHaveBeenCalledWith(new Error('API Error'));
        });
    });
});
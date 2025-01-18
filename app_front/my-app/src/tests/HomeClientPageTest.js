import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useLocation, useNavigate } from 'react-router-dom';
import HomeClientPage from './HomeClientPage';
import HomeClientService from '../services/HomeClientService';
import ClientService from '../services/ClientService';

// Мокируем модули
jest.mock('react-router-dom', () => ({
    useLocation: jest.fn(),
    useNavigate: jest.fn(),
}));

jest.mock('../services/HomeClientService', () => ({
    getClient: jest.fn(),
    getCars: jest.fn(),
    getOrders: jest.fn(),
}));

jest.mock('../services/ClientService', () => ({
    deleteCar: jest.fn(),
    deleteOrder: jest.fn(),
}));

describe('HomeClientPage Component', () => {
    let mockNavigate;

    const mockUserData = {
        userName: 'JohnDoe',
        birth_date: '1990-01-01',
        gender: 'MALE',
        email: 'john.doe@example.com',
        phone_number: '+1234567890',
    };

    const mockCars = [
        { id: 1, year_of_release: '2020', model: 'BMW_M5_COMPETITION', colour: 'Red' },
        { id: 2, year_of_release: '2018', model: 'AUDI_A4', colour: 'Blue' },
    ];

    const mockOrders = [
        {
            id: 1,
            service_id: { nameService: 'Oil Change' },
            carId: { model: 'BMW_M5_COMPETITION' },
            datetime_order: '2023-10-01T10:00:00',
            status_order: 'NEW',
            start_time: '10:00',
            end_time: '11:00',
            employeeId: { full_name_employee: 'Alice Smith' },
        },
    ];

    beforeEach(() => {
        // Мокируем useLocation и useNavigate
        mockNavigate = jest.fn();
        useLocation.mockReturnValue({
            state: { email: 'john.doe@example.com' },
        });
        useNavigate.mockReturnValue(mockNavigate);

        // Мокируем методы сервисов
        HomeClientService.getClient.mockResolvedValue({ data: mockUserData });
        HomeClientService.getCars.mockResolvedValue({ data: mockCars });
        HomeClientService.getOrders.mockResolvedValue({ data: mockOrders });
        ClientService.deleteCar.mockResolvedValue({});
        ClientService.deleteOrder.mockResolvedValue({});
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders HomeClientPage component', async () => {
        render(<HomeClientPage />);

        // Проверяем, что данные загружаются и отображаются
        await waitFor(() => {
            expect(screen.getByText('JohnDoe')).toBeInTheDocument();
            expect(screen.getByText('1990-01-01')).toBeInTheDocument();
            expect(screen.getByText('MALE')).toBeInTheDocument();
            expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
            expect(screen.getByText('+1234567890')).toBeInTheDocument();
        });

        // Проверяем отображение машин
        expect(screen.getByText('Your cars')).toBeInTheDocument();
        expect(screen.getByText('2020')).toBeInTheDocument();
        expect(screen.getByText('BMW_M5_COMPETITION')).toBeInTheDocument();
        expect(screen.getByText('Red')).toBeInTheDocument();

        // Проверяем отображение заказов
        expect(screen.getByText('Your orders')).toBeInTheDocument();
        expect(screen.getByText('Oil Change')).toBeInTheDocument();
        expect(screen.getByText('BMW_M5_COMPETITION')).toBeInTheDocument();
        expect(screen.getByText('NEW')).toBeInTheDocument();
        expect(screen.getByText('Alice Smith')).toBeInTheDocument();
    });

    test('handles Add Car button click', async () => {
        render(<HomeClientPage />);

        const addCarButton = screen.getByText('Add car');
        fireEvent.click(addCarButton);

        expect(mockNavigate).toHaveBeenCalledWith('/client/add_car', {
            state: { email: 'john.doe@example.com' },
        });
    });

    test('handles Delete Car button click', async () => {
        render(<HomeClientPage />);

        await waitFor(() => {
            const deleteCarButton = screen.getAllByText('Delete')[0];
            fireEvent.click(deleteCarButton);

            expect(ClientService.deleteCar).toHaveBeenCalledWith(1);
            expect(screen.queryByText('BMW_M5_COMPETITION')).not.toBeInTheDocument();
        });
    });

    test('handles Delete Order button click', async () => {
        render(<HomeClientPage />);

        await waitFor(() => {
            const deleteOrderButton = screen.getAllByText('Delete')[1];
            fireEvent.click(deleteOrderButton);

            expect(ClientService.deleteOrder).toHaveBeenCalledWith(1);
            expect(screen.queryByText('Oil Change')).not.toBeInTheDocument();
        });
    });

    test('handles Add Order button click', async () => {
        render(<HomeClientPage />);

        await waitFor(() => {
            const addOrderButton = screen.getAllByText('Add order')[0];
            fireEvent.click(addOrderButton);

            expect(mockNavigate).toHaveBeenCalledWith('/client/add_order', {
                state: { email: 'john.doe@example.com', car: 1 },
            });
        });
    });

    test('handles Exit button click', async () => {
        render(<HomeClientPage />);

        const exitButton = screen.getByText('Exit');
        fireEvent.click(exitButton);

        expect(mockNavigate).toHaveBeenCalledWith('/');
    });
});
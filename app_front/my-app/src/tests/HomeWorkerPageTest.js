import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useLocation, useNavigate } from 'react-router-dom';
import HomeWorkerPage from './HomeWorkerPage';
import HomeWorkerService from '../services/HomeWorkerService';

// Мокируем модули
jest.mock('react-router-dom', () => ({
    useLocation: jest.fn(),
    useNavigate: jest.fn(),
}));

jest.mock('../services/HomeWorkerService', () => ({
    getWorker: jest.fn(),
    getAutoparts: jest.fn(),
    getOrders: jest.fn(),
    updateAutopart: jest.fn(),
}));

describe('HomeWorkerPage Component', () => {
    let mockNavigate;

    const mockWorkerData = {
        full_name_employee: 'Alice Smith',
        post: 'MECHANIC',
        phone_number: '+1234567890',
        email: 'alice.smith@example.com',
        passcode: 'pass123',
        car_dealership_id: 1,
    };

    const mockAutoparts = [
        {
            id: 1,
            name_autopart: 'Brake Pads',
            description_autopart: 'High-quality brake pads',
            model: 'BMW_M5_COMPETITION',
            price: 100,
            count: 10,
        },
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
        },
    ];

    beforeEach(() => {
        // Мокируем useLocation и useNavigate
        mockNavigate = jest.fn();
        useLocation.mockReturnValue({
            state: { email: 'alice.smith@example.com' },
        });
        useNavigate.mockReturnValue(mockNavigate);

        // Мокируем методы сервисов
        HomeWorkerService.getWorker.mockResolvedValue({ data: mockWorkerData });
        HomeWorkerService.getAutoparts.mockResolvedValue({ data: mockAutoparts });
        HomeWorkerService.getOrders.mockResolvedValue({ data: mockOrders });
        HomeWorkerService.updateAutopart.mockResolvedValue({ data: mockAutoparts });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders HomeWorkerPage component', async () => {
        render(<HomeWorkerPage />);

        // Проверяем, что данные загружаются и отображаются
        await waitFor(() => {
            expect(screen.getByText('Alice Smith')).toBeInTheDocument();
            expect(screen.getByText('MECHANIC')).toBeInTheDocument();
            expect(screen.getByText('alice.smith@example.com')).toBeInTheDocument();
            expect(screen.getByText('+1234567890')).toBeInTheDocument();
        });

        // Проверяем отображение автозапчастей
        expect(screen.getByText('Your cars')).toBeInTheDocument();
        expect(screen.getByText('Brake Pads')).toBeInTheDocument();
        expect(screen.getByText('High-quality brake pads')).toBeInTheDocument();
        expect(screen.getByText('BMW_M5_COMPETITION')).toBeInTheDocument();
        expect(screen.getByText('100')).toBeInTheDocument();
        expect(screen.getByText('10')).toBeInTheDocument();

        // Проверяем отображение заказов
        expect(screen.getByText('Your orders')).toBeInTheDocument();
        expect(screen.getByText('Oil Change')).toBeInTheDocument();
        expect(screen.getByText('BMW_M5_COMPETITION')).toBeInTheDocument();
        expect(screen.getByText('NEW')).toBeInTheDocument();
        expect(screen.getByText('10:00')).toBeInTheDocument();
        expect(screen.getByText('11:00')).toBeInTheDocument();
    });

    test('handles Exit button click', async () => {
        render(<HomeWorkerPage />);

        const exitButton = screen.getByText('Exit');
        fireEvent.click(exitButton);

        expect(mockNavigate).toHaveBeenCalledWith('/');
    });

    test('handles Order Autopart button click', async () => {
        render(<HomeWorkerPage />);

        await waitFor(() => {
            const orderAutopartButton = screen.getByText('Order Autopart');
            fireEvent.click(orderAutopartButton);

            expect(HomeWorkerService.updateAutopart).toHaveBeenCalledWith(mockAutoparts[0]);
            expect(mockNavigate).toHaveBeenCalledWith('/home_worker', {
                state: { email: 'alice.smith@example.com' },
            });
        });
    });
});
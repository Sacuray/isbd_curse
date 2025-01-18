import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useLocation, useNavigate } from 'react-router-dom';
import AddOrderPage from './AddOrderPage';
import ClientService from '../services/ClientService';

// Мокируем модули
jest.mock('react-router-dom', () => ({
    useLocation: jest.fn(),
    useNavigate: jest.fn(),
}));

jest.mock('../services/ClientService', () => ({
    getServices: jest.fn(),
    addOrder: jest.fn(),
}));

describe('AddOrderPage Component', () => {
    let mockNavigate;

    const mockServices = ['Oil Change', 'Tire Rotation', 'Brake Inspection'];

    beforeEach(() => {
        // Мокируем useLocation и useNavigate
        mockNavigate = jest.fn();
        useLocation.mockReturnValue({
            state: { email: 'test@example.com', car: 1 },
        });
        useNavigate.mockReturnValue(mockNavigate);

        // Мокируем методы сервисов
        ClientService.getServices.mockResolvedValue({ data: mockServices });
        ClientService.addOrder.mockResolvedValue({});
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders AddOrderPage component', async () => {
        render(<AddOrderPage />);

        // Проверяем, что заголовок отображается
        expect(screen.getByText('Add Order')).toBeInTheDocument();

        // Проверяем, что услуги загружаются и отображаются
        await waitFor(() => {
            expect(screen.getByText('Oil Change')).toBeInTheDocument();
            expect(screen.getByText('Tire Rotation')).toBeInTheDocument();
            expect(screen.getByText('Brake Inspection')).toBeInTheDocument();
        });

        // Проверяем наличие кнопки отправки
        expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
    });

    test('handles service selection', async () => {
        render(<AddOrderPage />);

        // Ожидаем загрузки услуг
        await waitFor(() => {
            expect(screen.getByText('Oil Change')).toBeInTheDocument();
        });

        // Выбираем услугу
        const serviceSelect = screen.getByRole('combobox');
        fireEvent.change(serviceSelect, { target: { value: 'Tire Rotation' } });

        // Проверяем, что значение изменилось
        expect(serviceSelect.value).toBe('Tire Rotation');
    });

    test('submits form successfully', async () => {
        render(<AddOrderPage />);

        // Ожидаем загрузки услуг
        await waitFor(() => {
            expect(screen.getByText('Oil Change')).toBeInTheDocument();
        });

        // Выбираем услугу
        const serviceSelect = screen.getByRole('combobox');
        fireEvent.change(serviceSelect, { target: { value: 'Brake Inspection' } });

        // Нажимаем кнопку отправки
        const submitButton = screen.getByRole('button', { name: 'Submit' });
        fireEvent.click(submitButton);

        // Проверяем, что метод addOrder был вызван с правильными параметрами
        await waitFor(() => {
            expect(ClientService.addOrder).toHaveBeenCalledWith({
                car_id: 1,
                service_name: 'Brake Inspection',
            });
            expect(mockNavigate).toHaveBeenCalledWith('/home_client', {
                state: { email: 'test@example.com' },
            });
        });
    });

    test('handles API error during form submission', async () => {
        // Мокируем ошибку API
        ClientService.addOrder.mockRejectedValue(new Error('API Error'));

        render(<AddOrderPage />);

        // Ожидаем загрузки услуг
        await waitFor(() => {
            expect(screen.getByText('Oil Change')).toBeInTheDocument();
        });

        // Нажимаем кнопку отправки
        const submitButton = screen.getByRole('button', { name: 'Submit' });
        fireEvent.click(submitButton);

        // Проверяем, что навигация произошла, несмотря на ошибку
        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/home_client', {
                state: { email: 'test@example.com' },
            });
        });
    });
});
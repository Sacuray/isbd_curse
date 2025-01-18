import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import RegisterPage from './RegisterPage';
import LoginClientService from '../services/LoginClientService';

// Мокируем модули
jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));

jest.mock('../services/LoginClientService', () => ({
    saveClient: jest.fn(),
}));

describe('RegisterPage Component', () => {
    let mockNavigate;

    beforeEach(() => {
        // Мокируем useNavigate
        mockNavigate = jest.fn();
        useNavigate.mockReturnValue(mockNavigate);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders RegisterPage component', () => {
        render(<RegisterPage />);
        expect(screen.getByText('Register User')).toBeInTheDocument();
        expect(screen.getByLabelText('Enter UserName')).toBeInTheDocument();
        expect(screen.getByLabelText('Enter Birth Date')).toBeInTheDocument();
        expect(screen.getByLabelText('Enter Email')).toBeInTheDocument();
        expect(screen.getByLabelText('Enter Phone Number')).toBeInTheDocument();
        expect(screen.getByLabelText('Enter Gender')).toBeInTheDocument();
        expect(screen.getByLabelText('Enter Password')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
    });

    test('handles input changes', () => {
        render(<RegisterPage />);

        const userNameInput = screen.getByLabelText('Enter UserName');
        const emailInput = screen.getByLabelText('Enter Email');
        const phoneInput = screen.getByLabelText('Enter Phone Number');
        const passwordInput = screen.getByLabelText('Enter Password');
        const genderSelect = screen.getByLabelText('Enter Gender');

        fireEvent.change(userNameInput, { target: { value: 'JohnDoe' } });
        fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
        fireEvent.change(phoneInput, { target: { value: '+1234567890' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.change(genderSelect, { target: { value: 'FEMALE' } });

        expect(userNameInput.value).toBe('JohnDoe');
        expect(emailInput.value).toBe('john.doe@example.com');
        expect(phoneInput.value).toBe('+1234567890');
        expect(passwordInput.value).toBe('password123');
        expect(genderSelect.value).toBe('FEMALE');
    });

    test('validates inputs and shows error messages', () => {
        render(<RegisterPage />);

        const submitButton = screen.getByRole('button', { name: 'Submit' });
        fireEvent.click(submitButton);

        expect(screen.getByText('All fields must be filled')).toBeInTheDocument();

        const emailInput = screen.getByLabelText('Enter Email');
        fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
        fireEvent.click(submitButton);

        expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();

        const phoneInput = screen.getByLabelText('Enter Phone Number');
        fireEvent.change(phoneInput, { target: { value: 'invalid-phone' } });
        fireEvent.click(submitButton);

        expect(screen.getByText('Please enter a valid phone number')).toBeInTheDocument();
    });

    test('submits form successfully', async () => {
        // Мокируем успешный ответ от сервиса
        LoginClientService.saveClient.mockResolvedValue({ data: 'ok' });

        render(<RegisterPage />);

        const userNameInput = screen.getByLabelText('Enter UserName');
        const emailInput = screen.getByLabelText('Enter Email');
        const phoneInput = screen.getByLabelText('Enter Phone Number');
        const passwordInput = screen.getByLabelText('Enter Password');
        const submitButton = screen.getByRole('button', { name: 'Submit' });

        fireEvent.change(userNameInput, { target: { value: 'JohnDoe' } });
        fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
        fireEvent.change(phoneInput, { target: { value: '+1234567890' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(LoginClientService.saveClient).toHaveBeenCalledWith({
                userName: 'JohnDoe',
                birth_date: '',
                gender: 'MALE',
                email: 'john.doe@example.com',
                phone_number: '+1234567890',
                password: 'password123',
            });
            expect(mockNavigate).toHaveBeenCalledWith('/login');
        });
    });

    test('handles API errors', async () => {
        // Мокируем ошибку API
        LoginClientService.saveClient.mockRejectedValue(new Error('API Error'));

        render(<RegisterPage />);

        const submitButton = screen.getByRole('button', { name: 'Submit' });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(LoginClientService.saveClient).toHaveBeenCalled();
            expect(screen.getByText('An error occurred during registration. Please try again.')).toBeInTheDocument();
        });
    });
});
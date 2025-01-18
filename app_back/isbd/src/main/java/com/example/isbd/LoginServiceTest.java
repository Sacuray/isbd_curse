package com.example.isbd;

import com.example.isbd.Enteties.ClientEntity;
import com.example.isbd.Enteties.EmployeeEntity;
import com.example.isbd.Repositories.ClientRepo;
import com.example.isbd.Repositories.EmployeeRepo;
import com.example.isbd.enumerations.Gender_enum;
import com.example.isbd.services.LoginService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class LoginServiceTest {

    @Mock
    private ClientRepo clientRepo;

    @Mock
    private EmployeeRepo employeeRepo;

    @InjectMocks
    private LoginService loginService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testNewClient_Success() {
        // Arrange
        ClientEntity clientEntity = new ClientEntity();
        clientEntity.setFull_name("John Doe");
        clientEntity.setBirth_date(LocalDate.parse("1990-01-01"));
        clientEntity.setEmail("john.doe@example.com");
        clientEntity.setGender(Gender_enum.valueOf("Male"));
        clientEntity.setPassword("password123");
        clientEntity.setPhone_number("1234567890");

        ClientEntity lastClient = new ClientEntity();
        lastClient.setId(1);

        when(clientRepo.findTopByOrderByIdDesc()).thenReturn(lastClient);

        // Act
        String result = loginService.newClient(clientEntity);

        // Assert
        assertEquals("ok", result);
        verify(clientRepo, times(1)).save(clientEntity);
        verify(clientRepo, times(1)).flush();
    }

    @Test
    void testNewClient_IsNull() {
        // Arrange
        ClientEntity clientEntity = new ClientEntity();
        clientEntity.setFull_name(null); // Missing required field

        // Act
        String result = loginService.newClient(clientEntity);

        // Assert
        assertEquals("isnull", result);
        verify(clientRepo, never()).save(any());
        verify(clientRepo, never()).flush();
    }

    @Test
    void testNewClient_WrongEmail() {
        // Arrange
        ClientEntity clientEntity = new ClientEntity();
        clientEntity.setFull_name("John Doe");
        clientEntity.setBirth_date(LocalDate.parse("1990-01-01"));
        clientEntity.setEmail("invalid-email"); // Invalid email
        clientEntity.setGender(Gender_enum.valueOf("Male"));
        clientEntity.setPassword("password123");
        clientEntity.setPhone_number("1234567890");

        // Act
        String result = loginService.newClient(clientEntity);

        // Assert
        assertEquals("wrong email", result);
        verify(clientRepo, never()).save(any());
        verify(clientRepo, never()).flush();
    }

    @Test
    void testNewClient_WrongPhone() {
        // Arrange
        ClientEntity clientEntity = new ClientEntity();
        clientEntity.setFull_name("John Doe");
        clientEntity.setBirth_date(LocalDate.parse("1990-01-01"));
        clientEntity.setEmail("john.doe@example.com");
        clientEntity.setGender(Gender_enum.valueOf("Male"));
        clientEntity.setPassword("password123");
        clientEntity.setPhone_number("123-456-7890"); // Invalid phone number

        // Act
        String result = loginService.newClient(clientEntity);

        // Assert
        assertEquals("wrong phone", result);
        verify(clientRepo, never()).save(any());
        verify(clientRepo, never()).flush();
    }

    @Test
    void testSelectClient_Success() {
        // Arrange
        ClientEntity clientEntity = new ClientEntity();
        clientEntity.setEmail("john.doe@example.com");
        clientEntity.setPassword("password123");

        ClientEntity storedClient = new ClientEntity();
        storedClient.setEmail("john.doe@example.com");
        storedClient.setPassword("password123");

        when(clientRepo.findByEmail("john.doe@example.com")).thenReturn(storedClient);

        // Act
        String result = loginService.selectClient(clientEntity);

        // Assert
        assertEquals("ok", result);
        verify(clientRepo, times(1)).findByEmail("john.doe@example.com");
    }

    @Test
    void testSelectClient_IsNull() {
        // Arrange
        ClientEntity clientEntity = new ClientEntity();
        clientEntity.setEmail(""); // Empty email
        clientEntity.setPassword("");

        // Act
        String result = loginService.selectClient(clientEntity);

        // Assert
        assertEquals("isnull", result);
        verify(clientRepo, never()).findByEmail(any());
    }

    @Test
    void testSelectClient_WrongCredentials() {
        // Arrange
        ClientEntity clientEntity = new ClientEntity();
        clientEntity.setEmail("john.doe@example.com");
        clientEntity.setPassword("wrongpassword");

        when(clientRepo.findByEmail("john.doe@example.com")).thenReturn(null);

        // Act
        String result = loginService.selectClient(clientEntity);

        // Assert
        assertEquals("Wrong email or password", result);
        verify(clientRepo, times(1)).findByEmail("john.doe@example.com");
    }

    @Test
    void testSelectWorker_Success() {
        // Arrange
        EmployeeEntity employeeEntity = new EmployeeEntity();
        employeeEntity.setEmail("worker@example.com");
        employeeEntity.setPasscode("pass123");

        EmployeeEntity storedEmployee = new EmployeeEntity();
        storedEmployee.setEmail("worker@example.com");
        storedEmployee.setPasscode("pass123");

        when(employeeRepo.findByEmail("worker@example.com")).thenReturn(storedEmployee);

        // Act
        String result = loginService.selectWorker(employeeEntity);

        // Assert
        assertEquals("ok", result);
        verify(employeeRepo, times(1)).findByEmail("worker@example.com");
    }

    @Test
    void testSelectWorker_IsNull() {
        // Arrange
        EmployeeEntity employeeEntity = new EmployeeEntity();
        employeeEntity.setEmail(""); // Empty email
        employeeEntity.setPasscode("");

        // Act
        String result = loginService.selectWorker(employeeEntity);

        // Assert
        assertEquals("isnull", result);
        verify(employeeRepo, never()).findByEmail(any());
    }

    @Test
    void testSelectWorker_WrongCredentials() {
        // Arrange
        EmployeeEntity employeeEntity = new EmployeeEntity();
        employeeEntity.setEmail("worker@example.com");
        employeeEntity.setPasscode("wrongpass");

        when(employeeRepo.findByEmail("worker@example.com")).thenReturn(null);

        // Act
        String result = loginService.selectWorker(employeeEntity);

        // Assert
        assertEquals("Wrong email or password", result);
        verify(employeeRepo, times(1)).findByEmail("worker@example.com");
    }
}
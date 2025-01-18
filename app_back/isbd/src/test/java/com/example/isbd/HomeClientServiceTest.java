package com.example.isbd;

import com.example.isbd.Enteties.CarEntity;
import com.example.isbd.Enteties.ClientEntity;
import com.example.isbd.Enteties.MyOrderEntity;
import com.example.isbd.Enteties.PossessionEntity;
import com.example.isbd.Repositories.ClientRepo;
import com.example.isbd.Repositories.MyOrderRepo;
import com.example.isbd.Repositories.PossessionRepo;
import com.example.isbd.enumerations.Status_order_enum;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import com.example.isbd.services.HomeClientService;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class HomeClientServiceTest {

    @Mock
    private ClientRepo clientRepo;

    @Mock
    private PossessionRepo possessionRepo;

    @Mock
    private MyOrderRepo myOrderRepo;

    @InjectMocks
    private HomeClientService homeClientService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetCars() {
        // Arrange
        ClientEntity client = new ClientEntity();
        client.setEmail("test@example.com");
        client.setId(1);

        CarEntity car1 = new CarEntity();
        car1.setId(1);
        CarEntity car2 = new CarEntity();
        car2.setId(2);

        PossessionEntity possession1 = new PossessionEntity();
        possession1.setCarId(car1);
        PossessionEntity possession2 = new PossessionEntity();
        possession2.setCarId(car2);

        List<PossessionEntity> possessions = new ArrayList<>();
        possessions.add(possession1);
        possessions.add(possession2);

        when(clientRepo.findByEmail("test@example.com")).thenReturn(client);
        when(possessionRepo.findPossessionsByclientId_Id(1)).thenReturn(possessions);

        // Act
        List<CarEntity> result = homeClientService.getCars(client);

        // Assert
        assertEquals(2, result.size());
        assertTrue(result.contains(car1));
        assertTrue(result.contains(car2));
        verify(clientRepo, times(1)).findByEmail("test@example.com");
        verify(possessionRepo, times(1)).findPossessionsByclientId_Id(1);
    }

    @Test
    void testGetOrders() {
        // Arrange
        ClientEntity client = new ClientEntity();
        client.setEmail("test@example.com");
        client.setId(1);

        CarEntity car1 = new CarEntity();
        car1.setId(1);
        CarEntity car2 = new CarEntity();
        car2.setId(2);

        PossessionEntity possession1 = new PossessionEntity();
        possession1.setCarId(car1);
        PossessionEntity possession2 = new PossessionEntity();
        possession2.setCarId(car2);

        List<PossessionEntity> possessions = new ArrayList<>();
        possessions.add(possession1);
        possessions.add(possession2);

        MyOrderEntity order1 = new MyOrderEntity();
        order1.setId(1);
        order1.setCarId(car1);
        order1.setStatus_order(Status_order_enum.NEW);

        MyOrderEntity order2 = new MyOrderEntity();
        order2.setId(2);
        order2.setCarId(car2);
        order2.setStatus_order(Status_order_enum.COMPLETED);

        when(clientRepo.findByEmail("test@example.com")).thenReturn(client);
        when(possessionRepo.findPossessionsByclientId_Id(1)).thenReturn(possessions);
        when(myOrderRepo.findByCarId_Id(1)).thenReturn(order1);
        when(myOrderRepo.findByCarId_Id(2)).thenReturn(order2);

        // Act
        List<MyOrderEntity> result = homeClientService.getOrders(client);

        // Assert
        assertEquals(1, result.size()); // Only NEW orders should be returned
        assertTrue(result.contains(order1));
        verify(myOrderRepo, times(1)).delete(order2); // COMPLETED order should be deleted
        verify(clientRepo, times(1)).findByEmail("test@example.com");
        verify(possessionRepo, times(1)).findPossessionsByclientId_Id(1);
    }

    @Test
    void testGetOrders_NoOrders() {
        // Arrange
        ClientEntity client = new ClientEntity();
        client.setEmail("test@example.com");
        client.setId(1);

        CarEntity car1 = new CarEntity();
        car1.setId(1);

        PossessionEntity possession1 = new PossessionEntity();
        possession1.setCarId(car1);

        List<PossessionEntity> possessions = new ArrayList<>();
        possessions.add(possession1);

        when(clientRepo.findByEmail("test@example.com")).thenReturn(client);
        when(possessionRepo.findPossessionsByclientId_Id(1)).thenReturn(possessions);
        when(myOrderRepo.findByCarId_Id(1)).thenReturn(null); // No orders for this car

        // Act
        List<MyOrderEntity> result = homeClientService.getOrders(client);

        // Assert
        assertTrue(result.isEmpty());
        verify(clientRepo, times(1)).findByEmail("test@example.com");
        verify(possessionRepo, times(1)).findPossessionsByclientId_Id(1);
        verify(myOrderRepo, never()).delete(any()); // No orders to delete
    }
}
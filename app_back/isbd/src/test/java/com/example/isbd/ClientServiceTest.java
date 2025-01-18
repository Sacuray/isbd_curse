package com.example.isbd;

import com.example.isbd.DTO.ClientandCar;
import com.example.isbd.DTO.Order;
import com.example.isbd.DTO.Services;
import com.example.isbd.Enteties.*;
import com.example.isbd.Repositories.*;
import com.example.isbd.enumerations.Model_car;
import com.example.isbd.enumerations.Status_order_enum;
import com.example.isbd.services.ClientService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ClientServiceTest {

    @Mock
    private ClientRepo clientRepo;

    @Mock
    private CarRepo carRepo;

    @Mock
    private PossessionRepo possessionRepo;

    @Mock
    private ServiceRepo serviceRepo;

    @Mock
    private EmployeeRepo employeeRepo;

    @Mock
    private MyOrderRepo myOrderRepo;

    @InjectMocks
    private ClientService clientService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetCars_Success() {
        ClientandCar body = new ClientandCar();
        body.setEmail_client("test@example.com");
        body.setColour("Red");
        body.setModel(Model_car.valueOf("Model X"));
        body.setYear_of_release(LocalDate.ofEpochDay(2020));

        ClientEntity client = new ClientEntity();
        client.setEmail("test@example.com");

        CarEntity lastCar = new CarEntity();
        lastCar.setId(1);

        PossessionEntity lastPossession = new PossessionEntity();
        lastPossession.setId(1);

        when(clientRepo.findByEmail("test@example.com")).thenReturn(client);
        when(carRepo.findTopByOrderByIdDesc()).thenReturn(lastCar);
        when(possessionRepo.findTopByOrderByIdDesc()).thenReturn(lastPossession);

        String result = clientService.getCars(body);

        assertEquals("ok", result);
        verify(carRepo, times(1)).save(any(CarEntity.class));
        verify(possessionRepo, times(1)).save(any(PossessionEntity.class));
    }

    @Test
    void testGetCars_NullValues() {
        ClientandCar body = new ClientandCar();
        body.setEmail_client("test@example.com");
        body.setColour("");
        body.setYear_of_release(null);

        String result = clientService.getCars(body);

        assertEquals("isnull", result);
    }

    @Test
    void testGetServices() {
        List<ServiceEntity> serviceEntities = new ArrayList<>();
        ServiceEntity service1 = new ServiceEntity();
        service1.setNameService("Service 1");
        serviceEntities.add(service1);

        when(serviceRepo.findAll()).thenReturn(serviceEntities);

        List<String> result = clientService.getServices();

        assertEquals(1, result.size());
        assertEquals("Service 1", result.get(0));
    }

    @Test
    void testAddOrder() {
        Order order = new Order();
        order.setCar_id(1);
        order.setService_name("Service 1");

        CarEntity carEntity = new CarEntity();
        carEntity.setId(1);

        ServiceEntity serviceEntity = new ServiceEntity();
        serviceEntity.setNameService("Service 1");

        EmployeeEntity employeeEntity = new EmployeeEntity();
        employeeEntity.setId(1);

        MyOrderEntity lastOrder = new MyOrderEntity();
        lastOrder.setId(1);

        when(serviceRepo.findByNameService("Service 1")).thenReturn(List.of(serviceEntity));
        when(carRepo.findById(1)).thenReturn(carEntity);
        when(employeeRepo.findById(1L)).thenReturn(Optional.of(employeeEntity));
        when(myOrderRepo.findTopByOrderByIdDesc()).thenReturn(lastOrder);

        String result = clientService.addOrder(order);

        assertEquals("ok", result);
        verify(myOrderRepo, times(1)).save(any(MyOrderEntity.class));
    }

    @Test
    void testDeleteOrder() {
        MyOrderEntity myOrder = new MyOrderEntity();
        myOrder.setId(1);

        when(myOrderRepo.findById(1)).thenReturn(myOrder);

        String result = clientService.deleteOrder("1");

        assertEquals("ok", result);
        verify(myOrderRepo, times(1)).delete(myOrder);
    }

    @Test
    void testDeleteCar() {
        CarEntity carEntity = new CarEntity();
        carEntity.setId(1);

        PossessionEntity possessionEntity = new PossessionEntity();
        possessionEntity.setId(1);

        MyOrderEntity myOrderEntity = new MyOrderEntity();
        myOrderEntity.setId(1);

        when(carRepo.findById(1)).thenReturn(carEntity);
        when(possessionRepo.findByCarId(carEntity)).thenReturn(possessionEntity);
        when(myOrderRepo.findByCarId_Id(1)).thenReturn(myOrderEntity);

        String result = clientService.deleteCar("1");

        assertEquals("ok", result);
        verify(carRepo, times(1)).delete(carEntity);
        verify(possessionRepo, times(1)).delete(possessionEntity);
        verify(myOrderRepo, times(1)).delete(myOrderEntity);
    }
}
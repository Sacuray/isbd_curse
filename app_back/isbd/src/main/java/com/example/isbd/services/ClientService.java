package com.example.isbd.services;


import com.example.isbd.DTO.ClientandCar;
import com.example.isbd.DTO.Order;
import com.example.isbd.DTO.Services;
import com.example.isbd.Enteties.*;
import com.example.isbd.Repositories.*;
import com.example.isbd.enumerations.Status_order_enum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ClientService {

    @Autowired
    private ClientRepo clientRepo;
    @Autowired
    private CarRepo carRepo;
    @Autowired
    private PossessionRepo possessionRepo;
    @Autowired
    private ServiceRepo serviceRepo;
    @Autowired
    private EmployeeRepo employeeRepo;
    @Autowired
    private MyOrderRepo myOrderRepo;

    public String getCars(ClientandCar body){
        String email = body.getEmail_client();
        if(body.getYear_of_release() == null || body.getColour() == ""){
            return "isnull";
        }
        CarEntity car = new CarEntity();
        ClientEntity client = clientRepo.findByEmail(email);
        car.setColour(body.getColour());
        car.setModel(body.getModel());
        car.setYear_of_release(body.getYear_of_release());
        CarEntity last_car = carRepo.findTopByOrderByIdDesc();
        car.setId(last_car.getId() + 1);
        carRepo.save(car);
        carRepo.flush();
        PossessionEntity possession = new PossessionEntity();
        possession.setCarId(car);
        possession.setClientId(client);
        PossessionEntity last_possession = possessionRepo.findTopByOrderByIdDesc();
        possession.setId(last_possession.getId() + 1);
        possessionRepo.save(possession);
        possessionRepo.flush();
        return "ok";
    }

    public List<String> getServices(){
        List<ServiceEntity> serviceEntities = serviceRepo.findAll();
        Services services = new Services();
        List<String> names = new ArrayList<>();
        for (ServiceEntity serviceEntity : serviceEntities) {
            names.add(serviceEntity.getNameService());
        }
        services.setServices(names);
        System.out.println(services.getServices().toString());
        return services.getServices();
    }

    public String addOrder(Order order){
        Integer carid = order.getCar_id();
        String serviceName = order.getService_name();
        System.out.println(serviceName);
        MyOrderEntity myOrderEntity = new MyOrderEntity();
        ServiceEntity serviceEntity = serviceRepo.findByNameService(serviceName).get(0);
        CarEntity carEntity = carRepo.findById(carid);
        Long a = (long) 1;
        EmployeeEntity employeeEntity = employeeRepo.findById(a).orElse(new EmployeeEntity());
        myOrderEntity.setCarId(carEntity);
        myOrderEntity.setEmployeeId(employeeEntity);
        myOrderEntity.setService_id(serviceEntity);
        myOrderEntity.setStatus_order(Status_order_enum.NEW);
        myOrderEntity.setId(myOrderRepo.findTopByOrderByIdDesc().getId() + 1);
        myOrderRepo.save(myOrderEntity);
        myOrderRepo.flush();
        return "ok";
    }

    public String deleteOrder(String order_id){
        Integer myorder_id = Integer.parseInt(order_id);
        MyOrderEntity myOrder = myOrderRepo.findById(myorder_id);
        myOrderRepo.delete(myOrder);
        return "ok";
    }

    public String deleteCar(String car_id){
        Integer mycar_id = Integer.parseInt(car_id);
        CarEntity carEntity = carRepo.findById(mycar_id);
        PossessionEntity possessionEntity = possessionRepo.findByCarId(carEntity);
        MyOrderEntity myOrderEntity = myOrderRepo.findByCarId_Id(mycar_id);
        myOrderRepo.delete(myOrderEntity);
        myOrderRepo.flush();
        possessionRepo.delete(possessionEntity);
        possessionRepo.flush();
        carRepo.delete(carEntity);
        carRepo.flush();
        return "ok";
    }
}

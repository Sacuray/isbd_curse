package com.example.isbd.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.example.isbd.DTO.ClientandCar;
import com.example.isbd.DTO.Order;
import com.example.isbd.DTO.Services;
import com.example.isbd.Enteties.CarEntity;
import com.example.isbd.Enteties.ClientEntity;
import com.example.isbd.Enteties.EmployeeEntity;
import com.example.isbd.Enteties.MyOrderEntity;
import com.example.isbd.Enteties.PossessionEntity;
import com.example.isbd.Enteties.ServiceEntity;
import com.example.isbd.Repositories.CarRepo;
import com.example.isbd.Repositories.ClientRepo;
import com.example.isbd.Repositories.EmployeeRepo;
import com.example.isbd.Repositories.MyOrderRepo;
import com.example.isbd.Repositories.PossessionRepo;
import com.example.isbd.Repositories.ServiceRepo;
import com.example.isbd.enumerations.Status_order_enum;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;



@RestController
@RequestMapping("/client")
@CrossOrigin
public class ClientController {
    @Autowired
    private ClientRepo clientRepo;
    @Autowired
    private PossessionRepo possessionRepo;
    @Autowired
    private CarRepo carRepo;
    @Autowired
    private ServiceRepo serviceRepo;
    @Autowired
    private EmployeeRepo employeeRepo;
    @Autowired
    private MyOrderRepo myOrderRepo;
    @PostMapping("/add_car")
    @CrossOrigin
    public ResponseEntity getCars(@RequestBody ClientandCar body) {
        System.out.println(body.toString());
        String email = body.getEmail_client();
        if(body.getYear_of_release() == null || body.getColour() == ""){
            return ResponseEntity.ok("isnull");
        }
        System.out.println(email);
        CarEntity car = new CarEntity();
        ClientEntity client = clientRepo.findByEmail(email);
        System.out.println(client.toString());
        car.setColour(body.getColour());
        System.out.println(body.toString() + " Huy");
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
        return ResponseEntity.ok("");
    }
    @GetMapping("/get_services")
    @CrossOrigin
    public List<String> getServices() {
        List<ServiceEntity> serviceEntities = serviceRepo.findAll();
        Services services = new Services();
        List<String> names = new ArrayList<>();
        for(int i = 0; i < serviceEntities.size(); i++){
            names.add(serviceEntities.get(i).getNameService());
        }
        services.setServices(names);
        System.out.println(services.getServices().toString());
        return services.getServices();
    }
    @PostMapping("/add_order")
    @CrossOrigin
    public ResponseEntity addOrder(@RequestBody Order order) {
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
        return ResponseEntity.ok("");
    }
    @PostMapping("/delete_order")
    @CrossOrigin
    public ResponseEntity deleteOrder(@RequestBody String order_id) {
        System.out.println(order_id);
        Integer myorder_id = Integer.parseInt(order_id);
        MyOrderEntity myOrder = myOrderRepo.findById(myorder_id);
        myOrderRepo.delete(myOrder);
        return ResponseEntity.ok("");
    }
    @PostMapping("/delete_car")
    @CrossOrigin
    public ResponseEntity deleteCar(@RequestBody String car_id) {
        System.out.println(car_id);
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
        return ResponseEntity.ok("");
    }
}